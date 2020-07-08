import {CloseOutlined, SearchOutlined} from '@ant-design/icons/lib';
import {Input} from 'antd';
import {isEmpty} from 'lodash';
import React, {useState} from 'react';
import {CSSProperties} from 'styled-components';
import {TPagination} from 'modules/types';

type TSearchInputProps = {
  pagination: TPagination;
  reloadPage: (page: Partial<TPagination>) => void;
  placeHolder?: string;
  style?: CSSProperties;
  disabled?: boolean;
};

const SearchInput = ({pagination, reloadPage, placeHolder='제목/작성자', style, disabled = false}: TSearchInputProps) => {
  const [searchInputText, setSearchInputText] = useState(pagination.q);

  return (
    <Input
      size="large"
      disabled={disabled}
      placeholder={placeHolder}
      className="search-input"
      prefix={
        isEmpty(pagination.q) ? (
          <SearchOutlined/>
        ) : (
          <CloseOutlined
            onClick={() => {
              setSearchInputText('');
              reloadPage({
                q: '',
              });
            }}
          />
        )
      }
      style={{
        ...style,
      }}
      value={searchInputText}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchInputText(e.currentTarget.value)}
      allowClear
      onPressEnter={(e: React.KeyboardEvent<HTMLInputElement>) => {
        reloadPage({
          current: 1,
          q: searchInputText,
        });
      }}
    />
  );
};

export default SearchInput;
