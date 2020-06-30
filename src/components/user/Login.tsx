import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Checkbox, Form, Input} from 'antd';
import {get} from 'lodash';
import queryString from 'query-string';
import React, {useState} from 'react';
import {useIntl} from 'react-intl';
import {Link, useLocation} from 'react-router-dom';
import {handleFieldError} from 'libs/api/errorHandle';
import {userLogin} from 'libs/api/user';
import {TUserLogin} from 'modules/user';
import {showNotification} from 'components/base/Common';
import {Title, FormWrapper, FormBox} from 'components/user/UserStyles';

const  Login = () => {
  const {formatMessage: f} = useIntl();
  const [form] = Form.useForm();
  const next = get(useLocation().state, 'from');
  const onClickLogin = () => {
    form.validateFields().then(value => {
      handleLogin(value as TUserLogin);
    });
  };
  const handleLogin = async (value: TUserLogin) => {
    try {
      const response = await userLogin({
        userid: value.userid,
        password: value.password,
        is_remember: value.is_remember
      });

      showNotification('success', 'Successfully logged in');
      //window.location.href = next ? next : '/';
    } catch (e) {
      handleFieldError(e, form);
      throw e;
    }
  };

  return (
    <FormBox>
      <FormWrapper>
        <Title>{f({id: 'login.title'})}</Title>
        <Form
          form={form}
          name="login"
          className="login-form"
          initialValues={{
            is_remember: true,
          }}
        >
          <Form.Item
            name={'userid'}
            className="form-item"
            rules={[
              {
                type: 'email',
                message: f({id: 'login.message.invalid_email'}),
              },
              {required: true, message: f({id: 'login.message.input_email'})},
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}} />}
              placeholder={f({id: 'login.form.email'})}
            />
          </Form.Item>
          <Form.Item
            name={'password'}
            className="form-item"
            rules={[{required: true, message: f({id: 'login.message.input_password'})}]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined style={{color: 'rgba(0,0,0,.25)'}} />}
              type="password"
              placeholder={f({id: 'login.form.password'})}
            />
          </Form.Item>
          <Form.Item shouldUpdate={true} className="login-form-button">
            {() => (
              <Button type="primary" htmlType="submit" size="large" onClick={onClickLogin}>
                {f({id: 'login.text.login'})}
              </Button>
            )}
          </Form.Item>
          <div>
            <Form.Item name={'is_remember'} className="login-form-bottom" valuePropName={'checked'}>
              <Checkbox>{f({id: 'login.text.stay_signed_in'})}</Checkbox>
            </Form.Item>
          </div>
        </Form>
      </FormWrapper>
    </FormBox>
  );
}

export default Login;
