import {LockOutlined, UserOutlined, PhoneOutlined} from '@ant-design/icons';
import {Button, Checkbox, Form, Input} from 'antd';
import {get} from 'lodash';
import queryString from 'query-string';
import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {handleFieldError} from 'libs/api/errorHandle';
import {userLogin} from 'libs/api/user';
import {TUserLogin} from 'modules/user';
import {TPasswordReset} from 'modules/user';
import {Title, FormWrapper} from 'components/user/styles';
import {ERoute} from 'enums/route.enum';
//import {UserOutlined} from '@ant-design/icons';
//import {Button, Form, Input} from 'antd';
//import React from 'react';
//import {useIntl} from 'react-intl';
//import {handleFieldError} from '../../libs/api/errorHandle';
import {passwordReset} from '../../libs/api/user';
//import {openNotificationInfo} from '../base/modal/MoreActionModal';
//import {FormBox, FormWrapper, Title} from './UserTemplate';

const PasswordReset = () => {
  //const {formatMessage: f} = useIntl();
  const [form] = Form.useForm();
  const next = queryString.parse(useLocation().search)?.next?.toString();

  const handleSubmit = async (value: TPasswordReset) => {
    try {
      await passwordReset({userid: value.userid});
      //openNotificationInfo('success', f({id: 'login.message.email_check'}, {email: form.getFieldValue('userid')}));

      //팝업창 띄워서 이메일 보냈으니 확인하라는 메시지..?
      window.location.href = next ? next : ERoute.UserLogin;
    } catch (e) {
      handleFieldError(e, form);
      throw e;
    }
  };
  const onClickSubmit = () => {
    form.validateFields().then(value => {
      handleSubmit(value as TPasswordReset);
    });
  };

  return (
    <Form>
      <FormWrapper>
        <Title>비밀번호 재설정</Title>
        <Form form={form} name="login" className="login-form">
          <Form.Item
            name={'userid'}
            className="form-item"
            rules={[
              {
                type: 'email',
                message: 'login.message.invalid_email',
              },
              {required: true, message: 'login.message.input_email'},
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}} />}
              placeholder='이메일'
            />
          </Form.Item>
          <Form.Item shouldUpdate={true} className="login-form-button">
            {() => (
              <Button type="primary" htmlType="submit" size="large" onClick={onClickSubmit}>
                {'이메일 보내기'}
              </Button>
            )}
          </Form.Item>
        </Form>
      </FormWrapper>
    </Form>
  ); 
}

export default PasswordReset;
