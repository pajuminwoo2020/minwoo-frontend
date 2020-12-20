import {LockOutlined, UserOutlined, PhoneOutlined} from '@ant-design/icons';
import {Button, Checkbox, Form, Input} from 'antd';
import {get} from 'lodash';
import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {handleFieldError} from 'libs/api/errorHandle';
import {userCreate} from 'libs/api/user';
import {TUserCreate} from 'modules/user';
import {Title, FormWrapper} from 'components/user/styles';
import {ERoute, EMessageID} from 'enums/route.enum';
import {ENotificationType} from 'enums/base.enum';
import AgreeUniqueModal from 'components/modal/AgreeUniqueModal';

const Signup = () => {
  const [form] = Form.useForm();
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [agreeUniqueModal, setAgreeUniqueModal] = useState(false);
  const onClickSignup = () => {
    form.validateFields().then(value => {
      handleSignup(value as TUserCreate);
    });
  };
  const handleSignup = async (value: TUserCreate) => {
    try {
      setSubmitButtonDisabled(true);
      const response = await userCreate({
        userid: value.userid,
        password: value.password,
        fullname_local: value.fullname_local
	  });

      window.location.href = `${ERoute.UserLogin}?messageID=${EMessageID.SignupSuccess}&messageParam=${value.userid}`;
    } catch (e) {
      handleFieldError(e, form);
      throw e;
    } finally {
      setSubmitButtonDisabled(false);
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
		  name={'fullname_local'}
		  className="form-item"
		  rules={[{required: true, message: '이름을 입력해주세요'}]}
		>
		  <Input size="large" placeholder='이름'/>
		</Form.Item>
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
          extra="최소 8자이상, 문자/숫자 조합"
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
		  name={'password_check'}
		  className="form-item"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '패스워드를 입력해주세요',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('패스워드가 일치하지 않습니다.');
              },
            }),
          ]}
		>
		  <Input.Password
			size="large"
			prefix={<LockOutlined style={{color: 'rgba(0,0,0,.25)'}} />}
			type="password"
			placeholder='패스워드 확인'
		  />
		</Form.Item>
        <Form.Item name={'agreement'} className="form-bottom" valuePropName={'checked'}>
          <Checkbox style={{fontSize: '13px'}}>개인정보 수집 및 이용과 서비스 약관에 동의합니다.
            <Button style={{marginLeft: '20px'}} size="small" onClick={()=>{setAgreeUniqueModal(true);}}>내용보기</Button>
          </Checkbox>
        </Form.Item>
		<Form.Item shouldUpdate={true} className="form-button">
		  {() => (
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              onClick={onClickSignup}
              loading={submitButtonDisabled}
              disabled={
                submitButtonDisabled ||
                !form.getFieldValue('agreement')
              }
            >
			  회원가입
			</Button>
		  )}
		</Form.Item>
	  </Form>
      <AgreeUniqueModal visible={agreeUniqueModal} setVisible={setAgreeUniqueModal}/>
	</FormWrapper>
  );
}

export default Signup;
