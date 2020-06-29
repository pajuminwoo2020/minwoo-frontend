import React, {useEffect} from 'react';
import {Location} from 'history';
import {get} from 'lodash';
import {message} from 'antd';
import {useLocation} from 'react-router-dom';
import {ENotificationType} from 'enums/base.enum';

function showMessage(location: Location<{} | null | undefined>) {
  const notification = get(location.state, 'notification');
  if (notification && notification.content) {
    if (notification.type === ENotificationType.Error) {
      message.error(notification.content);
    } /* ENotificationType.Success */ else {
      message.success(notification.content);
    }
  }
}

function NotificationMessage() {
  const location = useLocation();

  useEffect(() => {
    showMessage(location);
  }, [location]);

  return <></>;
}

NotificationMessage.defaultProps = {};

export default NotificationMessage;
