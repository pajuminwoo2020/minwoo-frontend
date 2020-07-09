import React, {useEffect} from 'react';
import {Location} from 'history';
import {get, remove} from 'lodash';
import {message} from 'antd';
import {useLocation, useHistory} from 'react-router-dom';
import {ENotificationType} from 'enums/base.enum';

function showMessage(location: Location<{} | null | undefined>, history?: any) {
  const notification = get(location.state, 'notification');

  if (notification && notification.content) {
    if (notification.type === ENotificationType.Error) {
      message.error(notification.content);
    } else { /* ENotificationType.Success */
      message.success(notification.content);
    }
    history.replace(location.pathname, null); // 메시지 한번만 보이게 history 삭제
  }
}

function NotificationMessage() {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    showMessage(location, history);
  }, [location]);

  return <></>;
}

NotificationMessage.defaultProps = {};

export default NotificationMessage;
