import React from 'react';
import {Col, Row, Modal, Button} from 'antd';
import {textLineBreak} from 'libs/textLineBreak';

type TAgreeModalProps = {
  visible: boolean;
  setVisible: any;
};
const AgreePersonalModal = ({visible, setVisible}: TAgreeModalProps) => {
  function handleCancel() {
    setVisible(false);
  }

  return (
    <Modal
      title="개인정보 수집 및 이용 약관"
      visible={visible}
      centered={true}
      maskClosable={true}
      closable={true}
      footer={<Button onClick={handleCancel}>닫기</Button>}
      width={800}
      onCancel={handleCancel}
	>
      {textLineBreak(`• 수집항목 : 성명, 생년월일, 주소, 휴대폰번호, 이메일주소, 만14세 미만 회원은 법정대리인의 정보, 회비 약정 정보(신용카드, 자동이체), 신청동기
  • 목적 : 회원 가입 및 관리, 회비 결제 및 회원 서비스 제공, Personal 출금이체를 통한 후원금 출금, 기부금영수증 발급, 요청사항처리
  • 보유 및 이용기간 : 정보폐기 요청 시 까지(별도 요청이 없을 때에는 기부금영수증 발급명세의 보관 이유로 소득세법 시행령으로 정한 5년까지 보유)
  • 회원가입 거부권 및 불이익 : 회원가입 동의를 거부할 수 있으며 동의 거부 시 회원가입 서비스가 제공되지 않습니다.
      `)}
    </Modal>
  );
};

AgreePersonalModal.defaultProps = {};

export default AgreePersonalModal;
