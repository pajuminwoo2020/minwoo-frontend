import {List, Typography, Button, Spin} from 'antd';
import {get, map, filter} from 'lodash';
import React, {useState} from 'react';
import {getSocietyAbouts} from 'libs/api/information';
import {useDataApi} from 'libs/hooks';
import {TSocietyAboutDetail} from 'modules/information';
import {TListResponse} from 'modules/types';
import styled from 'styled-components';
import {PrimaryColor} from 'GlobalStyles';

const {Title, Text} = Typography;
const SocietyAboutWrapper = styled.div`
  .red {
    color: ${PrimaryColor};
  }
  .blue {
    color: #0dbeb5;
  }
  .default-content {
    background-color: #fafafa;
    border: 1px solid #e6e6e6;
    border-radius: 10px;
    padding: 30px 50px;
    margin: 20px 0px;
  }
`;
const SocietyAbout = () => {
  const [{data, loading}] = useDataApi<TListResponse<TSocietyAboutDetail>>(getSocietyAbouts, {
    contents: [],
    last: false,
  });

  const [detailsIndex, setDetailsIndex] = useState(1);

  function showDetails(param :number) {
    setDetailsIndex(param);
  }

  return (
    <SocietyAboutWrapper>
      <Spin tip="로딩중..." spinning={loading}>
        {map(
          filter(get(data, 'contents', []), v => get(v, 'id') == detailsIndex),
          item => (
            <div className="default-content">
              <Title level={2}><Text className="blue">{get(item, 'name')}</Text></Title>
              {get(item, 'description')}
              <Title level={4}><Text>주요활동</Text></Title>
              <ul>
                {map(
                  get(item, 'main_activity', []),
                  activity => <li>{activity}</li>
                )}
              </ul>
              <Title level={4}><Text>정기모임</Text></Title>
              <ul>
                {map(
                  get(item, 'schedule', []),
                  schedule => <li>{schedule}</li>
                )}
              </ul>
              {get(item, 'website') &&
                <div style={{marginTop: '10px'}}>
                  <Button type="primary" href={get(item, 'website')}>홈페이지 바로가기</Button>
                </div>
              }
            </div>
          )
        )}
        <List
          itemLayout='horizontal'
          dataSource={filter(get(data, 'contents', []), v => get(v, 'id') != detailsIndex)}
          renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={<a onClick={(e) => {showDetails(get(item,'id'))}}><Title level={4} className="red">{get(item, 'name')}</Title></a>}
              description={
                <div style={{margin: '10px'}}>
                  {get(item, 'description')}
                  {get(item, 'website') &&
                    <div style={{marginTop: '10px'}}>
                      <Button href={get(item, 'website')}>홈페이지 바로가기</Button>
                    </div>
                  }
                </div>
              }
            />
          </List.Item>
          )}
        />
      </Spin>
    </SocietyAboutWrapper>
  );
};

SocietyAbout.defaultProps = {};

export default SocietyAbout;
