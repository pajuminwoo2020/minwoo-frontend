import React from 'react';
import {Col, Row, Modal, Button} from 'antd';
import {textLineBreak} from 'libs/textLineBreak';
import {AgreementText} from 'components/base/Agreement';

type TAgreeModalProps = {
  visible: boolean;
  setVisible: any;
};
const AgreeUniqueModal = ({visible, setVisible}: TAgreeModalProps) => {
  function handleCancel() {
    setVisible(false);
  }

  return (
    <Modal
      title="이용 약관"
      visible={visible}
      centered={true}
      maskClosable={true}
      closable={true}
      footer={<Button onClick={handleCancel}>닫기</Button>}
      width={800}
      onCancel={handleCancel}
	>
      {textLineBreak(AgreementText)}
    </Modal>
  );
};

AgreeUniqueModal.defaultProps = {};

export default AgreeUniqueModal;
