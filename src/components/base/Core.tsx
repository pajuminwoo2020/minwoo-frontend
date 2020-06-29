import {get, isEmpty} from 'lodash';
import * as React from 'react';
import {useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import {useIntl} from 'react-intl';
import {shallowEqual, useSelector} from 'react-redux';
import GlobalStyles from 'GlobalStyles';
import {useDidMount} from 'libs/hooks';
import useModal from 'libs/hooks/useModal';
import {RootState} from 'modules';
import NotificationMessage from 'components/modal/NotificationMessage';

const Core: React.FC = () => {
  const {formatMessage: f} = useIntl();
  const [modal, setModal] = useModal();

  const didMount = useDidMount();

  useEffect(() => {
    (window as any).Beacon && (window as any).Beacon('identify', {
      name: 'Big Step',
    });
  }, [didMount]);

  return (
    <>
      <Helmet>
        <title>{f({id: 'head.title.main'})}</title>
        <meta name="description" content={f({id: 'head.title.description'})}/>
        <meta property="og:title" content={f({id: 'head.title.main'})}/>
        <meta property="og:description" content={f({id: 'head.title.description'})}/>
      </Helmet>
      <GlobalStyles/>
      <NotificationMessage/>
    </>
  );
};

export default Core;
