import React from 'react';
import styled from 'styled-components';
import {Tabs, Col, Row, Typography} from 'antd';
import MinwooIntro from 'assets/minwoo-intro.png'
import MinwooIntroLogo from 'assets/minwoo-intro-logo.jpg'
import MinwooFoundingStatement from 'assets/minwoo-founding-statement.png'
import {PrimaryColor} from 'GlobalStyles';

const {TabPane} = Tabs;
const {Text, Title} = Typography;
const AboutWrapper = styled.div`
  margin-top: 37px;

  .tabs-content {
    padding: 40px;
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

  .about-subtitle {
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 24px;
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
  return (
    <AboutWrapper>
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="소개" key="1">
          <div className="tabs-content">
            <Row justify="center" gutter={[32, 16]}>
              <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                <p>
                  <strong>
                    민우회는 당신의 목소리가, 삶이 곧 운동이 되는 곳<br />
                    지금보다 좀 더 나은, 다른 세상을 꿈꾸는 당신과 함께 합니다.
                  </strong>
                </p>
                <p>
                  파주여성민우회는<br />
                  차별 없이 평등하게 공존하는 세상을 향해 각자의 존엄성을 지키며
                </p>
                <p>
                  <div className="about-emphasize">
                    성평등한 노동권, 일과 생활의 균형을 위한 활동<br />
                    여성이 자신의 몸과 건강의 주체가 되는 활동<br />
                    성인지적 관점으로 미디어감시 활동<br />
                    성평등 관점으로 복지국가를 기획하는 활동<br />
                    성폭력 없는 세상을 만드는 반성폭력 활동<br />
                    더불어 사는 민주사회를 위한 사회개혁 활동<br />
                  </div>
                </p>
                풀뿌리로부터의 변화를 만드는 신나는 지역여성운동을 만들어 갑니다.
              </Col>
              <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                <img src={MinwooIntro} style={{width: '100%', height: 'auto'}}/>
              </Col>
            </Row>
            <div className="about-subtitle" style={{marginTop: '50px'}}>
              민우회의 별칭 & 로고
            </div>
            <div style={{textAlign: 'center'}}><img src={MinwooIntroLogo} style={{width: '100%'}}/></div>
          </div>
        </TabPane>
        <TabPane tab="창립선언문 & 회원다짐" key="2">
          <div className='tabs-content'>
            <div className="about-subtitle">
              회원 다짐
            </div>
            <Row justify="center" gutter={[32, 16]}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <img src={MinwooFoundingStatement} style={{width: '100%'}}/>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <strong>
                  우리는
                </strong>
                <br/>
                <strong style={{ color: '#f86e6b' }}>
                  하나, 성평등과 사회정의가 실현되는 사회를 만듭니다.
                </strong>
                <br/>
                <strong style={{ color: '#00b5ad' }}>
                  하나, 자연과 인간이 조화로운 세상을 만듭니다.
                </strong>
                <br/>
                <strong style={{ color: '#d7a52a' }}>
                  하나, 생활 속의 여성운동을 만듭니다.
                </strong>
              </Col>
            </Row>
            <div className='about-subtitle' style={{marginTop: '50px'}}>
              창립선언문
            </div>
            <div className='declare-scroll-box'>
              <Title level={4}><Text>* 창립취지</Text></Title>
              <div style={{paddingLeft: '10px'}}>
                <p >한국여성민우회는 1987년 창립되었습니다.</p>
                <p >우리는 성평등한 민주사회와 여성대중운동을 지향합니다.</p>
                <p >우리는 여성이라는 이유로 차별받지 않는 사회, 여성의 인권이 존중되는 사회, 여성이 사회</p>
                <p >모든 영역에서 동등하게 참여하는 사회, 자연과 인간이 조화로운 사회를 만들어 갑니다.</p>
                <br/>
                <p >우리의 운동은 생활 속에서 시작합니다.</p>
                <p >직장과 가정, 지역사회에서 여성들의 일상생활 속의 차별과 소외, 그리고 '참여하는 여성'을</p>
                <p >운동의 과제로 만듭니다.</p>
                <br/>
                <p >우리의 운동은 법과 제도를 개선하고 생활의 가치와 문화를 바꾸어 나갑니다.</p>
                <p >우리의 운동은 여성들이 의식을 바꾸고 지역과 직장에서 스스로 조직하고 연대하는 '함께가는' 여성운동입니다.</p>
                <br/>
                <p >자신과 세상의 변화를 주도해가면서</p>
                <p >처음 우리의 시작이 그러했듯이</p>
                <p >언제나 ‘새로운 여성운동’의 길을 만들어 가겠습니다.</p>
                <br/>
              </div>
              <Title level={4}><Text>* 창립선언문</Text></Title>
              <div style={{paddingLeft: '10px'}}>
                <p >우리 여성들은 사회적 노동과 가사노동의 현장에서 여자라는 이유로 가장 참담한 피해자가 되어왔다. 여성은 생존권위협, 임금차별, 고용차별, 불완전취업, 가사노동 비인간적 자녀교육환경의 굴레에 허덕여왔고, 나아가 성폭력,성차별문화의 공세 앞에서 여성의 본원적인 건강한 인간성은 크게 훼손되었다. 하나의 주체적 인간으로서 존엄성이 보장받기는커녕 여성 자신의 생존과 모성이 파괴되는 위험에 놓여 있는 것이다.</p>
                <br/>
                <p >여성이 겪고 있는 고통의 뿌리는 이 사회의 반민주적, 반민중적 구조에 있으며 그 위에서 경쟁위주, 물질위주의 비인간적 사회가 독버섯처럼 번창하고 있다. 여성이 해방되기 위해서는 가정을 포함한 이 사회가 인간의 존엄을 구현하는 진정한 민주주의 사회로 바뀌어야만 한다. 오늘 우리 여성들은 분단된 조국의 통일과 민주사회를 향한 기로에 서 있다. 한편으로는 자주적 민주사회를 목마르게 갈구하는 국민들의 힘이 분출된 결과 '민주주의의 실현'이 당위적 과제로 설정되고 있으며, 한편으로는 반민주적 구조를 자기 기반으로 하는 억압세력이 여전히 자신의 온존을 꾀하고 있다. 바로 이러한 현실은 여성들에게 역사 앞으로 한 발 다가설 것을 시급히 요청하고 있다. 지금이야말로 여성들이 이제껏 억눌려온 자신의 권익을 되찾고 거대한 정치세력으로 부상, 다가올 미래를 책임져야 할 시점이기 때문이다.</p>
                <br/>
                <p >이 역사적 과제 앞에서 무엇보다 우리는 과거 여성해방의 대의를 위해 헌신해왔던 선배들의 투쟁정신을 이어받을 것이다. 세계 각국의 역사는 여성해방과 인간해방을 요구하는 여성들의 힘찬 투쟁에 의해 세계가 진보해왔음을 보여주고 있다. 우리나라 역시 여성해방과 민족해방을 통일적 과제로 삼았던 일제하의 여성운동 이래 오늘에 이르기까지 숱한 여성들의 피끓는 투쟁이 여기까지 우리를 이끌어왔다. 그러나 앞서간 여성들의 때로는 목숨을 건 투쟁에도 불구하고 아직까지 우리 여성대중들은 우리에게 부과된 막중한 역사적 과제를 당당히 감당하지 못하고 있다. 여기에는 무엇보다 50년대 이래 유지되어온 어용적 여성운동이 여성대중들에게 심어준 부정적 인식이 크게 작용하였다. 이는 여성운동이란 본래 반민중적 성격을 지닌 것으로 낙인찍히게 하고, 지도자 중심의 운영은 여성운동을 여류 명사들만이 하는 운동으로 인식시켜왔던 것이다.</p>
                <br/>
                <p >70년대 들어 이에 대한 반성에서 새로운 여성운동이 출발했으며, 여성문제가 해결되기 위해서는 사회구조의 변화가 있어야 한다는 점에서는 진전을 이룩했다. 그러나 실제 운동에서는 여성대중의 생존권 투쟁을 여성운동 속으로 흡수해 내지 못하였다. 80년대 들어서 여성문제와 사회문제를 통일적으로 인식하고 이의 해결을 위해 정치적 투쟁이 강조되었다. 그러나 이는 원칙적으로 올바른 방향이었음에도 불구하고 여성대중들의 광범한 참여 기반 위에서   이루어지지 않았기 때문에, 실제의 운동은 관념적 과격성으로 이어지고 대다수 여성들과는 유리되고 말았다.</p>
                <br/>
                <p >몇몇 앞장선 여성들이 목청을 높였을 뿐 대다수 고통받는 여성들은 이들을 따라나서지도, 이들의 외침을 자신의 문제와 연결시키지도 못하였다. 오늘 우리들은 바로 이러한 벽을 뛰어넘고자 여성대중이 함께 나갈 수 있는 새로운 조직을 만들었다. 우리 여성들의 고통은 선두에 선 몇몇 여성들이 대변하여 해결될 수 있는 그런 간단한 문제가 아니다. 우리들은 일상적 삶을 매일매일 살아가고 있는 여성대중들이 함께 인식의 지평을 넓히고 함께 실천하면서 여성해방의 길에 동참하는 공간을 지향할 것이다. 이 길은 길고 지난하기에 때로 조급한 마음에 절망 할 때도 있을지 모른다. 그러나 우리는 여성대중의 거대한 저력을 믿는다. 물이 스미듯 천천히 소리없이 흘러가 마침내는 도도한 격류가 되어 온갖 것을 휩쓸어 버리는 대하를 믿기에 우리는 여기에 하나로 모인 것이다.</p>
                <br/>
                <p >우리 운동에는 도시와 농촌의 근로여성대중, 주부, 청년 등 고통받는 모든 여성들이 참여할 것이다. 각 계층마다 고통의 차이가 있을지언정 이 모든 여성들이 겪는 문제는 이 땅에 진정한 민주사회를 건설함으로써만 함께 해결될 수 있다. 조그만 차이를 넘어서 여성대중들이 하나로 결집되어 밀고 나갈 때 우리들은 오랜 세월 버티고 선 억압의 사슬을 끊어내고 해방을 기쁨을 맞이할 것이다.</p>
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tab="정관 & 운영규정" key="3">
          <div className='tabs-content'>
            <div className='about-subtitle'>
              정관 & 운영규정
            </div>
            <div className='rule-scroll-box'>
              <h3>(사단법인) 파주여성민우회 정관</h3>
              <br />
              <br />
              제1장 총 칙
              <br />
              <br />
              제1조 (명칭) <br />
              ① 이 단체는 사단법인 파주여성민우회라 칭한다. <br />
              ② 본회의 영문표기는 WomenLink로 한다. <br />
              <br />
              <br />
              제2조 (사무소의 위치)<br />
              ① 본회의 사무소는 서울특별시에 두고, 지부는 서울특별시, 광역시 및 각 시.도에 둘 수 있다.<br />
              ② 서울시 지부는 본부가 겸한다.<br />
              <br />
              <br />
              제3조 (목적)<br />
              본회는 성평등과 여성의 인권이 보장되는 민주사회, 인간과 자연이 조화로운 생태적 사회의 실현을 목적으로 한다<br />
              <br />
              <br />
              제4조 (사업) 본회는 제3조의 목적을 달성하기 위하여 다음 각 호의 활동을 수행한다.<br />
              ① 여성권익신장사업<br />
              ② 소비자생활협동 사업 및 소비자 권익사업<br />
              ③ 성폭력, 가정폭력 등 상담 및 여성인권증진사업<br />
              ④ 여성의 고용평등과 경제세력화 사업<br />
              ⑤ 차별 및 직장내 성희롱에 관한 상담사업<br />
              ⑥ 여성환경 및 여성건강사업<br />
              ⑦ 언론개혁 및 시청자주권사업<br />
              ⑧ 직업능력 개발사업<br />
              ⑨ 정보화사업<br />
              ⑩ 문화사업<br />
              ⑪ 여성복지 및 종합사회복지관 위탁사업<br />
              ⑫ 평화 통일사업<br />
              ⑬ 조사·연구·출판 사업<br />
              ⑭ 기타 본회의 목적달성에 필요한 부대사업<br />
              <br />
              <br />
              제5조 (수익사업) 본회의 목적사업으로 제공하는 이익은 원칙적으로 무상으로 한다. 다만 그 실비를 수혜자에게 부담시키는 수익사업을 하고자 할 때에는 미리 주무부 장관의 승인을 얻어야 한다.
              <br />
              <br />
              <br />
              제2장 회 원<br />
              <br />
              <br />
              제6조(회원의 가입)<br />
              ① 본회의 목적에 동의하여 회원 가입 절차를 마친 자는 회원이 된다.<br />
              ② 본회는 정당한 사유 없이 가입을 거절하거나 불리한 조건을 제시할 수 없다.<br />
              <br />
              <br />
              제7조(회원의 권리) 회원은 다음과 같은 권리를 가진다.<br />
              1. 본회의 자료를 제공받고 활동에 참여할 권리<br />
              2. 총회를 통하여 본회의 운영과 의사 결정에 참여할 권리<br />
              3. 선거권과 피선거권을 행사할 권리<br />
              <br />
              <br />
              제8조(회원의 의무) 회원은 다음의 의무를 진다.<br />
              1. 본회의 정관 및 제 규정의 준수<br />
              2. 총회 및 이사회의 결의사항 이행<br />
              3. 회비 및 제 부담금의 납부<br />
              <br />
              <br />
              제9조(회원의 탈퇴)<br />
              ① 회원은 본인의 의사에 따라 자유롭게 탈퇴할 수 있다.<br />
              ② 본회의 재산은 회원의 탈퇴로 인하여 환급되지 아니한다.<br />
              <br />
              <br />
              제10조(회원의 제명, 징계)<br />
              ① 회원이 다음 각 호의 사유에 해당될 경우에는 이사회의 의결을 거쳐 제명, 징계할 수 있다.<br />
              1. 본회의 명예를 손상시키고 목적 수행에 지장을 초래한 경우<br />
              2. 1년 이상 회원의 의무를 준수하지 않거나 권리를 행사하지 않는 경우<br />
              ② 회원을 제명시킬 때에는 당해 회원에게 제명사유를 통지하고 해명기회를 주어야 한다.<br />
              <br />
              <br />
              제3장 지 부<br />
              제11조(지부의 설립)<br />
              ① 지부설립절차와 운영사항은 총회에서 의결한 별도의 규정에 따른다.<br />
              ② 본회는 정당한 사유없이 지부설립의 자격을 갖춘 주체에 대하여 거절하거나 불리한 조건을 제시할 수 없다<br />
              <br />
              <br />
              제12조(지부의 권리)<br />
              ① 총회에 대의원을 파견할 수 있다.<br />
              ② 대의원은 총회에 참석하여 임원에 대한 선거권과 피선거권을 갖는다.<br />
              <br />
              <br />
              제13조 (지부의 의무)<br />
              ① 지부는 정관과 제규정을 준수해야 한다.<br />
              ② 지부는 규정에 따라 중앙회비도 납부해야 한다.<br />
              <br />
              <br />
              제14조(지부의 해산 및 징계)<br />
              ① 본회의 목적에 위배된 활동을 하거나 본회의 명예를 실추시킨 지부는 총회의 의결을 거쳐 징계<br />
              또는 해산시킬 수 있다.<br />
              ② 지부가 해산하고자 할 때는 사유서를 본회에 제출하고 총회에 보고한다.<br />
              ③ 해산된 지부는 여성민우회 명칭을 사용할 수 없고 자산 일체를 본부에 귀속시켜야 한다.<br />
              ④ 기타 징계의 내용 및 절차 등에 대해서는 별도의 규정으로 정한다.<br />
              <br />
              <br />
              제4장 임 원<br />
              <br />
              <br />
              제15조 (임원의 종류와 정수) 본회는 다음 각 호의 임원을 둔다.<br />
              ① 3인 이내의 대표(그 중 상임대표 1인을 둔다.)<br />
              ② 이사 5인 이상 15인 이내(대표 포함)<br />
              ③ 감사 2인<br />
              <br />
              <br />
              제16조 (임원의 선출)<br />
              ① 임원은 총회에서 선출한다.<br />
              ② 임기가 만료된 임원의 후임자는 임기 만료 30일 이내에 선출하며, 궐위된 임원의 후임자는 궐위된 날로부터 30일 이내에 선출하여야 한다. 단, 잔임 기간이 1년 미만인 때에는 이사회에서 선출한다.<br />
              ③ 그 밖에 임원선출에 관한 사항은 별도 규정에 따른다.<br />
              ④ 선임된 임원은 주무부 장관에게 보고하여야 한다.<br />
              <br />
              <br />
              제17조 (임원의 임기)<br />
              ① 대표의 임기는 3년이며, 1회에 한하여 연임할 수 있다.<br />
              ② 이사의 임기는 3년, 감사의 임기는 2년으로 하되 연임할 수 있다<br />
              ③ 보선된 임원의 임기는 전임자의 잔여기간으로 한다.<br />
              <br />
              <br />
              제18조 (임원의 직무)<br />
              ① 대표는 본회를 대표하며 그 중 상임대표는 제반 업무를 통할하고 총회 및 이사회의 의장이 된다.<br />
              ② 상임대표의 유고 또는 궐위시에는 이사회에서 대표 중 직무대행의 순서를 정한다.<br />
              ③ 이사는 이사회를 구성하고 본회의 업무에 관한 사항을 의결하며 총회로부터 위임받은 사항을 수행한다.<br />
              ④ 감사는 본회의 재산상황, 이사회의 운영 및 업무에 관하여 감사하며, 감사 결과 부정 또는 부당사항을 발견한 때에는 이사회, 총회에 시정을 요구하고 그 사실을 주무부 장관에게 보고하여야 한다.<br />
              <br />
              <br />
              제5장 총 회<br />
              <br />
              <br />
              제19조 (총회)<br />
              ① 총회는 최고의결기관으로서 대의원으로 구성하며, 정기총회와 임시총회가 있다.<br />
              ② 대의원 정수는 50인 이상 200인 이내로 한다.<br />
              ③ 제1항의 대의원 임기는 1년으로 한다.<br />
              ④ 대의원의 선출방법은 총회에서 의결한 별도의 규정으로 정한다.<br />
              <br />
              <br />
              제20조 (총회의 소집)<br />
              ① 정기총회는 매년 1회 회계년도 종료 후 1월 이내에 상임대표가 소집한다.<br />
              ② 임시총회는 다음 각 호에 해당하는 경우에 상임대표가 소집한다.<br />
              1. 상임대표가 필요하다고 인정하는 때<br />
              2. 이사회가 필요하다고 인정하여 소집을 요구한 때<br />
              3. 총회구성원 1/5 혹은 50명이상이 회의목적사항과 소집이유를 기재한 서면을 제출하고 요구한 때<br />
              4. 감사 직무와 관련하여 감사의 소집요구가 있을 때<br />
              ③ 임시총회의 소집요구를 받으면 상임대표는 30일 이내에 임시총회를 소집하여야 한다. 다만, 정당한 이유 없이 소집기간 내에 상임대표가 총회를 소집하지 아니할 경우에는 대표자 중 연장자 순으로, 대표가 정당한 이유 없이 소집기간 내에 소집하지 아니할 경우에는 이사 중 연장자 순으로 상임대표의 총회에 관한 업무를 대행할 수 있다.<br />
              <br />
              <br />
              제21조 (총회 개최 및 통지) 상임대표는 회의 개최 7일 전까지 회의목적사항과 일시 및 장소를 정하여 서면 또는 전자우편로 대의원에게 통지하여야 한다.<br />
              <br />
              <br />
              제22조 (총회의 의결사항) 총회는 다음 각 호의 사항을 의결한다.<br />
              1.정관의 변경<br />
              2. 기본재산의 취득과 처분<br />
              3. 본회의 기본활동 방침 결정<br />
              4. 각종 규정의 제정,개정<br />
              5. 임원의 선출, 해임과 고문,지도위원 등 추대<br />
              6. 전년도 활동보고 및 결산안 승인<br />
              7. 신년도 사업계획 및 예산안 심의 확정<br />
              8. 감사보고서의 승인<br />
              9. 회원의 회비 및 차입금 최고한도액 결정<br />
              10. 본회의 합병, 분할 또는 휴업<br />
              11. 지부의 설립 및 해산<br />
              12. 기타 중요한 사항<br />
              <br />
              <br />
              제23조 (총회의 의결)<br />
              ① 총회는 별도의 규정이 없는 한 총회 구성원 과반수의 출석으로 개최하고 출석자 과반수의 찬성으로 의결한다.<br />
              ② 상임대표는 총회의 의장이 된다.<br />
              ③ 제1항의 규정에 의한 총회의 개회 정족수 미달로 유회된 때에는 상임대표는 15일 이내에 다시 총회를 소집하여야 한다.<br />
              <br />
              <br />
              제24조 (총회의 특별결의) 다음 각 호의 사항은 총회 구성원 과반수 이상의 출석과 총회 출석자 2/3이상의 찬성으로 의결한다.<br />
              1. 정관변경<br />
              2. 본회의 합병, 분할 또는 휴업<br />
              3. 기본재산의 처분<br />
              4. 임원의 해임<br />
              5. 자본금 감소<br />
              6. 지부의 해산<br />
              <br />
              <br />
              제25조 (의결권의 위임행사)<br />
              ① 대의원은 대리인으로 하여금 선거권 및 의결권을 위임 행사할 수 있다.<br />
              ② 대의원은 1인 이상을 위임받을 수 없고, 위임을 증명하는 서면을 본회에 제출하여야 한다.<br />
              <br />
              <br />
              제26조 (의결제척사유) 대의원이 다음 각 호에 해당하는 때에는 그 의결에 참여하지 못한다.<br />
              ① 임원의 해임에 있어서 그 자신에 관한 사항<br />
              ② 금전 및 재산의 수수에 관한 사항으로서 의장 또는 대의원 자신과 본회의 이해가 상반되는 사항<br />
              <br />
              <br />
              제28조 (총회의사록)<br />
              ① 총회의 의사에 관하여는 의사의 경과와 그 결과를 기재한 의사록을 작성하고 의장과 총회에서 선출한 3인 이상의 대의원이 이에 기명날인한다.<br />
              ② 총회 개최 후 총회의사록 요지를 참석하지 않은 총회구성원에게 서면으로 통지하여야 한다.
              <br />
              <br />
              <br />
              제6장 이 사 회<br />
              <br />
              <br />
              제28조 (구성)<br />
              ① 본회의 집행기관으로 이사회를 둔다.<br />
              ② 이사회는 대표와 이사로 구성한다.<br />
              ③ 감사는 이사회에 출석하여 발언할 수 있다.<br />
              <br />
              <br />
              제29조 (이사회의 소집)<br />
              ① 이사회는 상임대표가 소집하고 그 의장이 된다.<br />
              ② 상임대표는 다음 각 호의 사유가 있는 때에는 10일 이내에 이사회를 소집하여야 한다.<br />
              1. 이사 과반수 이상의 요구가 있는 때<br />
              2. 감사의 요구가 있는 때<br />
              3. 기타 상임대표가 필요하다고 인정하는 때<br />
              ③ 이사회를 소집하고자 할 때에는 회의 7일 전까지 회의안건.일시.장소를 기재한 서면 또는 전자우편로 각 이사 및 감사에게 통지하여야 하며, 통지하지 아니한 사항에 대하여는 의결할 수 없다. 단 재적이사 전원이 참석하고 전원이 찬성하는 경우에는 예외로 할 수 있다.(2014.1.18. 개정. 전자우편)<br />
              ④ 이사회의 의결은 재적이사 과반수의 출석과 출석이사 과반수 이상의 찬성으로 가결된다.<br />
              ⑤ 감사는 필요할 경우 상임대표에게 이사회의 소집을 요구할 수 있으며 이사회에 출석하여 발언할 수 있다.<br />
              ⑥ 이사회는 원활하고 효율적인 사업의 집행을 위하여 필요한 위원회를 설치하여 운영할 수 있다.<br />
              <br />
              <br />
              제30조 (이사회의 의결사항) 이사회는 다음 각 호의 사항을 심의 의결한다.<br />
              1. 본회 업무집행에 관한 사항<br />
              2. 총회의 소집과 총회에 상정할 의안 작성<br />
              3. 총회준비위원회 구성<br />
              4. 잔임기간이 1년 미만인 임원의 선임<br />
              5. 사업계획 및 예산안 작성<br />
              6. 재산관리<br />
              7. 회원의 제명<br />
              8. 내규의 제정.개정<br />
              9. 기타 총회에서 이사회의 결의사항으로 인정한 사항<br />
              <br />
              <br />
              제31조 (이사회의 특별의결) 이사회는 지부의 징계에 대해서는 재적 이사 과반수 이상의 찬성으로 의결한다.<br />
              <br />
              <br />
              제7장 조 직<br />
              <br />
              <br />
              제32조 (중앙위원회) 중앙위원회는 본부와 지부의 중요사업을 논의, 의결하며, 본부대표단과 사무처장 및 사무처 주요부서장, 지부대표, 본부의 부설 및 주요기구의 책임자로 구성한다.(2017.1.21. 개정)<br />
              <br />
              <br />
              제33조 (상임집행위원회) 상임집행위원회는 본부의 주요활동을 조정, 의결하며, 본부대표단과 사무처장, 본부의 부설 및 주요기구의 책임자로 구성한다.<br />
              <br />
              <br />
              제34조 (부설기구) 본회는 사업의 수행을 위해 아래의 부설기구를 둘 수 있다.<br />
              ① 성폭력상담소는 다양한 가족문화, 성평등한 성문화 형성과 여성인권 증진을 위한 활동을 한다.<br />
              상담소 소장은 상임대표가 임명하여 총회의 인준을 받아야 한다.<br />
              ② 미디어운동본부는 미디어 민주주의와 여성주의적 미디어문화 실현을 위해 활동한다. 미디어운동본부 소장은 상임대표가 임명하여 총회의 인준을 받아야 한다.<br />
              ③ 부설기구의 인사.복부.임금 등에 관한 세부 사항은 본회에서 정한 내규를 따른다.<br />
              <br />
              <br />
              제35조 (각종 위원회와 특별기구) 본회는 활동에 필요한 각종 위원회 및 특별기구를 둘 수 있다.<br />
              <br />
              <br />
              제36조 (사무처)<br />
              ① 본회의 업무를 효율적으로 집행하기 위하여 사무처를 둔다.<br />
              ② 사무처에는 본회의 제반 업무를 총괄한 사무처장을 두며, 사무처장은 상임대표가 임명하여 총회의 인준을 받아야 한다.<br />
              <br />
              <br />
              제37조 (사무처 부서 등)<br />
              ① 사무처는 업무수행에 필요한 부서를 둘 수 있다.<br />
              ② 사무처 업무처리를 위하여 필요한 인원을 두며, 사무처의 조직과 운영, 상근활동가의 인사.복무.임금 등에 관한 세부 사항은 별도로 내규를 정한다.<br />
              <br />
              <br />
              제8장 재 정 및 회 계<br />
              <br />
              <br />
              제38조 (재정)<br />
              ① 본회의 경비는 회비, 기부금, 회원부담금과 기타 잡수입으로 한다.<br />
              ② 회원의 회비 또는 부담금은 이사회에서 정한다.<br />
              <br />
              <br />
              제39조 (자산의 구분) 본회의 자산은 기본재산과 보통재산으로 구분하되, 기본재산은 본회의 목적사업 수행에 관계되는 부동산, 또는 동산으로 하고, 보통재산은 기본재산 이외의 재산으로 한다.<br />
              <br />
              <br />
              제40조 (재산의 관리)<br />
              ① 본회가 매수, 기부채납, 기타방법으로 기본재산을 취득한 때에는 지체없이 이를 재산목록에 편입조치하고 주무부 장관에게 보고하여야 한다.<br />
              ② 본회의 기본재산을 매도, 증여, 임대, 교환, 담보제공 등으로 처분하거나 의무의 부담, 권리를 포기하고자 할 때에는 총회의 의결을 거쳐 주무부 장관의 승인을 얻어야 한다.<br />
              <br />
              <br />
              제41조 (예산외의 채무부담) 본회가 예산외의 채무부담을 하고자 할 때에는 이사회의 의결을 거쳐 주무부 장관의 승인을 얻어야 한다.<br />
              <br />
              <br />
              제42조 (회계년도) 본회의 회계년도는 매년 1월1일부터 12월31일까지로 한다.<br />
              <br />
              <br />
              제43조 (세입.세출예산) 본회의 세입.세출예산은 회계년도 개시 1월전까지 작성하여 이사회의 의결을 거쳐 총회의 승인을 얻어 주무부 장관에게 보고하여야 한다.<br />
              <br />
              <br />
              제44조 (결산)<br />
              ① 상임대표는 회계년도 종료 후 1월 이내에 전년도 사업실적서 및 수지결산서를 작성하여 이사회의 의결을 거쳐 총회의 승인을 얻어 주무부 장관에게 보고하여야 한다.<br />
              ② 연간 기부금 모금액 및 활용실적은 인터넷 홈페이지를 통해 공개한다.<br />
              <br />
              <br />
              제45조 (결산상 잉여금 처리) 매년도 결산상 잉여금은 다음 년도에 이월 사용하는 것을 제외하고는 이를 기본재산에 편입하거나 이사회의 의결에 의하여 본회 목적사업에 사용한다.<br />
              <br />
              <br />
              제9장 보 칙<br />
              <br />
              <br />
              제46조 (임원의 정치활동제한) 본부와 지부의 대표는 임기중에 정당에 가입하거나 이에 준하는 정치활동을 할 수 없다.<br />
              <br />
              <br />
              제47조 (법인해산)<br />
              ① 본회를 해산하고자 할 경우에는 총회에서 재적 대의원 3/4이상의 찬성으로 의결하여 주무부 장관의 허가를 받아야 한다.<br />
              ② 본회 해산시 잔여재산은 주무부 장관의 승인을 얻어 국가, 지방자치단체 또는 유사한 목적을 가진 다른 비영리법인에게 귀속한다.<br />
              <br />
              <br />
              제48조 (운영규정 등) 본 정관의 시행을 위하여 필요한 사항은 총회에서 별도의 규정을 정한다.<br />
              <br />
              <br />
              제49조 (기타) 본회의 정관에 규정되지 아니한 사항은 민법 중 사단법인에 관한 규정과 여성부 소관 비영리법인의 설립 및 감독에 관한 규칙을 준용한다.<br />
              <br />
              <br />
              부 칙<br />
              <br />
              <br />
              1. 이 정관은 여성부장관이 허가한 날로부터 시행한다<br />
              <br />
              <br />
              <p>제 정  	1987. 9. 12</p>
              <p>제1차  개정	1988. 1. 31</p>
              <p>제2차  개정	1988. 9. 10</p>
              <p>제3차  개정	1989. 1. 30</p>
              <p>제4차  개정	1990. 1. 20</p>
              <p>제5차  개정	1991. 1. 26</p>
              <p>제6차  개정	1992. 1. 25</p>
              <p>제7차  개정	1994. 1. 29</p>
              <p>제8차  개정	1995. 1. 22</p>
              <p>제9차  개정	1996. 1. 27</p>
              <p>제10차 개정	1997. 1. 25</p>
              <p>제11차 개정	1998. 1. 24</p>
              <p>제12차 개정	1999. 1. 23</p>
              <p>제13차 개정	2002. 1. 26</p>
              <p>제14차 개정	2003. 1. 25</p>
              <p>제15차 개정	2005. 1. 22</p>
              <p>제16차 개정	2006. 1. 21</p>
              <p>제17차 개정	2007. 1. 27</p>
              <p>제18차 개정	2009. 1. 17</p>
              <p>제19차 개정	2010. 1. 23</p>
              <p>제20차 개정	2011. 1. 22</p>
              <p>제21차 개정	2014. 1. 18</p>
              <p>제22차 개정	2017. 1. 21</p>
              <br />
              <br />
              <br />
              <h3>한국여성민우회 운영규정</h3>
              <br />
              <br />
              [규정 1: 지부의 설립에 대한 규정]<br />
              <br />
              <br />
              제1조 (지부 준비위 구성조건)<br />
              ① 지부설립을 원하는 주체들은 10인 이상으로 구성된 지부 창립준비위원회를 구성한다.<br />
              ② 준비위원회는 다음의 신청서를 제출한다.<br />
              1. 준비위원회 승인신청서<br />
              2. 준비위원의 이력서<br />
              3. 지부 창립의 목적, 준비과정, 조직구조, 사업계획 및 재정충원 등의 계획서<br />
              ③ 위 서류가 접수되면 이사회는 지부준비위원회 승인 여부를 검토하여, 그 결과를 서류접수 1개월 이내에 서면으로 통보한다.<br />
              ④ 준비위원회 활동기간은 1년으로 하며, 이사회는 이를 평가한 후에 승인여부를 총회에 상정한다.<br />
              <br />
              <br />
              제2조 (준비위원회의 권리와 의무)<br />
              ① 준비위원회는 필요에 따라 본부의 사업과 회의에 참관할 권리와 지부 설립에 필요한 본부의 지원을 받을 권리를 가진다.<br />
              ② 준비위원회는 활동 및 설립에 필요한 경우 본부와 상호 협의를 해야 한다.<br />
              <br />
              <br />
              제3조 (지부설립 조건)<br />
              ① 준비위원회는 본부 총회의 지부 설립 승인 전에 창립총회를 개최한다.<br />
              ② 창립총회 1개월 이내에 대표는 다음의 서류를 본부에 제출하여야 한다.<br />
              1. 창립총회 회의록<br />
              2. 정관<br />
              3. 조직표와 회원 및 임원명단<br />
              4. 사업계획서와 예산안<br />
              5. 사무실 등기권리증 또는 임대차 계약서<br />
              6. 상근활동가 이력서<br />
              <br />
              <br />
              제4조 (지부운영지침)<br />
              지부운영과 관련한 세부 사항은 내규로 한다.<br />
              <br />
              <br />
              [규정 2: 지부 징계 및 해산에 대한 규정]<br />
              <br />
              <br />
              제1조(목적)<br />
              본 규정은 정관 제15조에 의거하여 각 지부가 본회의 목적에 위배한 활동을 하거나 명예를 실추시키는 행위를 방지함을 목적으로 한다.<br />
              <br />
              <br />
              제2조(징계의 종류 및 사유)<br />
              지부가 다음 각호의 사유에 해당될 경우에는 경고, 자격정지 등의 징계 및 해산시킬 수 있다.<br />
              1. 경고<br />
              1) 본회의 목적에 위배된 활동을 하거나 명예를 실추시킨 경우<br />
              2) 정관 및 제규정, 총회 및 이사회에서 의결한 사항을 지키지 않은 경우<br />
              3) 1년 이상 지부의 의무를 이행하지 않는 경우<br />
              ① 중앙회비 미납<br />
              ② 각종 회의 불참<br />
              4) 지부 내의 조직분규로 활동에 지장을 받은 경우<br />
              <br />
              <br />
              2. 자격정지<br />
              1) 본회의 목적에 위배되거나 명예를 실추시킨 정도가 심대한 경우<br />
              2) 정관 및 제규정, 총회 및 이사회에서 의결한 사항을 심각하게 지키지 않은 경우<br />
              3) 공금 유용과 횡령 등 재정문제가 발생한 경우<br />
              4) 6개월 이상 지부활동이 정지된 경우<br />
              5) 경고를 연속 2회 이상 받은 경우<br />
              6) 자격정지를 받은 지부는 여성민우회 명칭을 사용할 수 없고, 이사회는 해당지부가 정상화될 때까지 부분적 또는 전면적으로 활동을 정지시킬 수 있다.<br />
              <br />
              <br />
              3. 해산<br />
              자격정지 1년이 경과하도록 문제가 해결되지 않을 경우 총회에서 해당 지부를 해산시킬 수 있다.<br />
              <br />
              <br />
              제3조(징계의 절차)<br />
              1. 이사회는 본 규정 제2조에 의해 사유가 발생한 경우 중앙위원회에 위임하여 진상조사 및 조정위원회(이하 위원회)를 구성하도록 하고, 위원회 활동의 결과를 토대로 징계의 수위 및 자격회복 여부를 결정한다.<br />
              2. 경고를 받은 지부는 해당 사유에 대해 조속한 시일 내에 개선하도록 노력하여야 한다.<br />
              3. 자격정지를 받은 지부는 통보받은 날로부터 30일 이내에 이사회에 재심을 청구할 수 있고 이사회는 조속한 시일 내에 재심을 하여야 한다. 단, 재심청구에 대한 결정이 날 때까지 자격정지는 유효하다.<br />
              4. 지부해산에 대한 절차는 민법 중 법인 관련 조항을 준용한다.<br />
              <br />
              <br />
              제4조 (진상조사 및 조정위원회의 구성과 역할)<br />
              1. 위원회는 본부 대표단, 사무처장, 지부 대표 등 7인 이내로 구성한다.<br />
              2. 위원회는 징계 사유가 발생한 지부 활동에 개입하여 조사 및 조정할 의무를 가지며 지부는 위원회의 개입과 조정에 따라야 할 의무를 가진다.<br />
              3. 조사 및 조정의 절차<br />
              1) 사건 조사 및 진상 규명<br />
              2) 대화 모색 및 조정안 제시<br />
              3) 진상조사 및 조정 결과 이사회에 부의<br />
              ① 정상운영이 가능하다고 판단되었을 경우 자격 회복 요청<br />
              ② 해결이 안될 경우 징계 요청<br />
              <br />
              <br />
              제 5조(자진해산)<br />
              정관 제 15조 2항에 의거하여 지부가 해산하고자 할 때는 다음과 같은 조건과 절차를 따라야 한다.<br />
              1. 지부해산을 위한 지부 총회를 개최한다.<br />
              2. 지부해산 총회는 의사정족수 과반수 이상 출석과 참석인원 2/3이상의 찬성으로 의결한다.<br />
              3. 해산 총회를 개최하지 못하는 경우 지부해산 사유서와 회원 2/3이상의 동의서를 이사회에 제출하는 것으로 갈음할 수 있다.<br />
              4. 사유서가 접수되면 이사회는 이를 총회에 보고한다.<br />
              <br />
              <br />
              [규정 3: 임원의 선출에 관한 규정]<br />
              <br />
              <br />
              제1조 (공천위원회)<br />
              ① 공천위원회는 대의원의 의견을 수렴하여 임원 후보를 추천한다.<br />
              ② 공천위원회는 총회준비위원회에서 5인~10인 선임한다.<br />
              <br />
              <br />
              제2조 (선거관리위원회)<br />
              원활한 임원후보 선출을 위해 선거관리위원회를 둔다.<br />
              <br />
              <br />
              [규정 4: 대의원 선출방법]<br />
              대의원 선출은 정회원 중에서 선출하며, 대의원 선출방법은 매년 이사회에서 결정한다.<br />
              <br />
              [규정 5: 총회준비위원회 구성방안에 관한 규정] 총회준비위원회 위원은 이사회에서 중앙위원회에 위원 구성을 위임한다.<br />
            </div>
            <div ></div>
          </div>
        </TabPane>
      </Tabs>
    </AboutWrapper>
  );
}

export default About;
