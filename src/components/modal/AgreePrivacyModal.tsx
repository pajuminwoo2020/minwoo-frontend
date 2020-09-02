import React from 'react';
import {Col, Row, Modal, Button} from 'antd';
import {textLineBreak} from 'libs/textLineBreak';
import {PrivacyText} from 'components/base/Privacy';

type TAgreeModalProps = {
  visible: boolean;
  setVisible: any;
};
const AgreePrivacyModal = ({visible, setVisible}: TAgreeModalProps) => {
  function handleCancel() {
    setVisible(false);
  }

  return (
    <Modal
      title="개인정보 보호정책"
      visible={visible}
      centered={true}
      maskClosable={true}
      closable={true}
      footer={<Button onClick={handleCancel}>닫기</Button>}
      width={800}
      onCancel={handleCancel}
	>
      {textLineBreak(PrivacyText)}
    </Modal>
  );
};

AgreePrivacyModal.defaultProps = {};

export default AgreePrivacyModal;
