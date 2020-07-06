import {ConfigProvider} from 'antd';
import ko_KR from 'antd/es/locale/ko_KR';
import {get} from 'lodash';
import React from 'react';
import {shallowEqual, useSelector} from 'react-redux';
import {RootState} from 'modules';
import {ModalProvider} from 'libs/contexts/ModalContext';
import {SideMenuProvider} from 'libs/contexts/SideMenuContext';
import {EUserLanguage} from 'enums/base.enum';

export const CoreProvider: React.FC<{}> = ({children}) => {
  const validateMessages = {
    required: "필수 항목입니다",
  };

  return (
    <ConfigProvider
      locale={ko_KR}
      form={{validateMessages}}
      renderEmpty={(e) => <>Empty</>}
    >
      <ModalProvider>
        <SideMenuProvider>
          {children}
        </SideMenuProvider>
      </ModalProvider>
    </ConfigProvider>
  );
};
