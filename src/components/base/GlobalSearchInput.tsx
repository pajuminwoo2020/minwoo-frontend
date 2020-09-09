import {CloseOutlined, SearchOutlined} from '@ant-design/icons/lib';
import {Input} from 'antd';
import {isEmpty} from 'lodash';
import React, {useEffect, useState} from 'react';
import {useDataApi, usePagination} from 'libs/hooks';
import {CSSProperties} from 'styled-components';
import {TListResponse, TPagination, RouteMatch, TSelectList} from 'modules/types';
import {
  getBoardActions,
  getBoardAction,
  createBoardAction,
  deleteBoardAction,
  updateBoardAction,
} from 'libs/api/board';
import {TBoardDetail} from 'modules/board';
import {ERoute} from 'enums/route.enum';

const GlobalSearchInput = () => {
  const [showInput, setShowInput] = useState(false);
  const [globalSearchInputText, setGlobalSearchInputText] = useState('');

  return (
    <div style={{width: '100px'}}>
      {showInput===false ? (
        <a onClick={e => {setShowInput(true);}}><SearchOutlined/></a>
      ) : (
        <Input
          autoFocus
          size="large"
          placeholder="제목/내용"
          className="search-input"
          style={{width: '200px', zIndex: 1}}
          onBlur={e => {setShowInput(false);}}
          prefix={
            isEmpty(globalSearchInputText) ? (
              <SearchOutlined/>
            ) : (
              <CloseOutlined onClick={() => {setGlobalSearchInputText('');}}/>
            )
          }
          value={globalSearchInputText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGlobalSearchInputText(e.currentTarget.value)}
          allowClear
          onPressEnter={(e: React.KeyboardEvent<HTMLInputElement>) => {
            window.location.href = `${ERoute.SearchGlobal}?q=${globalSearchInputText}`;
          }}
        />
      )}
    </div>
  );
};

export default GlobalSearchInput;
