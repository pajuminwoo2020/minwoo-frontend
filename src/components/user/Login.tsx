import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Checkbox, Form, Input} from 'antd';
import {get} from 'lodash';
import React, {useState} from 'react';
import {useIntl} from 'react-intl';
import {Link, useLocation} from 'react-router-dom';
import {handleFieldError} from 'libs/api/errorHandle';
import {userLogin} from 'libs/api/user';
import {TUserLogin} from 'modules/user';

function Login() {
  const {formatMessage: f} = useIntl();
  const [form] = Form.useForm();

  return (
    <>
      <span>HELLO</span>
    </>
  );
}

export default Login;
