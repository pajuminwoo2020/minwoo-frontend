import React from 'react';
import {Col, Row, Modal, Button} from 'antd';
import {textLineBreak} from 'libs/textLineBreak';

type TAgreeModalProps = {
  visible: boolean;
  setVisible: any;
};
const AgreeCMSModal = ({visible, setVisible}: TAgreeModalProps) => {
  function handleCancel() {
    setVisible(false);
  }

  return (
    <Modal
      title="CMS 약관"
      visible={visible}
      centered={true}
      maskClosable={true}
      closable={true}
      footer={<Button onClick={handleCancel}>닫기</Button>}
      width={800}
      onCancel={handleCancel}
	>
	  {textLineBreak(`CMS 이용약관
	[제1조 목적]
	본 약관의 목적은 파주여성민우회의 회원이 CMS서비스를 이용함에 있어 필요한 제반 사항을 정하는데 있습니다.

	[제2조 서비스의 범위]
파주여성민우회가 제공하는 기부금 CMS 서비스는, 본 약관을 동의한 회원으로부터 받는 기부금을 회원의 자동이체 신청계좌에서 자동 출금하여 파주여성민우회의 지정계좌로 입금하는 서비스입니다.

[제3조 CMS 이용신청 및 변경]
1) 회원은 CMS 신청시 CMS자동이체 약관에 동의해야 하며, 자동이체거래의 변경, 해지 등의 신청을 할 때에는 다음 절차에 따라 처리합니다.

2) 자동이체 변경, 해지
① 파주여성민우회는 회원으로부터 자동이체의 변경이나 해지 요청을 받지 않는 한 기부를 지속하는 것으로 간주하여 별도의 통보 없이 CMS를 계속 실시합니다.
② 회원이 이체계좌번호를 변경하거나 기부 해지를 원할 경우 파주여성민우회 담당자를 통한 본인확인 절차를 거쳐야 합니다.

[제4조 이체예정일]
1) 이체예정일은 매월 21일로 합니다.
2) 단, 회원의 계좌문제로 이체예정일에 미출금 처리될때에는 28일, 다음 달 11일에 재출금합니다.
3) 1), 2)의 해당일이 공휴일 및 금융기관 휴무일인 경우 익일로 합니다.

[제5조 재판관할]
회원과 파주여성민우회 간에 발생한 서비스 이용에 관한 분쟁에 대하여는 대한민국 법을 적용하며, 본 분쟁으로 인한 소는 민사소송법상의 관할을 가지는 대한민국의 법원에 제기합니다.

[부 칙]
(시행일) 본 약관은 2018년 1월 1일부터 시행합니다.
`)}
    </Modal>
  );
};

AgreeCMSModal.defaultProps = {};

export default AgreeCMSModal;
