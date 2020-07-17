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
  getBoardGallerys,
  getBoardGallery,
  createBoardGallery,
  deleteBoardGallery,
  updateBoardGallery,
} from 'libs/api/board';
import {useDataApi, usePagination} from 'libs/hooks';
import {TBoardDetail} from 'modules/board';
import {EBoardOperation} from 'enums/board.enum';
import {ERoute} from 'enums/route.enum';
import {TListResponse, TPagination, RouteMatch} from 'modules/types';
import {TUser} from 'modules/user';
import SearchInput from 'components/base/SearchInput';
import BoardDetail, {getImageSource} from 'components/base/BoardDetail';

const {Meta} = Card;
const GalleryWrapper = styled(Link)`
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
    height: 300px;
    overflow: hidden;
  }

  .ant-card-body {
    position: absolute;
    background-color: #fff;
    width: 100%;
    bottom: 0;
  }

  .ant-card-body:hover {
    opacity: 1;
  }

  .ant-card-meta-title {
    font-weight: bold;
    font-size: 14px;
    height: 30px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-box-pack: center;
    -webkit-line-clamp: 2;
    word-break: break-word;
    white-space: normal;
    line-height: 16px;
    overflow: hidden;
  }
`;
const Gallery = () => {
  const [pagination, setPagination] = usePagination();
  const reloadPage = (page?: Partial<TPagination>) => {
    setPagination({
      ...pagination,
      ...page,
    });
  };
  const getPromise = getBoardGallerys.bind(null, {
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
        <Link to={`${ERoute.BulletinGallery}/${EBoardOperation.Create}`}>
          <Button
            className="add-button"
            type="primary"
            size="large"
            icon={<PlusOutlined/>}
          >
            글쓰기
          </Button>
        </Link>
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
        style={{paddingBottom: '20px'}}
        grid={{gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 4}}
        dataSource={get(data, 'contents')}
        renderItem={item => (
          <List.Item>
            <GalleryWrapper to={`${ERoute.BulletinGallery}/${EBoardOperation.View}/${get(item, 'id')}`}>
              <Card
                hoverable
                loading={loading}
                cover={<img alt={"Gallery"} src={getImageSource(item)}/>}
              >
                <Meta title={get(item, 'title')} description={
                  <FormattedDate
                    value={get(item, 'created_at')}
                    year="numeric"
                    month="long"
                    day="2-digit"
                  />
                }/>
              </Card>
            </GalleryWrapper>
          </List.Item>
        )}
      />
    </>
  );
};

export const GalleryDetail = () => {
  const match = useRouteMatch(`${ERoute.BulletinGallery}/:operation/:record_id?`);
  let {operation=EBoardOperation.View, record_id} = (match?.params as RouteMatch) || {};
  const [{data, loading}] = useDataApi<TBoardDetail>(getBoardGallery.bind(null, record_id), {}, operation != EBoardOperation.Create);

  return (
	<BoardDetail
	  operation={operation}
	  pathName={ERoute.BulletinGallery}
	  promiseCreate={createBoardGallery}
	  promiseDelete={deleteBoardGallery}
      promiseUpdate={updateBoardGallery}
      hasThumbnail={true}
	  record={data}
	/>
  );
};

Gallery.defaultProps = {};

export default Gallery;
