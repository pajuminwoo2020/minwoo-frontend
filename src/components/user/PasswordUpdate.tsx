import {LockOutlined, UserOutlined, PhoneOutlined} from '@ant-design/icons';
import {Button, Checkbox, Form, Input} from 'antd';
import {get} from 'lodash';
import React, {useState} from 'react';
import {Link, useLocation, useHistory, useParams} from 'react-router-dom';
import {handleFieldError} from 'libs/api/errorHandle';
import {TUserLogin} from 'modules/user';
import {TPasswordUpdate} from 'modules/user';
import {Title, FormWrapper} from 'components/user/styles';
import {ERoute} from 'enums/route.enum';
import {ENotificationType} from 'enums/base.enum';
import {passwordUpdate} from 'libs/api/user';

const PasswordUpdate = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const {uidb64 = '', token = ''} = useParams();
  const handleSubmit = async (value: TPasswordUpdate) => {
    try {
      setSubmitButtonDisabled(true);
      await passwordUpdate(uidb64, token, {password_new: value.password_new});

      history.push({
        pathname: ERoute.UserLogin,
        state: {
          notification: {type: ENotificationType.Success, content: '비밀번호 재설정이 완료되었습니다. 새로운 비밀번호로 로그인해주세요'},
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
      handleSubmit(value as TPasswordUpdate);
    });
  };

  return (
    <FormWrapper>
      <Title>새로운 비밀번호 입력</Title>
      <Form
        form={form}
        name="password_update"
        className="form"
      >
		<Form.Item
		  name={'password_new'}
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
          dependencies={['password_new']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '패스워드를 입력해주세요',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password_new') === value) {
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
        <Form.Item shouldUpdate={true} className="form-button">
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              onClick={onClickSubmit}
              disabled={submitButtonDisabled}
            >
              {'비밀번호 변경'}
            </Button>
          )}
        </Form.Item>
      </Form>
    </FormWrapper>
  );
}

export default PasswordUpdate;
