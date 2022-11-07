import {LockOutlined, UserOutlined, PhoneOutlined} from '@ant-design/icons';
import {Button, Checkbox, Form, Input} from 'antd';
import {get} from 'lodash';
import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {shallowEqual, useSelector} from 'react-redux';
import {RootState} from 'modules';
import {handleFieldError} from 'libs/api/errorHandle';
import {userLogin} from 'libs/api/user';
import {TUserLogin} from 'modules/user';
import {TPasswordReset} from 'modules/user';
import {Title, FormWrapper} from 'components/user/styles';
import {ERoute, EMessageID} from 'enums/route.enum';
import {ENotificationType} from 'enums/base.enum';
import {passwordReset} from 'libs/api/user';

const PasswordReset = () => {
  const information = useSelector((state: RootState) => state.information.info, shallowEqual);
  const [form] = Form.useForm();
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const handleSubmit = async (value: TPasswordReset) => {
    try {
      setSubmitButtonDisabled(true);
      await passwordReset({userid: value.userid});

      window.location.href = `${ERoute.UserLogin}?messageID=${EMessageID.PasswordReset}&messageParam=${value.userid}`;
    } catch (e) {
      handleFieldError(e, form);
      throw e;
    } finally {
      setSubmitButtonDisabled(false);
    }
  };
  const onClickSubmit = () => {
    form.validateFields().then(value => {
      handleSubmit(value as TPasswordReset);
    });
  };

  return (
    <FormWrapper>
      <Title>비밀번호 재설정</Title>
      <Form
        form={form}
        name="password_reset"
        className="form"
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
        <Form.Item shouldUpdate={true} className="form-button">
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              onClick={onClickSubmit}
              loading={submitButtonDisabled}
            >
              {'이메일 보내기'}
            </Button>
          )}
        </Form.Item>
      </Form>
      <Form className="form">
        이메일로 비밀번호 재설정 링크가 전송됩니다.
        <br/>
        가입 시 등록한 이메일 주소를 잊으신 경우, 관리자에게 연락주시기 바랍니다.
        <br/>
        (<PhoneOutlined/>) {get(information, 'membership_management_phone')}
	  </Form>
    </FormWrapper>
  );
}

export default PasswordReset;
