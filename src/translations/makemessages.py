import glob
import os
import xlrd
import json
import re
import sys
import fnmatch
import argparse
from pathlib import Path
from jsondiff import diff, insert, delete


ignore_patterns = ['node_modules', 'components', 'enums', 'constants']

messages_dir = './messages.ts'
extensions = ['.tsx', '.ts']
base_dir = '../'
# Reactjs 파일에서 <FormattedMessage>, {f{(id: 를 찾을떄 사용
formatted_message_tag_regex = '<FormattedMessage[\s]+id=["\']([A-Za-z\d._/\-]*)["\'][\s]*/>'
formatted_message_hook_regex = 'f\([\s]*{id:[\s]*["\']([A-Za-z\d._/\-]*)["\']}'
# messages.ts 파일에서 messages json 찾아낼때 사용
pattern_oneline_regex = '\'([A-Za-z\d._/\-]*)\':[\s]*[\'"](.*)[\'"],'
pattern_multiline_key_regex = '\'([A-Za-z\d._/\-]*)\':[\s]*\n'
pattern_multiline_value_regex = '[\'"](.*)[\'"]'

# excel file에서 데이터들 column, row정보
START_ROW_INDEX = 1 # 0-based
KEY_COL_INDEX = 1
EN_US_COL_INDEX = 2
KO_KR_COL_INDEX = 3

def find_files(root, ignore_patterns, extensions):
    """
    Get all files in the given root. Also check that there is a matching
    locale dir for each file.
    """
    def normalize_path_patterns(patterns):
        """Normalize an iterable of glob style patterns based on OS."""
        patterns = [os.path.normcase(p) for p in patterns]
        dir_suffixes = {'%s*' % path_sep for path_sep in {'/', os.sep}}
        norm_patterns = []
        for pattern in patterns:
            for dir_suffix in dir_suffixes:
                if pattern.endswith(dir_suffix):
                    norm_patterns.append(pattern[:-len(dir_suffix)])
                    break
            else:
                norm_patterns.append(pattern)
        return norm_patterns

    def is_ignored_path(path, ignore_patterns):
        """
        Check if the given path should be ignored or not based on matching
        one of the glob style `ignore_patterns`.
        """
        path = Path(path)

        def ignore(pattern):
            return fnmatch.fnmatchcase(path.name, pattern) or fnmatch.fnmatchcase(str(path), pattern)

        return any(ignore(pattern) for pattern in normalize_path_patterns(ignore_patterns))

    all_files = []
    ignored_roots = []

    for dirpath, dirnames, filenames in os.walk(root, topdown=True):
        for dirname in dirnames[:]:
            if (is_ignored_path(os.path.normpath(os.path.join(dirpath, dirname)), ignore_patterns) or
                    os.path.join(os.path.abspath(dirpath), dirname) in ignored_roots):
                dirnames.remove(dirname)
            elif dirname == 'translations':
                dirnames.remove(dirname)
        for filename in filenames:
            file_path = os.path.normpath(os.path.join(dirpath, filename))
            file_ext = os.path.splitext(filename)[1]
            if file_ext not in extensions or is_ignored_path(file_path, ignore_patterns):
                pass
                #print('ignoring file {} in {}\n'.format(filename, dirpath))
            else:
                all_files.append({'dirpath': dirpath, 'filename': filename})
    return all_files


def find_keys(files):
    """
    source file에서 key값들을 찾는다
    """
    pattern = '{}|{}'.format(formatted_message_tag_regex, formatted_message_hook_regex)
    keys = set()

    for translatable_file in files:
        content = open(os.path.join(translatable_file.get('dirpath'), translatable_file.get('filename'))).read()

        pattern = re.compile(pattern)

        for key in pattern.findall(content):
            key = ''.join(key)
            keys.add(key)

    return keys


def get_json_from_excel(filepath):
    """
    Excel 파일에서 json형태로 data 추출
    """
    wb = xlrd.open_workbook(filepath)
    sh = wb.sheet_by_index(0)

    en_us_dict = {}
    ko_kr_dict = {}
    keys = set()

    for rownum in range(START_ROW_INDEX, sh.nrows):
        row_values = sh.row_values(rownum)
        if row_values[KEY_COL_INDEX]:
            keys.add(row_values[KEY_COL_INDEX])
            en_us_dict[row_values[KEY_COL_INDEX]] = row_values[EN_US_COL_INDEX]
            ko_kr_dict[row_values[KEY_COL_INDEX]] = row_values[KO_KR_COL_INDEX]

    return {'keys': keys, 'ko_kr': ko_kr_dict, 'en_us': en_us_dict}


def generate_messages_file(message_from_excel, extra_ids):
    """
    Excel Translations data를 이용하여 messages.ts로 생성
    """
    IMPORT_STRING = "\
import ko_KR from 'antd/es/locale/ko_KR';\n\
import en_US from 'antd/es/locale/en_US';\n\n\
export default {\n"
    KOKR_STRING = "\
  'ko': {\n\
    lang: 'ko',\n\
    antdLocale: ko_KR,\n"
    ENUS_STRING = "\
  'en': {\n\
    lang: 'en',\n\
    antdLocale: en_US,\n"

    def write_row(outfile, locale, message_from_excel):
        data_dict = {**message_from_excel.get(locale), **extra_ids.get(locale)}
        for key, value in sorted(data_dict.items()):
            if '\'' in value:
                outfile.write("    '{}': \"{}\",\n".format(key, value))
            else:
                outfile.write("    '{}': '{}',\n".format(key, value))

    with open(messages_dir, 'w') as outfile:
        outfile.write(IMPORT_STRING)
        outfile.write(KOKR_STRING)
        write_row(outfile, 'ko_kr', message_from_excel)
        outfile.write('  },\n')
        outfile.write(ENUS_STRING)
        write_row(outfile, 'en_us', message_from_excel)
        outfile.write('  },\n};\n')


def get_json_from_message_ts(message_file_name):
    """
    messages.ts 파일에서 값을 읽어서 JSON포맷으로 data 생성
    """
    def _get_locale_dict_from_file(f, s):
        locale_dict = {}
        keys = set()
        while '},\n' not in s:
            s = f.readline()
            pattern = re.compile(pattern_oneline_regex)
            row = pattern.findall(s)
            if row and row[0] and len(row[0]) > 1:
                locale_dict[row[0][0]] = row[0][1]
                keys.add(row[0][0])
            else:
                pattern_multiline_key = re.compile(pattern_multiline_key_regex)
                key = pattern_multiline_key.findall(s)
                if key and key[0]:
                    s = f.readline()
                    pattern_multiline_value = re.compile(pattern_multiline_value_regex)
                    value = pattern_multiline_value.findall(s)
                    if value and value[0]:
                        locale_dict[key[0]] = value[0]
                        keys.add(keys[0])

        return locale_dict, keys

    with open(message_file_name) as f:

        s = f.readline()

        while 'ko' not in s:
            s = f.readline()
        ko_kr_dict, ko_kr_keys = _get_locale_dict_from_file(f, s)

        while 'en' not in s:
            s = f.readline()
        en_us_dict, en_us_keys = _get_locale_dict_from_file(f, s)

    return {'keys': ko_kr_keys.union(en_us_keys), 'ko_kr': ko_kr_dict, 'en_us': en_us_dict}


def show_diff_ts_and_excel_list(locale, message_from_ts, message_from_excel):
    """
    Translations.xlsx excel 파일과 messages.ts 파일간의 차이를 보여줌
    - Returns: delete_list(messages.ts에는 있지만 Excel에는 없는 id목록)
    """
    json_diff = diff(message_from_ts.get(locale), message_from_excel.get(locale), syntax='symmetric')
    update_list = {}
    insert_list = {}
    delete_list = {}
    if type(json_diff) == list:
        json_diff = [elem for elem in json_diff if elem]
        json_diff = json_diff[0]
    for key, value in json_diff.items():
        if type(key) == str:
            update_list[key] = value
        elif key == insert:
            insert_list = value
        elif key == delete:
            delete_list = value

    print('\n*****************************{}*********************************'.format(locale))
    print('\n* message.ts에 새롭게 추가되는 id 목록\n')
    for key, value in insert_list.items():
        print('{}: {}'.format(key, value))
    print('\n* message.ts에 업데이트되는 id 목록\n')
    for key, value in update_list.items():
        print('{}: {}'.format(key, value))

    print('\n* message.ts에는 있지만 Excel파일에는 없는 id 목록')
    print('  - Excel파일에 해당 id값을 추가하거나, 사용하지 않는 id면 messages.ts에서 지워주세요\n')
    for key, value in delete_list.items():
        print('{}: {}'.format(key, value))

    return delete_list

def show_diff_sourcecode_and_excel_list(message_from_excel, message_from_ts, ignore_patterns):
    """
    Translations.xlsx/messages.ts 와 ReactJs source code내부의 번역 key값 목록의 차이를 보여줌
    """
    files = find_files(base_dir, ignore_patterns, extensions)
    translation_keys_in_source = find_keys(files)
    messages = message_from_excel.get('keys').union(message_from_ts.get('keys'))

    keys_to_be_deleted = messages.difference(translation_keys_in_source)
    keys_to_be_added = translation_keys_in_source.difference(messages)

    print('\n* ReactJs source에는 있지만 Translations.xlsx/messages.ts에는 없는 id 목록\n(Translations.xlsx에 추가해야함)\n')
    for key in keys_to_be_added:
        print(key)
    print('\n* Translations.xlsx/messages.ts에는 있지만 ReactJs source에는 없는 id 목록\n(지워도됨)\n')
    for key in keys_to_be_deleted:
        print(key)


def main():
    parser = argparse.ArgumentParser()

    parser.add_argument('filepath')
    parser.add_argument(
        '--ignore', '-i',
        action='append',
        dest='ignore_patterns',
        default=['node_modules'],
        help='Ignore files or directories matching this glob-style pattern. Use multiple times to ignore more.',
    )
    parser.add_argument(
        '--compare-source', '-cs',
        action='store_true',
        dest='compare_source',
        help='Compare translation keys in Reactjs Source and Excel.',
    )
    args = parser.parse_args()

    message_from_excel = get_json_from_excel(args.filepath)
    message_from_ts = get_json_from_message_ts(messages_dir)

    if args.compare_source:
        show_diff_sourcecode_and_excel_list(message_from_excel, message_from_ts, args.ignore_patterns)
        return

    extra_ids = {} # messages.ts에는 있지만 Excel에는 없는 번역 id목록
    extra_ids['ko_kr'] = show_diff_ts_and_excel_list('ko_kr', message_from_ts, message_from_excel)
    extra_ids['en_us'] = show_diff_ts_and_excel_list('en_us', message_from_ts, message_from_excel)

    is_continue = input("\nGenerate messages.ts ?\nEnter 'yes' or 'no': ")
    if not (is_continue == 'yes'):
        print('Generating the message.ts file was aborted')
        return

    generate_messages_file(message_from_excel, extra_ids)
    print('The message.ts file was successfully generated')


if __name__ == '__main__':
    main()
