import {Editor} from '@tinymce/tinymce-react';
import React, {useCallback, useEffect, useState} from 'react';
import {Spin} from 'antd';
import {CDefaultEditorHeight, CDefaultEditorPlugins, CDefaultEditorToolbars} from 'constants/base.const';
import Configs from 'config';
import debounce from 'lodash.debounce';


type TEditorComponentProps = {
  content?: string,
  onChange?: (value: string) => void,
  disabled?: boolean;
};

const EditorComponent: React.FC<TEditorComponentProps> = ({
  content,
  onChange,
  disabled = false,
}) => {
  const [loading, setLoading] = useState(true);
  const onEditorChange = (editorContent: string) => {
    onChange && onChange(editorContent);
  };

  return (
    <Spin tip="로딩중.." spinning={loading}>
      <input
        type="file"
        id="image-upload-tinymce"
        style={{ display: "none" }}
        accept="image/png, image/gif, image/jpeg, image/jpg, image/svg"
      />
      <Editor
        apiKey={Configs.EDITOR_API_KEY}
        value={content}
        init={{
          setup: function (ed: any) {
            ed.on('init', function() {
              setLoading(false);
            });
          },
          height: CDefaultEditorHeight,
          statusbar: false,
          plugins: CDefaultEditorPlugins,
          toolbar: CDefaultEditorToolbars,
          branding: false,
          image_advtab: true,
          paste_data_images: true,
          file_browser_callback_types: 'image',
          file_picker_callback: (callback: any, value: any, meta: any) => {
            if (meta.filetype == 'image') {
              const input = document.getElementById('image-upload-tinymce') as HTMLInputElement;

              input.click();
              input.onchange = () => {
                  const file = (input.files as FileList)[0];
                  const reader = new FileReader();

                  reader.onload = (e: any) => {
                      let img = new Image();
                      img.src = reader.result as string;

                      callback(e.target.result, {
                          alt: file.name
                      });
                      debounce(onEditorChange, 10000);
                  };
                  reader.readAsDataURL(file);
              };
            }
          },
        }}
        onEditorChange={onEditorChange}
        disabled={disabled}
      />
    </Spin>
  );
};


EditorComponent.defaultProps = {};

export default EditorComponent;
