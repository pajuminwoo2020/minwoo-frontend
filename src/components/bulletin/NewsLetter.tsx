import {CheckOutlined, PlusOutlined, EyeOutlined} from '@ant-design/icons/lib';
import {Button, List, Typography, Card, Row, Col} from 'antd';
import {useRouteMatch, Link} from 'react-router-dom';
import {ColumnsType} from 'antd/es/table';
import {get} from 'lodash';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {TableHeaderWrapper} from 'GlobalStyles';
import {FormattedDate} from 'react-intl';
import Configs from 'config';
import {
  getBoardNewsLetters,
  getBoardNewsLetter,
  createBoardNewsLetter,
  deleteBoardNewsLetter,
  updateBoardNewsLetter,
} from 'libs/api/board';
import {useDataApi, usePagination} from 'libs/hooks';
import {TBoardDetail} from 'modules/board';
import {EBoardOperation} from 'enums/board.enum';
import {ERoute} from 'enums/route.enum';
import {TListResponse, TPagination, RouteMatch} from 'modules/types';
import {TUser} from 'modules/user';
import SearchInput from 'components/base/SearchInput';
import BoardDetail, {getImageSource} from 'components/base/BoardDetail';
import {usePermission} from 'libs/hooks';

const {Meta} = Card;
const NewsLetterWrapper = styled(Link)`
  width: 100%;
  overflow: hidden;
  display: block;
  position: relative;

  .ant-card-cover > * {
    position: absolute;
    width: 100%;
  }

  .ant-card-cover img {
    height: 100%;
  }

  .ant-card {
    max-width: 300px;
    width: 100%;
    height: 350px;
    overflow: hidden;
    margin: 0px auto;
  }

  .ant-card-body {
    position: absolute;
    background-color: #fff;
    width: 100%;
    bottom: 10%;
    opacity: 0.6;
  }

  .ant-card-body:hover {
    opacity: 1;
  }

  .ant-card-meta-title {
    font-weight: bold;
    height: 40px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-box-pack: center;
    -webkit-line-clamp: 2;
    word-break: break-word;
    white-space: normal;
    line-height: 22px;
    overflow: hidden;
  }
`;

const NewsLetter = () => {
  const [pagination, setPagination] = usePagination();
  const {boardManagementPermission} = usePermission();
  const reloadPage = (page?: Partial<TPagination>) => {
    setPagination({
      ...pagination,
      ...page,
    });
  };
  const getPromise = getBoardNewsLetters.bind(null, {
    params: {
      current: pagination.current,
      pageSize: pagination.pageSize,
      q: pagination.q,
    },
  });
  const [{data, loading}, setCallback] = useDataApi<TListResponse<TBoardDetail>>(getPromise, {
    contents: [],
    last: false,
  });

  useEffect(() => {
    setCallback(() => getPromise);
  }, [pagination]);

  return (
    <>
      <TableHeaderWrapper>
        <SearchInput pagination={pagination} reloadPage={reloadPage}/>
        {boardManagementPermission &&
          <Link to={`${ERoute.BulletinNewsletter}/${EBoardOperation.Create}`}>
            <Button
              className="add-button"
              type="primary"
              size="large"
              icon={<PlusOutlined/>}
            >
              글쓰기
            </Button>
          </Link>
        }
      </TableHeaderWrapper>
      <List
        pagination={{
          ...pagination,
          total: get(data, 'total', 0),
          position: 'bottom',
          onChange: (page) => {
            reloadPage({
              current: page,
              pageSize: get(data, 'pageSize'),
            });
          }
        }}
        loading={loading}
        style={{paddingBottom: '20px'}}
        grid={{gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4}}
        dataSource={get(data, 'contents')}
        renderItem={item => (
          <List.Item>
            <NewsLetterWrapper to={`${ERoute.BulletinNewsletter}/${EBoardOperation.View}/${get(item, 'id')}`}>
              <Card hoverable cover={<img alt={"NewsLetter"} src={getImageSource(item)}/>}>
                <Meta title={get(item, 'title')} description={
                  <Row justify="space-between">
                    <Col>
                      <FormattedDate
                        value={get(item, 'created_at')}
                        year="numeric"
                        month="long"
                        day="2-digit"
                      />
                    </Col>
                    <Col><EyeOutlined/>&nbsp;{get(item, 'hit_count')}</Col>
                  </Row>
                }/>
              </Card>
            </NewsLetterWrapper>
          </List.Item>
        )}
      />
    </>
  );
};

export const NewsLetterDetail = () => {
  const match = useRouteMatch(`${ERoute.BulletinNewsletter}/:operation/:record_id?`);
  let {operation=EBoardOperation.View, record_id} = (match?.params as RouteMatch) || {};
  const [{data, loading}] = useDataApi<TBoardDetail>(getBoardNewsLetter.bind(null, record_id), {}, operation != EBoardOperation.Create);

  return (
	<BoardDetail
	  operation={operation}
	  pathName={ERoute.BulletinNewsletter}
	  promiseCreate={createBoardNewsLetter}
	  promiseDelete={deleteBoardNewsLetter}
      promiseUpdate={updateBoardNewsLetter}
      hasThumbnail={true}
	  record={data}
	/>
  );
};

NewsLetter.defaultProps = {};

export default NewsLetter;
