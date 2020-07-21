import React, {useState} from 'react';
import { Tabs, Timeline } from 'antd';
import Image1 from 'assets/a1.png';
import Image2 from 'assets/a2.png';
import Image3 from 'assets/a3.png';
import DotImage from 'assets/dot.png';
import { get, map } from 'lodash';
import { getHistories } from 'libs/api/information';
import { useDataApi } from 'libs/hooks';
import { TListResponse } from 'modules/types';
import { InformationHistory } from 'modules/information/types'
const { TabPane } = Tabs;

export const AffImage1 = () => {
  return (
    <img src={Image1} style={{float:'right' ,marginLeft: '20px', marginBottom: '10px' ,width: 'auto', height: '200px'}} />     
  );
};

export const AffImage2 = () => {
  return (
    <img src={Image2} style={ {width: 'auto', height: '230px', marginTop:'30px', marginBottom: '50px', marginLeft: '20px', marginRight: '20px'}} />     
  );
};

export const AffImage3 = () => {
  return (
    <img src={Image3} style={ {width: 'auto', height: '310px', marginTop:'30px', marginBottom: '70px'}}/>
  );
};

export const Dot = () => {
  return (
    <img src={DotImage} style={ {width: 'auto', height: '22px', marginRight: '10px', marginBottom: '10px'}} />     
  )
}
export const AA = () => {
  return (
    <>
    <div style={{content:' ', position:'absolute',borderStyle:'solid', padding:'10px', borderColor:'#7F7F7F',
    display:'block',width:'0',zIndex:0, top:'-20px', left:'49px' }}>
    </div>
    <div style={{zIndex:100, position:'relative', height:'auto', padding:'10px', background:'#FFFFFF',
            borderRadius:'5px', border:'#7F7F7F', fontSize:'14px', textAlign:'left', }}>
    </div>
    </>
  )
}

const About = () => {
  const [{data, loading}] = useDataApi<TListResponse<InformationHistory>>(getHistories.bind(null, {
    params: {
	current: 1,
	pageSize: 999
  }}));
  
  return (
	<>
    <div style={{marginLeft:'40px', marginRight:'40px'}}>
	  <Tabs defaultActiveKey="1">
    <TabPane tab="설립취지" key="1">
      <div style={{fontSize:'25px'}}><strong>성폭력 없는 세상, 함께 만들기</strong></div>
      <br/>
      <AffImage1/>
      <div style={{fontSize:'18px', width:'800px', marginBottom:'200px'}}>한국여성민우회 성폭력상담소는 여성주의 시각을 바탕으로 한국 사회의
      성문화와 제도를 바꾸기 위한 활동을 펼치고 있습니다. 자신과 상대방의
      느낌과 의사를 존중하고 건강하게 표현함으로써 성폭력을 예방하고 성적
      자기결정권이 존중되는 사회를 만들어 갑니다.</div> 
      
      <Dot/>
      <span style={{fontSize: '24px', color: '#6e6e6e', marginTop: '20px', fontWeight:'bold'}}>성폭력 없는 세상</span>
      <AffImage2/>
      
      <Dot/>
      <span style={{fontSize: '24px', color: '#6e6e6e', marginTop: '20px', fontWeight:'bold'}}>상담소와 쉼터</span>
      <br/>
      <span>한국여성민우회는 서울을 중심으로 군포, 고양·파주, 광주 등 3개 지부에서 상담소와 쉼터를 운영하고 있습니다.</span>
      <br/>
      <div style={{width:'400px', marginTop:'40px'}}>
        <p style={{textAlign:'center'}}>
        고양파주여성민우회<br/>성폭력상담소 ∙ 피해자보호시설 하담데이트 성폭력
        </p><br/>
        <span><strong>상담전화</strong> 031­-919­-1366 (고양) 031-946-0366 (파주)</span>
        <br/>
        <span><strong>웹사이트</strong>
        <a href="http://goyang.womenlink.or.kr/2013/index.php">http://goyang.womenlink.or.kr/2013/index.php</a></span>
      </div>

    </TabPane>
    <TabPane tab="연혁" key="2">
    <Timeline mode="alternate">
        {map(get(data, 'contents', []).filter(v => v.year===2020), v => <Timeline.Item>{get(v, 'body')}</Timeline.Item>)}
    </Timeline>
    </TabPane>
    <TabPane tab="활동내용" key="3">
      <AffImage3/>
      <Dot/>
      <span style={{fontSize: '24px', color: '#6e6e6e', marginTop: '20px', fontWeight:'bold'}}>성폭력 예방은 어떻게 해야 할까요?</span>
      <br/>
      <p style={{fontSize: '16px', marginTop:'10px', marginBottom:'40px'}}>성폭력을 예방하고 성평등한 사회를 만들기 위해서는 성의식 향상을 바탕으로 한 일상 속 성문화를 바꾸는 것이 중요합니다. 우선 자신과 상대방의 느낌과 의사를 존중하고 건강하게 표현함으로써 성적자기결정권을 존중하는 문화가 확산되어야겠지요? 그래서 민우회 상담소에서는 당/안/즐이라는 캠페인과 성교육을 진행한답니다.
‘당안즐’이란 말이 낯설게 느껴지시나요? 당안즐은 몸의 존엄성과 성적 욕구 를 존중하는 당당한 성, 나와 파트너의 몸과 마음을 건강하게 소통할 수 있는 안전한 성, 주체적으로 성적 의사를 결정하고 향유할 수 있는 즐거운 성이라는 의미를 담고 있습니다. 성을 금기시하고 터부시하는 왜곡된 성문화가 아닌 ‘당당하고 안전하고 즐거운 성’이라는 의미 확산을 통해 드러내는 성, 이야기 하고 공유되는 경험으로써의 건강한 성문화를 만들고자 합니다. 성폭력 없는 세상으로 한 걸음 더 가까이!</p>
      <Dot/>
      <span style={{fontSize: '24px', color: '#6e6e6e', marginTop: '20px', fontWeight:'bold'}}>성폭력 상담소는 상담만 하나요?</span>
      <br/>
      <p style={{fontSize: '16px', marginTop:'10px', marginBottom:'40px'}}>No, No, No! 그렇지 않습니다. 상담소는 상담뿐만 아니라 일상 속 성문화 변화를 도모하기 위해 다양한 활동을 진행하고 있답니다. 피해자의 용기 있는 발걸음을 지지하고 피해자의 법적권리가 제대로 행사될 수 있는 환경을 만들기 위한 ‘재판동행지원단’ 활동, 여성의 성적 경험을 터부시하는 성문화 속 피해에 대응할 수 있는 힘을 기르고 유포된 성행위 촬영물을 음란물로 소비하는 피해 상황을 중단하기 위한 ‘추적자’ 활동, 성폭력 사건의 판결문 속 잘못된 통념을 짚어내어 재판부의 인식 변화를 요구하는 ‘검·판사 이렇게 할 수 있다’ 판례분석 활동, 정부 정책 및 제도에 대한 모니터링과 대응을 위한 ‘개미마이크’ 등의 다양한 활동을 펼치고자 부단히 노력중이랍니다. 보다 많은 분들이 함께 참여할 수 있도록 온/오프라인을 넘나들며 기획하는 다양한 일상 속 성문화 캠페인과 기획단 등의 활동은 반성폭력에 관심 있는 누구나 참여 가능합니다. 함께 모여 머리를 맞대고 성폭력 없는 세상을 위한 길을 내면 좋겠습니다. 반성폭력 활동에 함께 하실 분은 상담소의 공지 게시판을 확인해주세요!</p>
      <Dot/>
      <span style={{fontSize: '24px', color: '#6e6e6e', marginTop: '20px', fontWeight:'bold'}}>상담을 받고 싶은데 어떻게 하면 될까요?</span>
      <br/>
      <p style={{fontSize: '16px', marginTop:'10px', marginBottom:'40px'}}>애인과 성평등한 관계를 맺고 싶은데 잘 되지 않고, 성(Sexuality)에 대해 궁금 하고 알고 싶은 게 정말 많은데 어디에 물어봐야 할지 모르겠고, 내가 성폭력 피해를 겪었을 때 어떻게 대응하면 좋을지 이야기 나누고 싶을 때 혹은 내 주 변에서 성폭력 피해가 발생했을 때 피해자의 조력자로서 어떻게 함께 할 수 있 을지가 고민된다면, 민우회 상담소로 전화주세요. 성에 대한 고민이나 성폭력 피해 경험을 이야기하기 어렵게 만드는 사회 분위기가 고민과 피해를 혼자만 의 경험으로 내 안에 가둬두게 하지만, 상담소와 함께 이야기함으로써 변화의 원동력을 만들고 이후를 계획할 수 있는 대응의 힘을 주고받으면 좋겠지요. 성 폭력상담이 필요할 때 전화주세요. 방문하셔서 상담하길 원하시는 경우에도 전화 상담을 통한 예약 후에 가능하답니다. 자, 이제 전화기를 들고 02) 335­ 1858 민우회 상담소로 전화하세요!</p>
    </TabPane>
  </Tabs>
  </div>
	</>
  );
}

export default About;
