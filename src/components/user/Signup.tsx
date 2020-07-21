import {LockOutlined, UserOutlined, PhoneOutlined} from '@ant-design/icons';
import {Button, Checkbox, Form, Input} from 'antd';
import {get} from 'lodash';
import queryString from 'query-string';
import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {handleFieldError} from 'libs/api/errorHandle';
import {userCreate} from 'libs/api/user';
import {TUserCreate} from 'modules/user';
import {Title, FormWrapper} from 'components/user/styles';
import {ERoute} from 'enums/route.enum';
import {ENotificationType} from 'enums/base.enum';
import {useHistory} from 'react-router-dom';

const Signup = () => {
  const [form] = Form.useForm();
  const next = queryString.parse(useLocation().search)?.next?.toString();
  const history = useHistory();
  const onClickSignup = () => {
    form.validateFields().then(value => {
      handleSignup(value as TUserCreate);
    });
  };
  const handleSignup = async (value: TUserCreate) => {
    try {
      const response = await userCreate({
        userid: value.userid,
        password: value.password,
        fullname_local: value.fullname_local
	  });
	  
	  let redirectPath = ERoute.UserLogin;
	  
      history.push({
        pathname: redirectPath,
        state: {
          notification: {type: ENotificationType.Success, content: '회원가입이 완료되었습니다. 이메일을 확인하세요.'},
        },
      });
    } catch (e) {
      handleFieldError(e, form);
      throw e;
    }
  };

  return (
	<FormWrapper>
	  <Title>회원가입</Title>
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
		<Form.Item
		  name={'fullname_local'}
		  className="form-item"
		  rules={[{required: true, message: '이름을 입력해주세요'}]}
		>
		  <Input size="large" placeholder='이름'/>
		</Form.Item>
		<Form.Item shouldUpdate={true} className="form-button">
		  {() => (
			<Button type="primary" htmlType="submit" size="large" onClick={onClickSignup}>
			  회원가입
			</Button>
		  )}
		</Form.Item>
	  </Form>
	</FormWrapper>
  );
}

export default Signup;
