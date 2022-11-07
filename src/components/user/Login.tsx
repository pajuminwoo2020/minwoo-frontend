import {LockOutlined, UserOutlined, PhoneOutlined} from '@ant-design/icons';
import {Button, Checkbox, Form, Input, Alert} from 'antd';
import {get} from 'lodash';
import queryString from 'query-string';
import React, {useState, useEffect} from 'react';
import {shallowEqual, useSelector} from 'react-redux';
import {RootState} from 'modules';
import {Link, useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {handleFieldError} from 'libs/api/errorHandle';
import {userLogin} from 'libs/api/user';
import {TUserLogin, TUser, setUserInfo} from 'modules/user';
import {Title, FormWrapper} from 'components/user/styles';
import {EMessageID} from 'enums/route.enum';

const Login = () => {
  const location = useLocation();
  const messageID = queryString.parse(useLocation().search)?.messageID?.toString();
  const messageParam = queryString.parse(useLocation().search)?.messageParam?.toString();
  const information = useSelector((state: RootState) => state.information.info, shallowEqual);
  const [form] = Form.useForm();
  const next = queryString.parse(useLocation().search)?.next?.toString();
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const dispatch = useDispatch();
  const onClickLogin = () => {
    form.validateFields().then(value => {
      handleLogin(value as TUserLogin);
    });
  };
  const handleLogin = async (value: TUserLogin) => {
    try {
      setSubmitButtonDisabled(true);
      const response = await userLogin({
        userid: value.userid,
        password: value.password,
        is_remember: value.is_remember
      });

      window.location.href = next ? next : '/';
    } catch (e) {
      handleFieldError(e, form);
      throw e;
    } finally {
      setSubmitButtonDisabled(false);
    }
  };

  useEffect(() => {
    if (messageID === EMessageID.SignupSuccess) {
      setAlertMessage(`이메일[${messageParam}] 인증 후에 로그인할 수 있습니다.`);
    }
  }, [location]);

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
        {alertMessage && <Alert message={alertMessage} type="warning" showIcon closable/>}
		<Form.Item shouldUpdate={true} className="form-button">
		  {() => (
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              onClick={onClickLogin}
              loading={submitButtonDisabled}
            >
			  로그인
			</Button>
		  )}
		</Form.Item>
		<div className="form-bottom">
		  <Form.Item name={'is_remember'} valuePropName={'checked'}>
			<Checkbox>로그인 상태 유지</Checkbox>
		  </Form.Item>
		  <Form.Item style={{float: 'right'}}>
            <Link to="/user/password/reset">비밀번호찾기</Link>
		  </Form.Item>
		</div>
	  </Form>
      <Form className="form">
        가입 시 등록한 이메일 주소를 잊으신 경우, 관리자에게 연락주시기 바랍니다.
        <br/>
        (<PhoneOutlined/>) {get(information, 'membership_management_phone')}
	  </Form>
	</FormWrapper>
  );
}

export default Login;
