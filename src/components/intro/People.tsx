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
            <img
              alt='image'
              style={{height: 'auto', width: '100%', maxWidth: '650px'}}
              src={`${Configs.API_HOST}${get(data, 'absolute_url')}`}
            />
          )}
        </div>
      </Spin>
    </PeopleWrapper>
  );
}

export default People;
