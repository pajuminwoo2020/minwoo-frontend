import React from 'react';
import {Col, Row, Modal, Button} from 'antd';
import {textLineBreak} from 'libs/textLineBreak';

type TAgreeModalProps = {
  visible: boolean;
  setVisible: any;
};
const AgreeOfferModal = ({visible, setVisible}: TAgreeModalProps) => {
  function handleCancel() {
    setVisible(false);
  }

  return (
    <Modal
      title="개인정보 제3자 제공 동의 약관"
      visible={visible}
      centered={true}
      maskClosable={true}
      closable={true}
      footer={<Button onClick={handleCancel}>닫기</Button>}
      width={800}
      onCancel={handleCancel}
	>
	  {textLineBreak(`1)
제공대상: 금융결재원
목적: CMS출금이체 서비스제공 및 출금 동의 확인, 출금이체 신규 등록 및 해지 사실통보
항목: 은행, 계좌번호, 예금주, 생년월일
보유 및 이용기간: 회원·후원종료 또는 서비스 이용 종료 시까지
동의거부에 따른 불이익: 동의/거부 할 수 있으며, 거부 시 CMS자동이체를 통한 후원신청불가

2)
제공대상: 휴먼소프트웨어
목적: 회원·후원자 및 결제 데이터 관리 및 기부금 영수증 발급관리
항목: 이름, 연락처, 주소 등 회원·후원자가 제공한 정보 및 후원금결제정보
보유 및 이용기간: 정보 폐기 요청 시 (별도 요청이 없을 때에는 기부금영수증 발급을 위한 관계법령에서 정한 5년)
동의거부에 따른 불이익: 동의/거부 할 수 있으며, 거부 시 회원 정보관련 요청 시 제한이 있을 수 있습니다.

3)
제공대상: (주)영진다이렉컴
목적: 이름, 연락처, 주소 등 회원·후원자가 제공한 정보
항목: 이름, 연락처, 주소 등 회원·후원자가 제공한 정보 및 후원금결제정보
보유 및 이용기간: 회원 · 후원해지 시
동의거부에 따른 불이익: 동의/거부 할 수 있으며, 거부 시 활동소식 및 뉴스레터를 받을 수 없습니다.

4)
제공대상: NICE페이먼츠
목적: 후원금출금을 위한 신용카드/실시간계좌이체/휴대폰 결제 서비스 이용
항목: 성명, 카드사, 카드번호, 유효기간, 생년월일, 휴대폰 번호 등 결제에 필요한 정보
보유 및 이용기간: 후원종료 또는 서비스이용 종료 시 까지
동의거부에 따른 불이익: 신용카드결제, 실시간계좌이체, 휴대폰결제 방식의 후원금 결제 불가 
        `)}
    </Modal>
  );
};

AgreeOfferModal.defaultProps = {};

export default AgreeOfferModal;
