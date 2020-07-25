import {LockOutlined, UserOutlined, PhoneOutlined} from '@ant-design/icons';
import {Button, Checkbox, Form, Input} from 'antd';
import {get} from 'lodash';
import queryString from 'query-string';
import React, {useState} from 'react';
import {Link, useLocation, useHistory} from 'react-router-dom';
import {handleFieldError} from 'libs/api/errorHandle';
import {userLogin} from 'libs/api/user';
import {TUserLogin} from 'modules/user';
import {TPasswordReset} from 'modules/user';
import {Title, FormWrapper} from 'components/user/styles';
import {ERoute} from 'enums/route.enum';
import {ENotificationType} from 'enums/base.enum';
import {passwordReset} from 'libs/api/user';
import {CPhone} from 'constants/base.const';

const PasswordReset = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const handleSubmit = async (value: TPasswordReset) => {
    try {
      setSubmitButtonDisabled(true);
      await passwordReset({userid: value.userid});

      history.push({
        pathname: ERoute.UserLogin,
        state: {
          notification: {type: ENotificationType.Success, content: `비밀번호 재설정 메일을 보냈습니다. 이메일[${value.userid}]을 확인하세요`},
        },
      });
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
        <Form.Item shouldUpdate={true} className="form-button">
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              onClick={onClickSubmit}
              disabled={submitButtonDisabled}
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
        (<PhoneOutlined/>) {CPhone}
	  </Form>
    </FormWrapper>
  );
}

export default PasswordReset;
