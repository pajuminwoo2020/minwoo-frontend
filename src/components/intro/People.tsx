import React, {useState, useEffect} from 'react';
import {Row, Col, Divider, List, Typography, Spin} from 'antd';
import {useDataApi} from 'libs/hooks';
import {get, map} from 'lodash';
import GlobalStyles, {PrimaryColor} from 'GlobalStyles'
import styled from 'styled-components';
import Red from 'assets/Ellipse-red.png'
import {TPeople} from 'modules/information';
import {getPeople} from 'libs/api/information';

const PeopleWrapper = styled.div`
  margin-top: 30px;
  width: 100%;

  .circle {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    text-align: center;
    line-height: 120px;
    font-weight: bold;
    font-size: 18px;
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
        {map(data, (positionData, index) =>
          <Row align="middle" gutter={[32, 32]}>
            <Col flex="130px">
              <div className={`circle row${index%3}`}>{get(positionData, 'position')}</div>
            </Col>
            <Col flex="auto">
              {map(get(positionData, 'children', []), v =>
              <p className="person">
                <div style={{width: '85px', display: 'inline-block'}}>{`${get(v, 'name')}`}</div><span>|&nbsp;&nbsp;&nbsp;{`${get(v, 'job')}`}</span>
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
