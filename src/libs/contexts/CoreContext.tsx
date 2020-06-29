import {ConfigProvider} from 'antd';
import ko_KR from 'antd/es/locale/ko_KR';
import {get} from 'lodash';
import React from 'react';
import {useIntl} from 'react-intl';
import {shallowEqual, useSelector} from 'react-redux';
import {RootState} from 'modules';
import messages from 'translations/messages';
import {getNavigatorLanguage} from 'libs/utils';
import {ModalProvider} from 'libs/contexts/ModalContext';
import {SideMenuProvider} from 'libs/contexts/SideMenuContext';
import {EUserLanguage} from 'enums/base.enum';

export const CoreProvider: React.FC<{}> = ({children}) => {
  const {formatMessage: f} = useIntl();
  const language = getNavigatorLanguage(EUserLanguage.Korean);
  const validateMessages = {
    required: f({id: 'form.field.message.required'}),
  };

  return (
    <ConfigProvider
      locale={get(messages, `${language}.antdLocale`, ko_KR)}
      form={{validateMessages}}
      renderEmpty={(e) => <>{f({id: 'empty.no_content'})}</>}
    >
      <ModalProvider>
        <SideMenuProvider>
          {children}
        </SideMenuProvider>
      </ModalProvider>
    </ConfigProvider>
  );
};
