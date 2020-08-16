import {LockOutlined, UserOutlined, PhoneOutlined} from '@ant-design/icons';
import {Button, Checkbox, Form, Input} from 'antd';
import {get} from 'lodash';
import React, {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {handleFieldError} from 'libs/api/errorHandle';
import {userUpdate, getUser} from 'libs/api/user';
import {TUserUpdate, TUser, setUserInfo} from 'modules/user';
import {TModalState} from 'modules/types';
import PasswordChangeModal from 'components/user/PasswordChangeModal';
import {Title, FormWrapper} from 'components/user/styles';
import {showNotification} from 'components/base/Common';
import {ERoute} from 'enums/route.enum';
import {ENotificationType} from 'enums/base.enum';
import {useDataApi} from 'libs/hooks';

const UserEdit = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [passwordChangeModal, setPasswordChangeModal] = useState<TModalState>({record: '', visible: false});
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [{data, loading}] = useDataApi<TUser>(getUser.bind(null));
  const onClickUserEdit = () => {
    form.validateFields().then(value => {
      handleUserEdit(value as TUserUpdate);
    });
  };
  const handleUserEdit = async (value: TUserUpdate) => {
    try {
      setSubmitButtonDisabled(true);
      const response = await userUpdate(value);
      dispatch(setUserInfo({
        ...get(response, 'data'),
      } as TUser));

      showNotification('success', '회원정보가 수정되었습니다');
    } catch (e) {
      handleFieldError(e, form);
      throw e;
    } finally {
      setSubmitButtonDisabled(false);
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      fullname_local: get(data, 'fullname', ''),
    });
  }, [data]);

  return (
	<FormWrapper>
	  <Title>회원정보수정</Title>
	  <Form
		form={form}
		name="login"
		className="form"
        layout="vertical"
	  >
		<Form.Item
          name={'fullname_local'}
          label='이름'
          className="form-item"
		>
		  <Input size="large" placeholder='이름'/>
		</Form.Item>
        <Form.Item label="비밀번호">
          <Button onClick={() => {setPasswordChangeModal({visible: true})}}>
            비밀번호 변경
          </Button>
		</Form.Item>
		<Form.Item shouldUpdate={true} className="form-button">
		  {() => (
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              onClick={onClickUserEdit}
              loading={submitButtonDisabled}
            >
			  수정하기
			</Button>
		  )}
		</Form.Item>
      </Form>
      <PasswordChangeModal modalState={passwordChangeModal} setModalState={setPasswordChangeModal}/>
	</FormWrapper>
  );
}

export default UserEdit;
