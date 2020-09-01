import React, {useState, useEffect} from 'react';
import {Row, Col, Divider, List, Typography, Spin, Skeleton} from 'antd';
import {useDataApi} from 'libs/hooks';
import {get, map} from 'lodash';
import GlobalStyles, {PrimaryColor} from 'GlobalStyles'
import styled from 'styled-components';
import Red from 'assets/Ellipse-red.png'
import Configs from 'config';
import {TPeople} from 'modules/information';
import {getPeople} from 'libs/api/information';

const {Title, Text} = Typography;
const PeopleWrapper = styled.div`
  margin-top: 30px;
  width: 100%;

  .circle {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    text-align: center;
    line-height: 17px;
    font-weight: bold;
    font-size: 15px;
    margin: auto;
  }
  .circle {
    border: 5px solid ${PrimaryColor};
    color: ${PrimaryColor};
  }
  .circle.row1 {
    border: 5px solid #ffe58f;
    color: #ffe58f;
  }
  .circle.row2 {
    border: 5px solid #0dbeb5;
    color: #0dbeb5;
  }
  .person {
    margin-bottom: 4px;
    margin-left: 5px;
  }
`;
const People = () => {
  const [{data, loading}] = useDataApi<TPeople>(getPeople.bind(null));

  return (
    <PeopleWrapper>
      <Spin tip="로딩중..." spinning={loading}>
        <div style={{textAlign: 'center'}}>
          {loading === true ? (
            <Skeleton active title={false} paragraph={{rows: 10}}/>
          ) : (
            <img style={{height: 'auto', width: '100%', maxWidth: '650px'}} src={`${Configs.API_HOST}${get(data, 'absolute_url')}`}/>
          )}
        </div>
        <Title level={3}><Text>함께하는 사람들</Text></Title>
        <Divider/>
        {map(get(data, 'contents', []), (positionData, index) =>
          <Row align="middle" gutter={[32, 32]}>
            <Col flex="130px">
              <div className={`circle row${index%3}`}>
                <div style={{top: '50%', display: 'inline-block', width: '60%', transform: 'translate(-50%, -50%)', position: 'absolute'}}>
                  {get(positionData, 'position')}
                </div>
              </div>
            </Col>
            <Col flex="auto">
              {map(get(positionData, 'children', []), (v, idx) =>
                <p className="person">
                  <div style={{display: 'inline-block'}}>{`${get(v, 'name')}`}</div>
                  {get(v, 'job') && <>
                    <span style={{margin: '0px 10px'}}>|</span><span>{`${get(v, 'job')}`}</span>
                  </>}
                </p>
              )}
            </Col>
          </Row>
        )}
      </Spin>
    </PeopleWrapper>
  );
}

export default People;
