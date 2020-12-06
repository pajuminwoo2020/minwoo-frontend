import React, {useState} from 'react';
import {Avatar, Tabs, Timeline, Row, Col, Typography, Divider, BackTop, Skeleton, Spin} from 'antd';
import {shallowEqual, useSelector} from 'react-redux';
import {RootState} from 'modules';
import styled from 'styled-components';
import Image1 from 'assets/affiliate_about1.png';
import Image2_1 from 'assets/affiliate_about2_1.jpg';
import Image2_2 from 'assets/affiliate_about2_2.jpg';
import Image2_3 from 'assets/affiliate_about2_3.jpg';
import Image_plus from 'assets/affiliate_about2_plus.jpg';
import Image3_title from 'assets/affiliate_about3_title.jpg';
import Image3_1 from 'assets/affiliate_about3_1.jpg';
import Image3_2 from 'assets/affiliate_about3_2.png';
import Image3_3 from 'assets/affiliate_about3_3.jpg';
import ArrowSource from 'assets/arrow.png';
import DotImage from 'assets/dot.png';
import AffiliateImage from 'assets/affiliate_about.png';
import {get, map} from 'lodash';
import {getClinicAbout, getAffiliateHistories} from 'libs/api/information';
import {useDataApi} from 'libs/hooks';
import {TInformationHistory, TClinicAbout} from 'modules/information/types'
import {PrimaryColor, device} from 'GlobalStyles';
import {HistoryWrapper} from 'components/base/styles';
import scrollIntoView from 'scroll-into-view';
import Configs from 'config';

const {TabPane} = Tabs;
const {Title, Text, Paragraph} = Typography;
const AffiliateAboutWrapper = styled.div`
  text-align: justify;
  .arrow {
    width: 40px;
    height: 40px;
    position: absolute;
  }
  .arrow.right {
    right: -13px;
    top: 50%;
    transform: translateY(-50%);
  }
  .arrow.down {
    transform: rotate(90deg) translateY(50%);
    left: 50%;
    bottom: -10px;
  }
  .arrow.left {
    transform: rotate(180deg) translateY(50%);
    left: -13px;
    top: 50%;
  }
  .arrow.up {
    transform: rotate(270deg) translateY(-50%);
    top: -10px;
    left: 50%;
  }

  .tabs-content {
    padding: 40px;
	@media screen and ${device.mobile} {
	  padding: 5px;
	}
  }
  .list-image {
    text-align: center;
  }
  .block-title {
    margin: 50px 0px 30px 0px;
  }
  .circle-box {
    width: 180px;
    height: 180px;
    line-height: 33px;
    border-radius: 50%;
    border: none;
    background: yellow;
    color: #000080;
    font-size: 24px;
    text-align: center;
    padding: 42px 10px;
    margin: auto;

    p {
      margin-bottom: 0px;
    }
  }
  .circle-box.with-border {
    cursor: pointer;
    background: transparent;
    border: 6px solid #a0a0a0;
    font-size: 20px;
  }
  .circle-box.with-border.line1 {
    padding: 75px 10px;
  }
  .box-paragraph {
    padding-left: 20px;
  }
  .content-title {
    font-size: 18px;
    color: rgb(43, 144, 217);
  }
  .content-body {
    margin: 10px 0px 30px 0px;
    max-width: 700px;
    white-space: pre;
  }
  .ant-tabs-tab {
    font-size: 14px;
  }
  .box-link {
	position: absolute;
	cursor: pointer;
	width: 30%;
	height: 15%;
  }
`;
const About = () => {
  const [{data: clinicAbout, loading}] = useDataApi<TClinicAbout>(getClinicAbout.bind(null));
  const [{data: dataHistories, loading: loadingHistories}] = useDataApi<TInformationHistory>(getAffiliateHistories.bind(null));

  return (
    <AffiliateAboutWrapper>
      <div style={{fontSize: '18px', marginBottom: '30px', lineHeight: '30px'}}>
        <strong>파주성폭력상담소 <span style={{color: `${PrimaryColor}`}}>'함께'</span></strong>는<br/>여성주의 시각을 바탕으로 젠더폭력 피해경험자의 심리적&#183;법적&#183;의료적 지원을 합니다. <br/>또한 반성폭력운동과 여성인권운동을 통해 성평등한 사회를 만들어갑니다.
      </div>
      <Tabs defaultActiveKey="activity">
        <TabPane key="activity" tab="활동">
          <div className="tabs-content" id="activity">
			<div className="content-body" style={{textAlign: 'center', position: 'relative', marginBottom: '40px'}}>
			  <Avatar src={AffiliateImage} shape="square" style={{maxWidth: '650px', width: '100%', height:'auto'}}/>
			  <div className="box-link" style={{top: 0, left: '50%', transform: 'translateX(-50%)'}} onClick={() => {
				scrollIntoView(document?.getElementById('counseling') as HTMLElement, {
				  align: {top: 0.4},
				  });
				}}
			  ></div>
			  <div className="box-link" style={{bottom: 0, left: '50%', transform: 'translateX(-50%)'}} onClick={() => {
				scrollIntoView(document?.getElementById('counseling') as HTMLElement, {
				  align: {top: 0.4},
				  });
				}}
			  ></div>
			  <div className="box-link" style={{top: '50%', left: 0, transform: 'translateY(-50%)'}} onClick={() => {
				scrollIntoView(document?.getElementById('page-activity') as HTMLElement, {
				  align: {top: 0.4},
				  });
				}}
			  ></div>
			  <div className="box-link" style={{top: '50%', right: 0, transform: 'translateY(-50%)'}} onClick={() => {
				scrollIntoView(document?.getElementById('education') as HTMLElement, {
				  align: {top: 0.4},
				  });
				}}
			  ></div>
            </div>
            <Row gutter={[16, 16]} style={{marginTop: '30px'}}>
              <Col flex="220px" style={{textAlign: 'center'}}>
                <img src={`${Configs.API_HOST}${get(clinicAbout, 'counseling_image')}`} style={{width: '100%', maxWidth: '130px'}}/>
              </Col>
              <Col flex="auto">
                <Title className="content-title" level={4}>{get(clinicAbout, 'counseling_title')}</Title>
                <div className="content-body">
                  <div id="counseling" dangerouslySetInnerHTML={{ __html: `${get(clinicAbout, 'counseling', '')}`}}/>
                </div>
              </Col>
            </Row>
            <Divider dashed={true}/>
            <Row gutter={[16, 16]} style={{marginTop: '30px'}}>
              <Col flex="220px" style={{textAlign: 'center'}}>
                <img src={`${Configs.API_HOST}${get(clinicAbout, 'education_image')}`} style={{width: '100%', maxWidth: '130px'}}/>
              </Col>
              <Col flex="auto">
                <Title className="content-title" level={4}>{get(clinicAbout, 'education_title')}</Title>
                <div className="content-body">
                  <div id="education" dangerouslySetInnerHTML={{ __html: `${get(clinicAbout, 'education', '')}`}}/>
                </div>
              </Col>
            </Row>
            <Divider dashed={true}/>
            <Row gutter={[16, 16]} style={{marginTop: '30px'}}>
              <Col flex="220px" style={{textAlign: 'center'}}>
                <img src={`${Configs.API_HOST}${get(clinicAbout, 'activity_image')}`} style={{width: '100%', maxWidth: '130px'}}/>
              </Col>
              <Col flex="auto">
                <Title className="content-title" level={4}>{get(clinicAbout, 'activity_title')}</Title>
                <div className="content-body">
                  <div id="page-activity" dangerouslySetInnerHTML={{ __html: `${get(clinicAbout, 'activity', '')}`}}/>
                </div>
              </Col>
            </Row>
          </div>
        </TabPane>
        <TabPane key="purpose" tab="연혁">
          <div className="tabs-content" id="purpose">
            <HistoryWrapper>
              <Spin tip="로딩중..." spinning={loadingHistories}>
                {map(dataHistories, (yearData, index) =>
                  <>
                    <Title className={`year row${index%3}`}>{get(yearData, 'year')}</Title>
                    <Timeline mode="alternate">
                      {map(get(yearData, 'children', []), v =>
                        <Timeline.Item>
                          <div className='memo-wrapper'>{get(v, 'memo')}</div>
                        </Timeline.Item>
                      )}
                    </Timeline>
                  </>
                )}
              </Spin>
            </HistoryWrapper>
          </div>
        </TabPane>
      </Tabs>
      <BackTop></BackTop>
    </AffiliateAboutWrapper>
  );
}

export default About;
