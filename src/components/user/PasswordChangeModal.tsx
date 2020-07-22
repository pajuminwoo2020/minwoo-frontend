import {Form, Input, Modal, Button} from 'antd';
import React, {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {get} from 'lodash';
import {passwordChange} from 'libs/api/user';
import {handleFieldError} from 'libs/api/errorHandle';
import {TPasswordChange} from 'modules/user';
import {TModalProps} from 'modules/types';
import {showNotification} from 'components/base/Common';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};
function PasswordChangeModal({modalState, setModalState}: TModalProps) {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  function handleCancel() {
    form.resetFields();
    setModalState({visible: false, record: ''});
  }

  function onClickSubmit() {
    form.validateFields().then(value => {
      handleSubmit(value as TPasswordChange);
    });

    async function handleSubmit (value: TPasswordChange) {
      try {
        setSubmitButtonDisabled(true);
        await passwordChange(value);
        showNotification('success', '비밀번호가 변경되었습니다');
        handleCancel();
      } catch (e) {
        handleFieldError(e, form);
        throw e;
      } finally {
        setSubmitButtonDisabled(false);
      }
    }
  }

  useEffect(() => {
    setVisible(modalState.visible);
  }, [modalState.visible]);

  return (
    <Modal
      title='패스워드 변경'
      visible={visible}
      centered={true}
      maskClosable={true}
      closable={true}
      footer={null}
      onCancel={handleCancel}
    >
      <Form form={form} colon={false} {...formItemLayout}>
        <Form.Item
          name={'password_old'}
          label="기존 비밀번호"
          rules={[{required: true, message: "기존 비밀번호를 입력해주세요"}]}
        >
          <Input.Password
            size="large"
            type="password"
            autoFocus={true}
          />
        </Form.Item>
        <Form.Item
          name={'password_new'}
          label="새 비밀번호"
          extra="8자리 이상, 문자/숫자 조합"
          rules={[{required: true, message: "새로운 비밀번호를 입력해주세요"}]}
        >
          <Input.Password size="large" type="password"/>
        </Form.Item>
        <Form.Item
          name={'repeat'}
          label="비밀번호 확인"
          dependencies={['password_new']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '패스워드를 입력해주세요',
            },
            ({getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password_new') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('패스워드가 일치하지 않습니다.');
              },
            }),
          ]}
        >
          <Input.Password size="large" type="password"/>
        </Form.Item>
        <div style={{height: '40px'}}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            onClick={onClickSubmit}
            disabled={submitButtonDisabled}
            style={{float: 'right'}}
          >
            비밀번호 변경
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

PasswordChangeModal.defaultProps = {};

export default PasswordChangeModal;
