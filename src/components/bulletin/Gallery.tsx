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
import {usePermission} from 'libs/hooks';

const {Meta} = Card;
const GalleryWrapper = styled(Link)`
  max-width: 200px;
  margin: 0px auto;
  overflow: hidden;
  display: block;
  position: relative;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  img {
    height: 180px;
    width: 100%;
    max-width: 200px;
  }

  .title {
    font-weight: bold;
    font-size: 13px;
  }

  p {
    margin: 5px;
    font-size: 12px;
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
  const {boardManagementPermission} = usePermission();
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
        {boardManagementPermission &&
          <Link to={`${ERoute.BulletinGallery}/${EBoardOperation.Create}`}>
            <Button
              className="add-button"
              type="primary"
              size="large"
              icon={<PlusOutlined/>}
            >
              사진올리기
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
        grid={{gutter: 16, xs: 2, sm: 3, md: 5, lg: 5, xl: 5, xxl: 5}}
        dataSource={get(data, 'contents')}
        renderItem={item => (
          <List.Item>
            <GalleryWrapper to={`${ERoute.BulletinGallery}/${EBoardOperation.View}/${get(item, 'id')}`}>
              <img alt={"Gallery"} src={getImageSource(item)}/>
              <div>
                <p className="title">{get(item, 'title')}</p>
                <p>
                  <FormattedDate
                  value={get(item, 'created_at')}
                  year="numeric"
                  month="long"
                  day="2-digit"
                />
                </p>
              </div>
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
