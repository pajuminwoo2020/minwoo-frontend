import React, {useState} from 'react';
import {Tabs, Timeline, Row, Col, Typography, Divider, BackTop, Skeleton, Spin} from 'antd';
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
import {getClinicAbout, getAffiliateHistories} from 'libs/api/information';
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
    margin-bottom: 20px;
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
    font-size: 18px;
  }
  .content-title:before {
    content: '\u25c9';
    margin-right: 5px;
  }
  .content-body {
    margin: 10px 0px 30px 0px;
    max-width: 700px;
  }
`;
const About = () => {
  const information = useSelector((state: RootState) => state.information.info, shallowEqual);
  const [{data: clinicAbout, loading}] = useDataApi<TClinicAbout>(getClinicAbout.bind(null));
  const [{data: dataHistories, loading: loadingHistories}] = useDataApi<TInformationHistory>(getAffiliateHistories.bind(null));

  return (
    <AffiliateAboutWrapper>
      <Tabs defaultActiveKey="purpose">
        <TabPane key="purpose" tab="연혁">
          <div className="tabs-content" id="purpose">
            <div style={{maxWidth: '700px', marginBottom: '30px'}}>
              {loading === true ? (
                <Skeleton active title={false} paragraph={{rows: 5}}/>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: `${get(clinicAbout, 'purpose', '')}`}}/>
              )}
            </div>
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
        <TabPane key="activity" tab="활동">
          <div className="tabs-content" id="activity">
            <Title className="content-title" level={4}> 상담</Title>
            <div className="content-body">
              <div className="ant-typography box-paragraph">
              <div className="box-with-border">
                <p>파주여성민우회</p>
                <p>성폭력상담소 ∙ 피해자보호시설 하담데이트 성폭력</p>
              </div>
              <p style={{marginBottom: '5px'}}><strong>상담전화</strong>&nbsp;&nbsp;{get(information, 'phone_counseling')}</p>
              <p><strong>웹사이트</strong>&nbsp;&nbsp;<a href={get(information, 'webhost_counseling')}>{get(information, 'webhost_counseling')}</a></p>
                <div dangerouslySetInnerHTML={{ __html: `${get(clinicAbout, 'counseling', '')}`}}/>
              </div>
            </div>
            <Title className="content-title" level={4}>교육</Title>
            <div className="content-body">
              <div className="ant-typography box-paragraph">
                <div dangerouslySetInnerHTML={{ __html: `${get(clinicAbout, 'education', '')}`}}/>
              </div>
            </div>
            <Title className="content-title" level={4}>폭력예방활동</Title>
            <div className="content-body">
              <div className="ant-typography box-paragraph">
                <div dangerouslySetInnerHTML={{ __html: `${get(clinicAbout, 'activity', '')}`}}/>
              </div>
            </div>
          </div>
        </TabPane>
      </Tabs>
      <BackTop></BackTop>
    </AffiliateAboutWrapper>
  );
}

export default About;
