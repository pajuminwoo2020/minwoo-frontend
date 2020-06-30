import React from 'react';
import {IconType} from 'antd/lib/notification';
import {notification} from 'antd';

export const showNotification = (type: IconType, message: string | React.ReactNode) => {
  notification[type]({
    top: 5,
    duration: 2,
    message: message,
  });
};

