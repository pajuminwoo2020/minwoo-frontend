import React, {useState} from 'react';
import {Tabs, Timeline, Row, Col, Typography, Divider, BackTop} from 'antd';
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
import DotImage from 'assets/dot.png';
import {get, map} from 'lodash';
import {getClinicAbout} from 'libs/api/information';
import {useDataApi} from 'libs/hooks';
import {TInformationHistory, TClinicAbout} from 'modules/information/types'
import {PrimaryColor} from 'GlobalStyles';
import {HistoryWrapper} from 'components/base/styles';

const {TabPane} = Tabs;
const {Title, Text, Paragraph} = Typography;
const AffiliateAboutWrapper = styled.div`
  text-align: justify;

  .tabs-content {
    padding: 40px;
  }
  .list-image {
    text-align: center;
  }
  .block-title {
    margin: 50px 0px 30px 0px;
  }
  .box-with-border{
    max-width: 400px;
    border-radius: 15px;
    border: 3px solid #0dbeb5;
    color: #0dbeb5;
    font-size: 14px;
    text-align: center;
    padding: 10px 20px;

    p {
      margin-bottom: 0px;
    }
  }
  .box-paragraph {
    padding-left: 20px;
  }
  .content-title {
    font-size: 30px;
    text-align: center;
    margin: 30px;
  }
`;
const About = () => {
  const information = useSelector((state: RootState) => state.information.info, shallowEqual);
  const [{data: clinicAbout}] = useDataApi<TClinicAbout>(getClinicAbout.bind(null));

  function handleTabClick(key: string) {
    const elem = document.getElementById(key);
    elem?.scrollIntoView({behavior: 'smooth'});
  }

  return (
    <AffiliateAboutWrapper>
      <Tabs activeKey="purpose" onTabClick={handleTabClick}>
        <TabPane key="purpose" tab="상담"></TabPane>
        <TabPane key="history" tab="교육"></TabPane>
        <TabPane key="activity" tab="성폭력 예방활동"></TabPane>
      </Tabs>
      <div className="tabs-content" id="purpose">
        <Title className="content-title">상담</Title>
        <Row justify="center" gutter={[32, 16]}>
          <Col xs={24} sm={24} md={14} lg={14} xl={14}>
            <div style={{margin: 'auto'}}>
              <div dangerouslySetInnerHTML={{ __html: `${get(clinicAbout, 'purpose', '')}`}}/>
            </div>
          </Col>
          <Col xs={24} sm={24} md={10} lg={10} xl={10}>
            <img src={Image1} style={{width: '100%', height: 'auto'}}/>
          </Col>
        </Row>
        <Title className="block-title" level={3}>&#9673;&nbsp;성폭력 없는 세상</Title>
        <Row gutter={[16, 16]} align="middle" justify="center" className="list-image">
          <Col xs={24} sm={24} md={24} lg={6} xl={6}>
            <img src={Image2_1} style={{width: 'auto', height: '200px'}}/>
          </Col>
          <Col xs={24} sm={24} md={24} lg={2} xl={2}>
            <img src={Image_plus} style={{width: '50px', height: '50px'}}/>
          </Col>
          <Col xs={24} sm={24} md={24} lg={6} xl={6}>
            <img src={Image2_2} style={{width: 'auto', height: '200px'}}/>
          </Col>
          <Col xs={24} sm={24} md={24} lg={2} xl={2}>
            <img src={Image_plus} style={{width: '50px', height: '50px'}}/>
          </Col>
          <Col xs={24} sm={24} md={24} lg={6} xl={6}>
            <img src={Image2_3} style={{width: 'auto', height: '200px'}}/>
          </Col>
        </Row>
        <Title className="block-title" level={3}>&#9673;&nbsp;상담소와 쉼터</Title>
        <Row>
          <Col offset={1}>
            <div className="box-with-border">
              <p>파주여성민우회</p>
              <p>성폭력상담소 ∙ 피해자보호시설 하담데이트 성폭력</p>
            </div>
            <div style={{marginTop: '20px'}}>
              <p style={{marginBottom: '5px'}}><strong>상담전화</strong>&nbsp;&nbsp;{get(information, 'phone_counseling')}</p>
              <p><strong>웹사이트</strong>&nbsp;&nbsp;<a href={get(information, 'webhost_counseling')}>{get(information, 'webhost_counseling')}</a></p>
            </div>
          </Col>
        </Row>
      </div>
      <div className="tabs-content" id="history">
        <Divider/>
        <Title className="content-title">교육</Title>
        교육
      </div>
      <div className="tabs-content" id="activity">
        <Divider/>
        <Title className="content-title">성폭력 예방활동</Title>
        <Row justify="center" style={{marginBottom: '40px'}}>
          <img src={Image3_title} style={{width: 'auto', height: '80px'}}/>
        </Row>
        <Row gutter={[16, 16]} justify="center" className="list-image" style={{marginBottom: '40px'}}>
          <Col xs={24} sm={24} md={24} lg={5} xl={5}>
            <img src={Image3_1} style={{width: 'auto', height: '130px'}}/>
          </Col>
          <Col xs={24} sm={24} md={24} lg={2} xl={2}>
            <img src={Image_plus} style={{width: '40px', height: '40px', margin: '20px 0px'}}/>
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={8}>
            <img src={Image3_2} style={{width: 'auto', height: '90px'}}/>
          </Col>
          <Col xs={24} sm={24} md={24} lg={2} xl={2}>
            <img src={Image_plus} style={{width: '40px', height: '40px', margin: '20px 0px'}}/>
          </Col>
          <Col xs={24} sm={24} md={24} lg={5} xl={5}>
            <img src={Image3_3} style={{width: 'auto', height: '90px'}}/>
          </Col>
        </Row>
        <div dangerouslySetInnerHTML={{ __html: `${get(clinicAbout, 'activity', '')}`}}/>
      </div>
      <BackTop></BackTop>
    </AffiliateAboutWrapper>
  );
}

export default About;
