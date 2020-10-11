import React from 'react';
import styled from 'styled-components';
import {Tabs, Col, Row, Typography, Divider, Timeline, Skeleton} from 'antd';
import {textLineBreak} from 'libs/textLineBreak';
import {PrimaryColor} from 'GlobalStyles';
import {TAbout} from 'modules/information';
import {getAbout, getMainHistories} from 'libs/api/information';
import {useDataApi} from 'libs/hooks';
import {get, map} from 'lodash';
import History from 'components/intro/History';
import People from 'components/intro/People';
import Location from 'components/intro/Location';

const {TabPane} = Tabs;
const {Text, Title} = Typography;
const AboutWrapper = styled.div`
  .content-title {
    font-size: 30px;
    text-align: center;
    margin: 30px;
  }
  .tabs-content {
    padding-top: 20px;
    padding-bottom: 10px;
    font-size: 16px;
    color: #6e6e6e;

    strong {
      color: #494949;
      font-size: 18px;
      margin-bottom: 20px;
      line-height: 1.6;
    }
    .about-emphasize {
      color: ${PrimaryColor};
      text-decoration: underline;
      font-weight: bold;
    }
  }
  .about-content {
    padding-left: 20px;
    max-width: 600px;
    text-align: justify;
  }

  .about-subtitle {
    margin-bottom: 30px;
    font-weight: bold;
    font-size: 20px;
  }
  .about-subtitle::before {
    display: inline-block;
    margin-right: 6px;
    content: '\u25c9';
  }

  .declare-scroll-box {
    overflow-y: scroll;
    height: 365px;
    padding: 32px;
    background-color: #fafafa;

    p {
      margin-bottom: 2px;
    }
  }

  .rule-scroll-box {
    font-size: 12px;
    overflow-y: scroll;
    height: 515px;
    margin: 0px 0px 20px 20px;
    padding: 20px;
    background-color: #fafafa;
    p {
      margin-bottom: 2px;
    }
  }
`;

const About = () => {
  const [{data, loading}] = useDataApi<TAbout>(getAbout.bind(null));

  return (
    <AboutWrapper>
      <Tabs defaultActiveKey="1">
        <TabPane tab="소개" key="1">
          <div className="tabs-content">
            <div className="about-subtitle">민우회 소개</div>
            {loading === true ? (
              <Skeleton active title={false} paragraph={{rows: 5}}/>
            ) : (
              <div className="about-content" dangerouslySetInnerHTML={{ __html: `${get(data, 'introduction', '')}`}}/>
            )}
          </div>
          <div className='tabs-content'>
            <div className="about-content">
              <strong>민우회 회원의 다짐</strong>
              <div style={{marginTop: '20px'}} dangerouslySetInnerHTML={{ __html: `${get(data, 'watchword', '')}`}}/>
            </div>
          </div>
          <div className="tabs-content" id="history">
            <Title className="content-title">연혁</Title>
            <History/>
          </div>
        </TabPane>
        <TabPane tab="정관 & 운영규정" key="2">
          <div className='tabs-content'>
            <div className='about-subtitle'>
              정관 & 운영규정
            </div>
            <div className='rule-scroll-box'>
              <strong>(사)파주여성민우회 정관</strong><br/>
      {textLineBreak(`
제1장 총 칙

제1조(명칭)
① 이 법인은 “사단법인 파주여성민우회“(이하 본회)라 칭한다.
② 본회의 영문표기는 Paju WomenLink로 한다.

제2조(소재지) 본회의 사무소는 경기도 파주시 금빛로44에 둔다. 

제3조(목적) 본회는 성 평등과 여성의 인권이 보장되는 민주사회, 인간과 자연이 조화로운 생태적 사회의 실현과 생활자치권이 실현되는 건강한 지역공동체 조성에 기여함을 목적으로 한다.
제4조(사업) 본회는 제3조의 목적을 달성하기 위하여 다음의 사업을 한다.
① 성 평등 촉진 및 여성권익신장사업
② 성폭력, 가정폭력 등 상담 및 여성인권증진사업
③ 생활자치권 실현 및 여성의 정치세력화 사업
④ 여성의 고용평등과 경제세력화 사업
⑤ 여성 환경 및 여성건강사업
⑥ 여성 사회교육 및 직업능력 개발사업
⑦ 여성인권에 관한 교육·연구·조사 사업
⑧ 평화 통일사업 
⑨ 기타 본회의 목적달성에 필요한 부대사업


제2장 회 원

제5조(회원의 가입)
① 본회의 목적에 동의하여 회원 가입 절차를 마친 자는 회원이 된다.
② 본회는 정당한 사유 없이 가입을 거절하거나 불리한 조건을 제시할 수 없다.

제6조(회원의 권리) 회원은 다음과 같은 권리를 가진다. 
1. 본회의 자료를 제공받고 활동에 참여할 권리
2. 총회를 통하여 본회의 운영과 의사 결정에 참여할 권리
3. 선거권과 피선거권을 행사할 권리 


제7조(회원의 의무) 회원은 다음의 의무를 진다. 
1. 본회의 정관 및 제 규정의 준수 
2. 총회 및 이사회의 결의사항 이행
3. 회비 및 제 부담금의 납부

제8조(회원의 탈퇴) 
① 회원은 본인의 의사에 따라 자유롭게 탈퇴할 수 있다.
② 본회의 재산은 회원의 탈퇴로 인하여 환급되지 아니한다.

제9조(회원의 제명, 징계) 
① 회원이 다음 각 호의 사유에 해당될 경우에는 이사회의 의결을 거쳐 제명, 징계할 수 있다.
1. 본회의 명예를 손상시키고 목적 수행에 지장을 초래한 경우
2. 1년 이상 회원의 의무를 준수하지 않거나 권리를 행사하지 않는 경우
② 회원을 제명시킬 때에는 당해 회원에게 제명사유를 통지하고 해명기회를 주어야 한다. 


제3장 임 원

제10조(임원의 종류와 정수) 본회는 다음의 임원을 둔다
① 법인의 임원으로 이사를 둔다.
② 법인의 이사는 다음 각 호와 같이 한다
1. 2인 이내의 대표를 두고 그 중 상임대표 1인을 둔다.
2. 부대표 2인 이내
3. 이사는 5인 이상 15인 이내 (대표, 부대표 포함)
③ 감사 2인 이내

제11조(임원의 선임) 
① 임원은 총회에서 선출한다.
② 임기가 만료된 임원의 후임자는 임기 만료 30일 이내에 선출하며, 궐위된 임원의 후임자는 궐위된 날로부터 30일 이내에 선출하여야 한다. 단, 잔여 임기가 1년 미만인 때에는 이사회에서 선출한다.
③ 특정 정당에 가입한 자는 대표가 될 수 없고, 임기 중인 대표가 정당에 가입하는 경우 대표자격은 당연 상실된다. 부대표도 대표에 준한다.
④ 임원 취임 시 주무관청에 보고해야 한다.

제12조(임원의 해임) 임원이 다음 각 호의 1에 해당하는 행위를 한 때에는 총회의 의결을 거쳐 해임할 수 있다.
1. 본회의 목적에 위배되는 행위
2. 임원 간의 분쟁·회계부정 또는 현저한 부당행위
3. 본회의 업무를 방해하는 행위

제13조(임원의 선임 제한) 
① 임원의 선임에 있어서 이사는 이사회 상호간에 민법 제777조에 규정된 친족관계에 있는 자가 이사 정수의 반을 초과할 수 없다.
② 감사는 감사 상호간 또는 이사와 민법 제777조에 규정된 친족관계가 없어야 한다.

제14조 (임원의 임기) 
① 대표의 임기는 2년이며, 1회에 한하여 연임할 수 있다.
② 이사, 감사의 임기는 2년으로 하되, 연임할 수 있다.
③ 보선에 의하여 취임한 임원의 임기는 전임자의 잔여기간으로 한다.

제15조(임원의 직무) 
① 대표는 본회를 대표하고 본회의 업무를 통할하며, 총회 및 이사회의 의장이 된다.
② 이사는 이사회에 출석하여 본회의 업무에 관한 사항을 의결하며 이사회 또는 대표로부터 위임받은 사항을 처리한다.
③ 감사는 다음의 직무를 행한다.
1. 본회의 재산상황을 감사하는 일
2. 총회 및 이사회의 운영과 그 업무에 관한 사항을 감사하는 일
3. 제1호 및 제2호의 감사결과 부정 또는 부당한 점이 있음을 발견한 때에는 이사회 또는 총회에 그 시정을 요구하고 주무관청에 보고하는 일
4. 제3호의 시정요구 및 보고를 하기 위하여 필요한 때에는 총회 또는 이사회의 소집을 요구하고 참석하여 발언하는 일
5. 본회의 재산상황과 업무에 관하여 총회 및 이사회 또는 대표에게 의견을 진술하는 일

제16조(대표 직무대행) 
① 대표가 사고 또는 궐위되었을 때에는 이사회에서 대표 및 직무대행의 순서를 정한다.
② 제1항의 규정에 의한 이사회는 재적이사 과반수가 소집하고 출석이사 중 호선된 자의 사회아래 출석이사 과반수의 찬성으로 대표의 직무대행자를 선출한다.
③ 제1항의 규정에 의하여 대표의 직무를 대행하는 이사는 지체 없이 대표 선출의 절차를 밟아야 한다.


제4장 총 회

제17조(총회) 총회는 최고의결기관으로서 회원 총회로 구성하며, 정기총회와 임시총회가 있다. 참석 자격 등에 관해서는 별도의 규정으로 정한다.

제18조(구분 및 소집) 
① 총회는 정기총회와 임시총회로 구분하며, 대표가 이를 소집한다.
② 정기총회는 매 회계연도 종료 후 1월 이내에 소집하며, 임시총회는 대표가 필요하다고 인정할 때에 소집한다.
③ 총회의 소집은 대표가 회의 안건·일시·장소 등을 명기하여 회의 개시 7일 전까지 서면 또는 전자우편으로 각 회원에게 통지하여야 한다.

제19조(총회소집의 특례) 
① 대표는 다음 각 호의 1에 해당하는 소집요구가 있을 때에는 그 소집요구일로부터 20일 이내에 총회를 소집하여야 한다.
1. 재적이사 과반수가 회의의 목적을 제시하여 소집을 요구한 때
2. 제15조 제3항 제4호의 규정에 의하여 감사가 소집을 요구한 때
3. 재적회원 3분의 1 이상이 회의의 목적을 제시하여 소집을 요구한 때
② 총회 소집권자가 궐위되거나 이를 기피함으로써 7일 이상 총회소집이 불가능한 때에는 재적 이사 과반수 또는 재적회원 3분의 1 이상의 찬성으로 총회를 소집할 수 있다.
③ 제2항의 규정에 의한 총회는 출석이사 중 호선된 자의 사회아래 그 의장을 선출한다.

제20조(의결정족수)
① 총회는 재적회원 과반수의 출석으로 개의하고 출석회원 과반수 이상 찬성으로 의결한다. 
② 회원의 의결권은 총회에 참석하는 다른 회원에게 서면으로 위임할 수 있다. 이 경우 위임장은 총회 개시 전까지 의장에게 제출하여야 한다.

제21조(총회의 기능) 총회는 다음의 사항을 의결한다.
1. 임원의 선출 및 해임에 관한 사항
(단, 잔여기간 1년 미만의 임원은 이사회에서 선출한다.)
2. 본회의 해산 및 정관변경에 관한 사항
3. 기본재산의 처분 및 취득과 자금의 차입에 관한 사항
4. 예산 및 결산의 승인
5. 사업계획의 승인
6. 기타 중요사항

제22조(총회의결 제척사유) 회원이 다음 각 호의 1에 해당하는 때에는 그 의결에 참여하지 못한다. 
1. 임원의 해임에 있어 자신에 관한 사항을 의결할 때
2. 금전 및 재산의 수수 또는 소송 등에 관련되는 사항으로서 자신과 본회의 이해가 상반될 때 

제23조 (총회의사록) 총회의 의사에 관하여는 의사의 경과와 그 결과를 기재한 의사록을 작성하고 의장과 총회에서 선출한 3인 이상의 회원이 이에 기명날인한다. 
① 총회의 의사에 관하여는 의사록을 작성하여야 한다.
② 의사록에는 의사의 경과, 요령 및 결과를 기재하고 의장과 참석 이사, 총회에서 선출한 3인 이상의 회원이 기명․날인하여 비치한다.
③ 대표는 의사록을 법인의 주된 사무소에 비치하여야 한다.



제5장 이사회

제24조(이사회의 구성) 이사회는 대표, 부대표, 이사로 구성한다.

제25조(구분 및 소집) 
① 이사회는 대표가 필요하다고 인정할 때에 대표가 소집한다.
② 이사회의 소집은 대표가 회의 안건·일시·장소 등을 명기하여 회의개시 7일 전까지 서면 또는 전자우편으로 재적이사 전원에게 통지하여야 한다.
③ 이사회는 제2항의 통지사항에 한해서만 의결할 수 있다. 다만, 재적이사 전원이 출석하고 출석이사 전원이 찬성할 때에는 통지하지 아니한 사항이라도 이를 부의하고 의결할 수 있다.


제26조(이사회 소집의 특례) 
① 대표는 다음 각 호의 1에 해당하는 소집요구가 있는 때에는 그 소집 요구일로부터 20일 이내에 이사회를 소집하여야 한다.
1. 재적이사 과반수가 회의의 목적을 제시하여 소집을 요구한 때
2. 제15조 제3항 제4호의 규정에 의하여 감사가 소집을 요구한 때
② 이사회 소집권자가 궐위되거나 이를 기피함으로써 7일 이상 이사회 소집이 불가능할 때에는 재적이사 과반수의 찬성으로 이사회를 소집할 수 있다.
③ 제2항의 규정에 의한 이사회는 출석이사 중 호선된 자의 사회아래 그 의장을 선출한다.


제27조(서면결의) 
① 대표는 이사회에 부의할 사항 중 경미한 사항 또는 긴급을 요하는 사항에 관하여는 이를 서면으로 의결할 수 있다. 이 경우에 대표는 그 결과를 차기 이사회에 보고하여야 한다.
② 제1항의 서면결의 사항에 대하여 재적이사 과반수가 이사회에 부의할 것을 요구하는 때에는 대표는 이에 따라야 한다.

제28조(의결정족수) 
① 이사회는 재적 이사 과반수의 출석으로 개의하고 출석 이사 과반수의 찬성으로 의결한다. 다만, 가부동수인 경우에는 의장이 결정한다.
② 이사회의 의결권은 위임할 수 없다. 

제29조(이사회 의결사항) 이사회는 다음의 사항을 심의·의결한다. 
1. 업무집행에 관한 사항
2. 총회의 소집과 총회에 상정할 의안 작성
3. 총회준비위원회 구성
4. 잔여 임기가 1년 미만인 임원의 선임
5. 규정 변경에 관한 사항
6. 재산관리에 관한 사항
7. 총회에서 위임받은 사항
8. 사업계획의 운영에 관한 사항
9. 예산·결산서의 작성에 관한 사항
10. 정관의 규정에 의하여 그 권한에 속하는 사항
11. 기타 본회의 운영상 중요하다고 대표가 부의하는 사항 

제30조(이사회 의결 제척사유) 회원이 다음 각 호의 1에 해당하는 때에는 그 의결에 참여하지 못한다. 
1. 이사의 해임에 있어 자신에 관한 사항을 의결할 때
2. 금전 및 재산의 수수 또는 소송 등에 관련되는 사항으로서 자신과 본회의 이해가 상반될 때 


제6장 조 직

제31조(사무국) 본회는 이사회의 의결을 거쳐 조직과 운영에 관한 원활한 업무 처리를 위하여 사무국에 필요한 인원과 기구를 둘 수 있다.

제32조(위원회) 
① 본회의 효율적인 업무 수행을 위하여 필요한 위원회를 둘 수 있다.
② 위원회 구성 및 운영에 관한 사항은 별도로 이사회에서 정한다.

제33조(부설기구) 본회는 사업의 수행을 위해 아래의 기구를 둘 수 있다.
1. 파주성폭력상담소‘함께’는 반성폭력운동 및 성폭력 예방활동, 폭력피해여성지원 활동을 하며, 성 평등한 사회를 만들기 위한 활동을 한다. 
2. 성폭력상담소장은 상임대표가 임명하며 총회의 인준을 받아야 하며 별도의 운영규정을 둔다. 

제34조(활동가 처우 등) 본회는 사업의 수행과 원활한 업무 처리를 위하여 필요한 인원을 두며, 상근활동가의 인사·복무·임금 등에 관한 세부 사항은 별도의 내규로 정한다.



제7장 재정 및 회계

제35조(재정) 
① 본회의 경비는 회비, 기부금, 회원부담금과 기타 잡수입으로 한다.
② 회원의 회비 또는 부담금은 이사회에서 정한다.
③ 법인이 예산외의 채무부담은 주무관청의 승인을 받아야 한다.

제36조(자산의 구분) 
① 본회의 자산은 기본재산과 보통재산으로 구분한다. 
② 기본재산은 본회의 목적사업 수행에 관계되는 부동산, 또는 동산으로 하며 그 목록은 별지1과 같다.
③ 보통재산은 기본재산 이외의 재산으로 한다.

제37조(임원의 보수) 사업의 운영을 전담하는 상임이사를 제외한 임원에 대하여는 보수를 지급하지 아니한다. 다만, 업무수행에 필요한 실비는 지급할 수 있다.

제38조(기본재산의 처분 등) 본회의 기본재산을 처분(매도·증여·교환을 포함한다)하고자 할 때에는 제43조의 규정에 의한 정관변경 허가의 절차를 거쳐야 한다.

제39조(회계연도) 본회의 회계연도는 매년 1월 1일부터 12월 31일까지로 한다.

제40조(예산편성) 본회의 세입·세출 예산은 매 회계연도 개시 1월 전까지 편성하여 이사회의 의결을 거쳐 총회의 승인을 얻어 정한다.

제41조(결산) 
① 본회는 매 회계연도 종료 후 2월 이내에 결산서를 작성하여 이사회의 의결을 거쳐 총회의 승인을 얻어야 한다.
② 연간 기부금 모금액 및 활용실적을 인터넷 홈페이지를 통해 공개한다.

제42조(회계감사) 감사는 회계감사를 연 1회 이상 실시하여야 한다.

제43조(중앙회비) 본회는 한국여성민우회의 중앙회비를 납부한다.



제8장 보 칙

제44조(법인해산) 
① 본회가 해산하고자 할 때에는 총회에서 재적회원 3분의 2이상의 찬성으로 의결하여 해산하고, 그 해산에 관하여 주무관청에 신고하여야 한다.
② 본회 해산 시 잔여 재산은 총회의 의결을 거쳐 주무관청의 승인을 얻어 국가, 지방자치단체 또는 유사 목적을 가진 다른 비영리법인에 귀속한다. 

제45조(정관변경) 이 정관을 변경하고자 할 때에는 이사회의 3분의 2의 찬성과 총회에서 재적회원 과반수이상 출석과 출석회원 3분의 2이상의 찬성으로 의결하여 주무관청의 허가를 받아야 한다. 

제46조(업무보고) 익년도의 사업계획서 및 예산서와 당해 연도 사업실적서 및 수지결산서는 회계연도 종료 후 2월 이내에 주무관청에 보고하여야 한다. 이 경우에 재산목록과 업무현황 및 감사결과보고서도 함께 제출하여야 한다.

제47조(규칙제정) 이 정관에 정한 것 외에 본회의 운영에 관하여 필요한 사항은 이사회의 의결을 거쳐 규칙으로 정한다.



부 칙 
제1조(시행일) 이 정관은 주무관청의 허가를 받아 법원에 등기를 한 날부터 시행한다.

제2조(경과조치) 이 정관 시행 당시 법인설립을 위하여 발기인 등이 행한 행위는 이 정관에 의하여 행한 것으로 본다.

제3조(설립자의 기명날인) 본회를 설립하기 위하여 이 정관을 작성하고 다음과 같이 설립자 전원이 기명날인한다.

	 
  2020. 6. 11. 재정
`)}
            </div>
          </div>
        </TabPane>
        <TabPane tab="조직도" key="3">
          <div className="tabs-content">
            <People/>
          </div>
        </TabPane>
        <TabPane tab="찾아오시는길" key="4">
          <div className="tabs-content">
            <Location/>
          </div>
        </TabPane>
      </Tabs>
    </AboutWrapper>
  );
}

export default About;
