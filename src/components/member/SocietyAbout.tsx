import 'animate.css/animate.min.css';
import {List, Typography, Button, Spin} from 'antd';
import {ExpandAltOutlined} from '@ant-design/icons';
import {get, map, filter} from 'lodash';
import React, {useState} from 'react';
import {getSocietyAbouts} from 'libs/api/information';
import {useDataApi} from 'libs/hooks';
import {TSocietyAboutDetail} from 'modules/information';
import {TListResponse} from 'modules/types';
import styled from 'styled-components';
import {PrimaryColor} from 'GlobalStyles';
import Configs from 'config';

const {Title, Text} = Typography;
const SocietyAboutWrapper = styled.div`
  .row0 {
    color: ${PrimaryColor};
  }
  .row1 {
    color: #ffe58f;
  }
  .row2 {
    color: #0dbeb5;
  }
  .default-content {
    background-color: #fafafa;
    border: 1px solid #e6e6e6;
    border-radius: 10px;
    padding: 30px 50px;
    margin: 20px 0px;
    animation: fadeIn 1.5s;
  }
`;
const SocietyAbout = () => {
  const [{data, loading}] = useDataApi<TListResponse<TSocietyAboutDetail>>(getSocietyAbouts, {
    contents: [],
    last: false,
  });

  const [detailsIndex, setDetailsIndex] = useState(0);

  function showDetails(param :number) {
    setDetailsIndex(param);
  }

  return (
    <SocietyAboutWrapper>
      <Spin tip="로딩중..." spinning={loading}>
        <List
          itemLayout='horizontal'
          dataSource={get(data, 'contents', [])}
          renderItem={(item, index) => (
            <>
              {get(item, 'id') == detailsIndex ? (
                <div className="default-content">
                  <Title level={2}><Text className={`row${index%3}`}>{get(item, 'name')}</Text></Title>

                  {get(item, 'absolute_url') && (
                    <img
                      style={{display: 'block', marginBottom: '10px', maxWidth: '600px', width: '100%', height: 'auto'}}
                      src={`${Configs.API_HOST}${get(item, 'absolute_url')}`}
                    />
                  )}
                  <span style={{whiteSpace: 'pre-wrap'}}>{get(item, 'description')}<br/><br/></span>
                  {get(item, 'main_activity', []).length > 0 && (
                    <>
                      <Title level={4}><Text>주요활동</Text></Title>
                      <ul>
                        {map(
                          get(item, 'main_activity', []),
                          activity => <li>{activity}</li>
                        )}
                      </ul>
                    </>
                  )}
                  {get(item, 'schedule', []).length > 0 && (
                    <>
                      <Title level={4}><Text>정기모임</Text></Title>
                      <ul>
                        {map(
                          get(item, 'schedule', []),
                          schedule => <li>{schedule}</li>
                        )}
                      </ul>
                    </>
                  )}
                  {get(item, 'website') &&
                    <div style={{marginTop: '10px'}}>
                      <Button type="primary" href={get(item, 'website')}>홈페이지 바로가기</Button>
                    </div>
                  }
                </div>
              ) : (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <a onClick={(e) => {showDetails(get(item, 'id'))}}>
                        <Title level={4} className={`row${index%3}`}>
                          {get(item, 'name')}
                          <Text><ExpandAltOutlined style={{marginLeft: '20px', float: 'right'}}/></Text>
                        </Title>
                      </a>
                    }
                    description={<div style={{margin: '10px', whiteSpace: 'pre-wrap'}}>{get(item, 'description')}</div>}
                  />
                </List.Item>
              )}
            </>
          )}
        />
      </Spin>
    </SocietyAboutWrapper>
  );
};

SocietyAbout.defaultProps = {};

export default SocietyAbout;
