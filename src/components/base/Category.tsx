import {CloseOutlined, SearchOutlined} from '@ant-design/icons/lib';
import {Select} from 'antd';
import {isEmpty} from 'lodash';
import React, {useState} from 'react';
import {CSSProperties} from 'styled-components';
import {TPagination, TSelectList} from 'modules/types';
import {EBoardType} from 'enums/board.enum';
import {getCategoriesSelect} from 'libs/api/board';
import {useDataApi} from 'libs/hooks';

type TCategoryProps = {
  pagination: TPagination;
  reloadPage: (page: Partial<TPagination>) => void;
  boardType: EBoardType;
  style?: CSSProperties;
};
const {Option} = Select;
const Category = ({pagination, reloadPage, boardType, style}: TCategoryProps) => {
  const [{data, loading}] = useDataApi<TSelectList>(
    getCategoriesSelect.bind(null, boardType),
    [],
  );

  function handleSelect(value: string) {
     reloadPage({
       current: 1,
       category: value,
     });
  }

  return (
    <Select
      size="large"
      style={{width: '120px', float: 'left'}}
      onSelect={handleSelect}
      defaultValue=""
    >
      <Option value='' key=''>
        전체
      </Option>
      {data.map(v => {
        return (
          <Option value={v.value} key={v.value}>
            {v.label}
          </Option>
        );
      })}
    </Select>
  );
};

export default Category;
