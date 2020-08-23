import {get, isEmpty, isNil} from 'lodash';
import * as React from 'react';
import {useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import GlobalStyles from 'GlobalStyles';
import {useDidMount} from 'libs/hooks';
import useModal from 'libs/hooks/useModal';
import {RootState} from 'modules';
import NotificationMessage from 'components/modal/NotificationMessage';

const Core: React.FC = () => {
  const [modal, setModal] = useModal();
  const didMount = useDidMount();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.current_user, shallowEqual);

  useEffect(() => {
    if (isNil(currentUser) === false) {
      (window as any).Beacon && (window as any).Beacon('identify', {
        name: 'Minwoo',
      });
    }
  }, [didMount]);

  return (
    <>
      <Helmet>
        <title>파주여성민우회</title>
        <meta name="description" content="민우회"/>
        <meta property="og:title" content="민우회"/>
        <meta property="og:description" content="민우회"/>
      </Helmet>
      <GlobalStyles/>
      <NotificationMessage/>
    </>
  );
};

export default Core;
