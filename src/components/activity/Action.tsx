import {CheckOutlined, PlusOutlined, EyeOutlined} from '@ant-design/icons/lib';
import {Button, List, Typography, Card, Row, Col} from 'antd';
import {useRouteMatch, Link} from 'react-router-dom';
import {ColumnsType} from 'antd/es/table';
import {get} from 'lodash';
import React, {useEffect, useState} from 'react';
import {TableHeaderWrapper, CardWrapper} from 'GlobalStyles';
import {FormattedDate} from 'react-intl';
import Configs from 'config';
import {
  getBoardActions,
  getBoardAction,
  createBoardAction,
  deleteBoardAction,
  updateBoardAction,
} from 'libs/api/board';
import {useDataApi, usePagination} from 'libs/hooks';
import {TBoardDetail} from 'modules/board';
import {EBoardOperation, EBoardType} from 'enums/board.enum';
import {ERoute} from 'enums/route.enum';
import {TListResponse, TPagination, RouteMatch, TSelectList} from 'modules/types';
import {TUser} from 'modules/user';
import SearchInput from 'components/base/SearchInput';
import Category from 'components/base/Category';
import BoardDetail, {getImageSource} from 'components/base/BoardDetail';
import {getCategoriesSelect} from 'libs/api/board';
import {usePermission} from 'libs/hooks';

const {Meta} = Card;
const Action = () => {
  const [pagination, setPagination] = usePagination();
  const {boardManagementPermission} = usePermission();
  const reloadPage = (page?: Partial<TPagination>) => {
    setPagination({
      ...pagination,
      ...page,
    });
  };
  const getPromise = getBoardActions.bind(null, {
    params: {
      current: pagination.current,
      pageSize: pagination.pageSize,
      category: pagination.category,
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
        <Category pagination={pagination} reloadPage={reloadPage} boardType={EBoardType.Action}/>
        <SearchInput pagination={pagination} reloadPage={reloadPage}/>
        {boardManagementPermission &&
          <Link to={`${ERoute.ActivityAction}/${EBoardOperation.Create}`}>
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
        grid={{gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 4}}
        dataSource={get(data, 'contents')}
        renderItem={item => (
          <List.Item>
            <CardWrapper to={`${ERoute.ActivityAction}/${EBoardOperation.View}/${get(item, 'id')}`}>
              <Card hoverable cover={<img alt={"Action"} src={getImageSource(item)}/>}>
                <Meta
                  title={
                    <>
                    <div className="title-category">{`${get(item, 'id')} | ${get(item, 'category.name')}`}</div>
                    <div>{get(item, 'title')}</div>
                    </>
                  }
                  description={
                    <>
                      <FormattedDate
                        value={get(item, 'created_at')}
                        year="numeric"
                        month="long"
                        day="2-digit"
                      />
                      <Row justify="space-between">
                        <Col>{get(item, 'created_by.fullname')} </Col>
                        <Col><EyeOutlined/>&nbsp;{get(item, 'hit_count')}</Col>
                      </Row>
                    </>
                  }
                />
              </Card>
            </CardWrapper>
          </List.Item>
        )}
      />
    </>
  );
};

export const ActionDetail = () => {
  const match = useRouteMatch(`${ERoute.ActivityAction}/:operation/:record_id?`);
  let {operation=EBoardOperation.View, record_id} = (match?.params as RouteMatch) || {};
  const [{data, loading}] = useDataApi<TBoardDetail>(getBoardAction.bind(null, record_id), {}, operation != EBoardOperation.Create);
  const [{data: categories, loading: categoriesLoading}] = useDataApi<TSelectList>(getCategoriesSelect.bind(null, EBoardType.Action), []);

  return (
	<BoardDetail
	  operation={operation}
	  pathName={ERoute.ActivityAction}
	  promiseCreate={createBoardAction}
	  promiseDelete={deleteBoardAction}
      promiseUpdate={updateBoardAction}
      categories={categories}
      hasThumbnail={true}
	  record={data}
      loading={loading}
	/>
  );
};

Action.defaultProps = {};

export default Action;
