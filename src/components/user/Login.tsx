import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Checkbox, Form, Input} from 'antd';
import {get} from 'lodash';
import queryString from 'query-string';
import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {handleFieldError} from 'libs/api/errorHandle';
import {userLogin} from 'libs/api/user';
import {TUserLogin} from 'modules/user';
import {Title, FormWrapper} from 'components/user/styles';

const Login = () => {
  const [form] = Form.useForm();
  const next = queryString.parse(useLocation().search)?.next?.toString();
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

      window.location.href = next ? next : '/';
    } catch (e) {
      handleFieldError(e, form);
      throw e;
    }
  };

  return (
	<FormWrapper>
	  <Title>로그인</Title>
	  <Form
		form={form}
		name="login"
		className="form"
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
			  message: '이메일 형식이 올바르지 않습니다',
			},
			{required: true, message: '이메일을 입력해주세요'},
		  ]}
		>
		  <Input
			size="large"
			prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}} />}
			placeholder='이메일주소'
		  />
		</Form.Item>
		<Form.Item
		  name={'password'}
		  className="form-item"
		  rules={[{required: true, message: '패스워드를 입력해주세요'}]}
		>
		  <Input.Password
			size="large"
			prefix={<LockOutlined style={{color: 'rgba(0,0,0,.25)'}} />}
			type="password"
			placeholder='패스워드'
		  />
		</Form.Item>
		<Form.Item shouldUpdate={true} className="form-button">
		  {() => (
			<Button type="primary" htmlType="submit" size="large" onClick={onClickLogin}>
			  로그인
			</Button>
		  )}
		</Form.Item>
		<div>
		  <Form.Item name={'is_remember'} valuePropName={'checked'}>
			<Checkbox>로그인 상태 유지</Checkbox>
		  </Form.Item>
		</div>
	  </Form>
	</FormWrapper>
  );
}

export default Login;
