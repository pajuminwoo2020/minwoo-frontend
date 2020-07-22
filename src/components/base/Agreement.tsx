import React, {useState} from 'react';
import {Typography} from 'antd';
import {PrivacyWrapper} from 'components/base/Privacy';

const {Title, Paragraph, Text} = Typography;
const Agreement = () => {
  return (
    <PrivacyWrapper>
      <Title level={3}><Text>이용약관</Text></Title>
      <Title className="sub-title">제 1조 [목적]</Title>
      <Paragraph className="paragraph">
이 약관은 파주여성민우회(paju.womenlink.or.kr) 를 통해 인터넷상에서 제공되는 서비스 등 모든 웹서비스(이하 ‘서비스’라 함)의 이용조건 및 절차에 관한 기본사항을 정하는데 목적이 있다.
      </Paragraph>
      <Title className="sub-title">제 2조 [용어의 정의]</Title>
      <Paragraph className="paragraph">
본 약관에 사용되는 서비스 라는 용어는 다음과 같이 정의한다.
      <ul>
        <li>1.  ‘서비스’라 함은 회사의 홈페이지 및 회사가 직접 운영하는 인터넷사이트 등에서 제공하는 인터넷상의 모든 웹서비스(무선 인터넷서비스 포함)를 말합니다.</li>
      </ul>
      </Paragraph>
      <Title className="sub-title">제 3조 [약관의 적용]</Title>
      <Paragraph className="paragraph">
        <ul>
          <li>가)   이 약관은 회사가 인터넷상에서 제공하는 모든 서비스의 이용 절차 및 기타 필요한 사항에 적용된다.</li>
          <li>나)   회사가 제공하는 서비스 이용과 관련된 사항은 관련 법률의 적용을 받는다</li>
        </ul>
      </Paragraph>
       <Title className="sub-title">제 4조 [서비스의 내용]</Title>
      <Paragraph className="paragraph">
회사는 회원에게 회사가 자체 개발하는 서비스, 타 업체와 협력 개발한 서비스, 타 업체가 개발한 서비스 및 기타 회사에서 별도로 정하는 각종 서비스 등을 제공한다. 단, 회사의 사정상 각 서비스별로 제공일정 및 제공방법이 변경되거나 지연, 미 제공될 수도 있다.
      </Paragraph>
      <Title className="sub-title">제 5 조 이용 계약의 성립</Title>
      <Paragraph className="paragraph">
        <ul>
          <li>가)  가입 신청 양식을 기재한 후 회원가입 단추를 누르면 이 약관에 동의하는 것으로 간주된다.</li>
          <li>나)  이용 계약은 회사 사이트의 서비스 이용을 희망하는 자가 정해진 가입 양식에 회원정보(ID, PASSWORD, 이름, 주민등록번호, 전화번호, 기타 회사가 필요하다고 인정하는 사항 등)를 기입하는 일련의 과정을 통한 회원등록 신청에 대하여 회사가 승낙함으로써 성립한다.</li>
        </ul>
      </Paragraph>
      <Title className="sub-title">제 6 조 (이용 신청 및 승낙)</Title>
      <Paragraph className="paragraph">
        <p>가)   회사는 제 5조에 따른 이용신청에 대하여 특별한 사정이 없는 한 접수 순서에 따라 이용신청을 승낙한다.</p>
        <p>나)   회사가 다음 각 호에 해당하는 경우 이용신청에 대한 승낙을 제한할 수 있고, 그 사유가 해소될 때까지 승낙을 유보할 수 있다.</p>
        <Text className="indent1">
        <ul>
          <li>1.   서비스 관련 설비의 용량이 부족한 경우</li>
          <li>2.   기술상 장애 사유가 있는 경우</li>
          <li>3.   기타 회사가 필요하다고 인정되는 경우</li>
        </ul>
        </Text>
        <p>다)   회사가 다음 각 호에 해당하는 이용계약 신청에 대하여는 이를 알게 된 시점에 서 회원자격을 박탈하고 재가입을 허용하지 않을 수 있다.</p>
        <Text className="indent1">
        <ul>
          <li>1.   본인의 실명 또는 주민등록번호로 신청하지 않은 경우</li>
          <li>2.   다른 사람의 명의를 사용하여 신청한 경우</li>
          <li>3.   이용 신청시 필요 내용을 허위로 기재하여 신청한 경우</li>
          <li>4.   사회의 안녕과 질서 혹은 미풍양속을 저해할 목적으로 신청한 경우</li>
          <li>5.   기타 회사가 정한 이용 신청 요건이 미비 된 경우</li>
          <li>6.   회원이 약관 사항을 위반했을 경우</li>
          <li>7.   회원의 의무를 위반했을경우</li>
        </ul>
        </Text>
      </Paragraph>
      <Title className="sub-title">제 7조 [서비스 제공의 중지]</Title>
      <Paragraph className="paragraph">
회사는 연중무휴 1일 24시간 서비스 제공을 원칙으로 하나, 다음 각 호에 해당하는 경우 서비스 제공을 전부 또는 일부를 제한하거나 중지할 수 있습니다.
      <ul>
        <li>1.   서비스용 설비의 보수 등 공사로 인한 부득이한 경우</li>
        <li>2.   전기통신사업법에 규정된 기간통신사업자가 전기통신 서비스를 중지했을 경우</li>
        <li>3.   기타 불가항력적 사유가 있는 경우</li>
        <li>4.   국가비상사태, 정전, 서비스 설비의 장애 또는 서비스 이용의 폭주 등으로 서비스 이 용에 지장이 있는 경우</li>
      </ul>
      </Paragraph>
      <Title className="sub-title">제 8조 [각종 정보의 제공]</Title>
      <Paragraph className="paragraph">
회사는 회원에게 상품/서비스의 이용 및 각종 행사, 생활정보 등의 다양한 서비스를 전자우편이나 서신 우편물, 기타의 방법으로 제공할 수 있습니다. 단, 회원이 원하지 않는 경우 회사가 제공하는 정보를 거부할 수 있다.
      </Paragraph>
      <Title className="sub-title">제9조 [회원의 권리]</Title>
      <Paragraph className="paragraph">
회원은 자신의 개인 신상정보를 보호 받을 권리가 있다.
      </Paragraph>
      <Title className="sub-title">제10조 [회사의 권리]</Title>
      <Paragraph className="paragraph">
회사는 회원의 개인신상정보가 틀리거나 본 약관을 준수하지 않을 경우 회원자격을 박탈 할 수 있다.
      </Paragraph>
      <Title className="sub-title">제11조 [회사의 의무]</Title>
      <Paragraph className="paragraph">
        <ul>
          <li>가)   회사는 본 약관 및 관계법령에 따라 본 서비스를 실시하여야 한다.</li>
          <li>나)   회사는 회원의 개인신상정보를 고정된 이외의 의도 및 목적으로 제 3자에게 누설, 배포할 수 없다. 단, 전기통신관련 법령 등의 관계법령에 의해 국가로부터의 요구가 있을 경우 해당 회원의 신상정보는 제공될 수 있다.</li>
       </ul>
      </Paragraph>
      <Title className="sub-title">제 12 조 [면책조항]</Title>
      <Paragraph className="paragraph">
        <ul>
          <li>가)   회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제된다. 통상적인 노력으로는 통제가 힘든 원인으로 인한 사유로 서비스 제공의 지연이나 서비스를 제공하지 못하거나 또는 고객정보가 유출된 경우에도 일체의 책임을 지지 않습니다.</li>
          <li>나)   모든 이용자 간에 대한민국 헌법과 법률·규칙에 위배되는 제반사항이 발생하였을 경우 회사는 민·형사상 책임을 지지 않는다.</li>
          <li>다)   회사는 회사자간의 분쟁 해결에 적극적으로 참여하여, 필요한 경우 본 약관을 일방적으로 위배한 회원에 대하여 법률적인 고소, 고발 조치를 취하거나, 피해자가 고소, 고발 조치를 취하는데 모든 도움을 제공한다</li>
       </ul>
       <Title className="sub-title">제 13조 [회원간 커뮤니케이션에 대한 의무와 책임]</Title>
       <ul>
         <li>가)   회원은 회사의 전자메일이나 SMS 등의 서비스를 통하여 음란물이나 불온한 내용, 정크 메일(Junk Mail), 스팸메일(Spam Mail)등 타인에게 피해를 주거나 미풍양속을 해치는 내용을 보내서는 안된다.</li>
         <li>나)   본조 제2항을 위반하여 발생되는 모든 책임은 회원에게 있으며 이 경우 회원의 ID와 PASSWORD 등 개인정보를 수사기관에 제공할 수 있다.</li>
       </ul>
       <Title className="sub-title">제 14조 [게시물]</Title>
       <p>가)   회사는 회원이 게시하거나 전달하는 서비스 내의 모든 내용물(회원간 전달 포함)이 다음의 경우에 해당한다고 판단되는 경우 사전통지 없이 삭제할 수 있다.</p>
       <Text className="indent1">
       <ul>
         <li>1.   다른 회원 또는 제3자를 비방하거나 중상모략으로 명예를 손상시키는 내용인 경우</li>
         <li>2.   공공질서 및 미풍양속에 위반되는 내용인 경우</li>
         <li>3.   범죄적 행위에 결부된다고 인정되는 내용인 경우</li>
         <li>4.   회사의 저작권, 제3자의 저작권 등 기타 권리를 침해하는 내용인 경우</li>
         <li>5.   본조 제2항 소정의 세부 이용지침을 통하여 회사에서 규정한 게시기간을 초과한 경우</li>
         <li>6.   기타 관계법령 및 회사의 세부지침 등에 위반된다고 판단되는 경우</li>
         <li>나)   회사는 게시물에 관련된 세부 이용지침을 별도로 정하여 시행할 수 있으며 회원은 그 지침에 따라 각종 게시물(회원간 전달 포함)을 등록, 삭제 등을 하여야 합니다.</li>
       </ul>
      </Text>
      <p>다)   회사는 게시되는 내용의 추가·수정·삭제에 관한 모든 권한을 가지고 있으며 회원에게 별도의 통지 없이 URL(Uniform Resource Locator)의 변경 및 내용의 추가·수정·삭제를 할 수 있다.</p>
      <p>라)   회원은 개인적인 이익을 위해 회사에 게시물의 추가적 게재 등의 요구를 할 수 없다.</p>
      </Paragraph>
      <Title className="sub-title">제 15조 [링크]</Title>
      <Paragraph className="paragraph">
회사는 회원에게 다른 회사의 웹사이트 또는 자료에 대한 링크를 제공할 수 있다. 회사는 그러한 사이트 및 자료에 대한 아무런 통제권이 없으므로, 회원은 회사가 그와 같은 외부 사이트나 자료의 유용성에 대해 책임이 없으며, 그러한 사이트나 자료에 대한, 또는 그로부터 이용 가능한 내용, 광고, 제품이나 재료에 대해 회사가 아무런 보증도 하지 않고, 그에 대해 책임이 없음을 인정하고 이에 동의한다. 또한, 회원은 그러한 사이트나 자료에 대한, 또는 그를 통하여 이용 가능한 내용, 상품 또는 서비스를 이용하거나 이를 신뢰함으로 인해, 또는 이와 관련하여 야기되거나 야기되었다고 주장되는 어떠한 손해나 손실에 대하여 회사가 직접적 또는 간접적으로 책임을 지지 않음을 인정하고 이에 동의한다.
      </Paragraph>
      <Title className="sub-title">제 16조 [회원정보 보호]</Title>
      <Paragraph className="paragraph">
        <p>가)   제공된 회원정보는 해당 회원의 동의 없이 당사 목적 이외의 용도로 이용하거나 제3자에게 제공할 수 없으며, 이에 대한 모든 책임은 회사가 진다. 다만, 다음의 경우에는 예외로 한다.</p>
        <ul>
          <li>1.   상품배송(사은품 등)과 관련하여 배송업체에게 배송에 필요한 최소한의 이용자의 정보(성명, 주소, 전화번호)를 알려주는 경우</li>
          <li>2.   통계작성, 학술연구 또는 시장조사를 위하여 필요한 경우로서 특정 개인을 식별할 수 없는 형태로 제공하는 경우</li>
        </ul>
        <p>나)   회사는 회원이 협력업체를 통해 제공되는 서비스를 사용할 수 있도록 하기 위해, 회원 가입시 입력받은 개인정보로부터 이름이나 주소와 같은 서비스 이용에 필요한 제한된 범위의 개인정보를 서비스 협력업체와 공유할 수 있다.</p>
        <p>다)   회원은 언제든지 회사가 가지고 있는 자신의 개인정보에 대해 열람 및 오류정정을 요구할 수 있으며 회사는 이에 대해 지체없이 필요한 조치를 취할 의무를 진다.</p>
      </Paragraph>
      <Title className="sub-title">제 17조 [약관의 효력 및 변경]</Title>
      <Paragraph className="paragraph">
      <ul>
        <li>가)   본 약관의 내용은 특별한 규정이 없는 한 회사가 제공하는 인터넷 서비스화면에 게시하거나 기타의 방법으로 회원 가입자에게 공지함으로써 효력을 발생한다.</li>
        <li>나)   회사는 합리적으로 필요하다고 인정되는 경우 이 약관을 변경할 수 있으며, 이 경우 회사는 변경사항은 인터넷상의 공지화면에 게시함으로써 효력을 발생한다.</li>
      </ul>
      </Paragraph>
      <Title className="sub-title">제 18조 [약관 외 사항의 처리]</Title>
      <Paragraph className="paragraph">
본 약관에 명시되지 않은 사항은 사회에서 인정되는 범위 안에서 상호 협의 조정토록 노력하며 불가시 관계법령에 따라 처리하고,이 약관이 관계법령과 배치되는 부분은 관계법령을 우선한다.
      </Paragraph>
     <Title className="sub-title">제 19조 [관할법원 및 기타]</Title>
     <Paragraph className="paragraph">
       <ul>
         <li>가)  본사와 회원간의 분쟁에 관한 소송은 회사본사 소재지 관할로 한다.</li>
         <li>나)  본 약관에 기재되어 있지 않은 세부 사항은 당사에서 따로 정한 세부 규칙(FAQ, 공지사항에 기록)에 따른다.</li>
       </ul>
      </Paragraph>
    </PrivacyWrapper>
  );
}

export default Agreement;
