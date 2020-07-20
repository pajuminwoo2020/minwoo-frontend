import React, {useState} from 'react';
import {Typography} from 'antd';
import styled from 'styled-components';
import {PrimaryColor} from 'GlobalStyles';
import {CWindowWidth, CPhone, CEmail} from 'constants/base.const';

const {Title, Paragraph, Text} = Typography;
export const PrivacyWrapper = styled.div`
  wdith: ${CWindowWidth};
  margin: 30px;

  .sub-title {
    font-size: 18px;
    color: ${PrimaryColor};
  }
  .paragraph {
    padding-left: 10px;
    text-align: justify;
    ul {
      list-style-type: none;
      li {
        margin: 10px 0px;
      }
    }
  }
  .indent1 {
    display: block;
    margin-left: 10px !important;
  }
`;
const Privacy = () => {
  return (
    <PrivacyWrapper>
      <Title>개인 정보 보호 정책</Title>
      <Title className="sub-title">1. 개인 정보 수집 목적과 용도는?</Title>
      <Paragraph className="paragraph">
        파주여성민우회(이하 회사라 함)에서는 회원님께서 당사에서 운영하는 사이트와 서비스를 이용하는데 있어, 필요한 최소한의 정보를 필수 사항으로 수집합니다. 회원님께서 제공하신 모든 정보는 상기 목적에 필요한 용도 이외로는 사용되지 않으며, 수집 정보의 범위나 사용 목적, 용도가 변경될 시에는 반드시 회원님께 사전 동의를 구할 것입니다. (이용약관 참고)
      </Paragraph>
      <Title className="sub-title">2. 개인 정보 수집 항목 및 보유, 이용 기간은?</Title>
      <Paragraph className="paragraph">
        회사는 서비스 제공을 위해 제공 받는 회원 정보는 이름, 주민등록 번호, 주소, 전화번호, 희망 ID, 비밀번호, E-mail 주소, E-mail 수신 여부 등입니다. 회원님께서 회사에서 제공하는 서비스를 받는 동안 회원님의 개인 정보는 회사에서 계속 보유하며 서비스 제공을 위해 이용하게 됩니다. 단, 이용약관에서 표명한 절차에 따라 탈퇴를 요청하거나 표명된 회원 자격 상실 사유에 의해 회원 자격을 제한 및 정지시키는 경우에는 해당 개인의 정보는 재생할 수 없는 기술적 방법에 의해 삭제되며 어떠한 용도로도 열람 또는 이용될수 없도록 처리됩니다.
      </Paragraph>
      <Title className="sub-title">3. 수집하는 개인정보의 항목</Title>
      <Paragraph className="paragraph">
성명, 주민등록번호, 생년월일, 아이디, 비밀번호, 이메일주소, 전화번호, IP정보, 그외 선택항목 등
      </Paragraph>

      <Title className="sub-title">4. 개인정보 자동 수집 장치의 설치/운영 및 거부</Title>
      <Paragraph className="paragraph">
회사는 이용자들에게 특화된 맞춤서비스를 제공하기 위해서 이용자들의 정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다. 쿠키는 웹사이트를 운영하는데 이용되는 서버(HTTP)가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다.

      <br></br><br></br>
      <p>가.  쿠키의 사용 목적</p>
      <Text className="indent1">
이용자들이 방문한 파주여성민우회의 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부, 뉴스편집, 이용자 규모 등을 파악하여 이용자에게 최적화된 정보 제공을 위하여 사용합니다.
      </Text>
      <br></br>
      <p>나.  쿠키의 설치/운영 및 거부</p>
      <Text className="indent1">
        <p>1.  이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서, 이용자는 웹브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의 저장을 거부할 수도 있습니다.</p>
        <p>2.  쿠키 설정을 거부하는 방법으로는 이용자가 사용하는 웹 브라우저의 옵션을 선택함으로써 모든 쿠키를 허용하거나 쿠키를 저장할 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부할 수 있습니다.</p>
        <p>3.  설정방법 예(인터넷 익스플로어의 경우) : 웹 브라우저 상단의 도구 &gt; 인터넷 옵션 &gt; 개인정보</p>
        <p>4.  다만, 쿠키의 저장을 거부할 경우에는 로그인이 필요한 네이버 일부 서비스는 이용에 어려움이 있을 수 있습니다.</p>
      </Text>
      </Paragraph>
      <Title className="sub-title">5. 이용자 및 법정대리인의 권리와 그 행사방법</Title>
      <Paragraph className="paragraph">
        <ul>
          <li>1.  이용자 및 법정 대리인은 언제든지 등록되어 있는 자신 혹은 당해 만 14세 미만 아동의 개인정보를 조회하거나 수정할 수 있으며 가입해지를 요청할 수도 있습니다.</li>
          <li>2.  이용자 혹은 만 14세 미만 아동의 개인정보 조회, 수정을 위해서는 '개인정보변경'(또는 '회원정보수정' 등)을, 가입해지(동의철회)를 위해서는 "회원탈퇴"를 클릭하여 본인 확인 절차를 거치신 후 직접 열람, 정정 또는 탈퇴가 가능합니다.</li>
          <li>3.  혹은 개인정보관리책임자에게 서면, 전화 또는 이메일로 연락하시면 지체 없이 조치하겠습니다.</li>
          <li>4.  이용자가 개인정보의 오류에 대한 정정을 요청하신 경우에는 정정을 완료하기 전까지 당해 개인정보를 이용 또는 제공하지 않습니다. 또한 잘못된 개인정보를 제3 자에게 이미 제공한 경우에는 정정 처리결과를 제3자에게 지체 없이 통지하여 정정이 이루어지도록 하겠습니다.</li>
          <li>5.  회사는 이용자 혹은 법정 대리인의 요청에 의해 해지 또는 삭제된 개인정보는 "5. 개인정보의 보유 및 이용기간"에 명시된 바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리하고 있습니다.</li>
        </ul>
      </Paragraph>
      <Title className="sub-title">6. 개인정보관리책임자 및 담당자의 연락처</Title>
      <Paragraph className="paragraph">
귀하께서는 회사의 서비스를 이용하시며 발생하는 모든 개인정보보호 관련 민원을 개인정보관리책임자 혹은 담당부서로 신고하실 수 있습니다. 회사는 이용자들의 신고사항에 대해 신속하게 충분한 답변을 드릴 것입니다.

        <Text className="indent1">
          <ul>
            <li>1. 이 름 : 개인정보취급방침 담당자</li>
            <li>2. 전 화 : {CPhone}</li>
            <li>3. 메 일 : {CEmail}</li>
          </ul>
        </Text>
      </Paragraph>
    </PrivacyWrapper>
  );
}

export default Privacy;
