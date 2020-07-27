import {CheckOutlined, PlusOutlined} from '@ant-design/icons/lib';
import {Button, Table, Typography} from 'antd';
import {useRouteMatch, Link} from 'react-router-dom';
import {ColumnsType} from 'antd/es/table';
import {get} from 'lodash';
import React, {useEffect, useState} from 'react';
import {TableWrapper, TableHeaderWrapper} from 'GlobalStyles';
import {FormattedDate} from 'react-intl';
import {
  getBoardAffiliateActivities,
  getBoardAffiliateActivity,
  createBoardAffiliateActivity,
  deleteBoardAffiliateActivity,
  updateBoardAffiliateActivity,
} from 'libs/api/board';
import {useDataApi, usePagination} from 'libs/hooks';
import {TBoardDetail} from 'modules/board';
import {EBoardOperation} from 'enums/board.enum';
import {ERoute} from 'enums/route.enum';
import {TListResponse, TPagination, RouteMatch} from 'modules/types';
import {TUser} from 'modules/user';
import SearchInput from 'components/base/SearchInput';
import BoardDetail from 'components/base/BoardDetail';
import {usePermission} from 'libs/hooks';

const AffiliateActivity = () => {
  const [pagination, setPagination] = usePagination();
  const {boardManagementPermission} = usePermission();
  const reloadPage = (page?: Partial<TPagination>) => {
    setPagination({
      ...pagination,
      ...page,
    });
  };
  const getPromise = getBoardAffiliateActivities.bind(null, {
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

  const columns: ColumnsType<TBoardDetail> = [
    {
      title: '번호',
      dataIndex: 'id',
      className: 'column-id',
    },
    {
      title: '제목',
      dataIndex: 'title',
      className: 'column-title',
      render: (_: any, record: TBoardDetail) => (
        <Link to={`${ERoute.AffiliateActivity}/${EBoardOperation.View}/${record.id}`}>
          {record.title}
        </Link>
      )
    },
    {
      title: '작성자',
      dataIndex: 'created_by',
      key: 'fullname',
      className: 'column-created-by',
      render: (created_by: TUser) => <>{created_by.fullname}</>,
    },
    {
      title: '작성일',
      dataIndex: 'created_at',
      className: 'column-created-at',
      render: (created_at: string) => {
        return (
          <>
            <FormattedDate
              value={created_at}
              year="numeric"
              month="long"
              day="2-digit"
            />
          </>
        );
      },
    },
    {
      title: '조회수',
      dataIndex: 'hit_count',
      className: 'column-hit-count',
    },
  ];

  return (
    <>
      <TableHeaderWrapper>
        <SearchInput pagination={pagination} reloadPage={reloadPage}/>
        {boardManagementPermission &&
          <Link to={`${ERoute.AffiliateActivity}/${EBoardOperation.Create}`}>
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
      <TableWrapper>
        <Table
          tableLayout={'fixed'}
          rowKey="id"
          loading={loading}
          columns={columns}
          pagination={{...pagination, total: get(data, 'total', 0)}}
          size="small"
          dataSource={get(data, 'contents')}
          onChange={(page, filters, sorter, extra) => {reloadPage(page);}}
        />
      </TableWrapper>
    </>
  );
};

export const AffiliateActivityDetail = () => {
  const match = useRouteMatch(`${ERoute.AffiliateActivity}/:operation/:record_id?`);
  let {operation=EBoardOperation.View, record_id} = (match?.params as RouteMatch) || {};
  const [{data, loading}] = useDataApi<TBoardDetail>(getBoardAffiliateActivity.bind(null, record_id), {}, operation != EBoardOperation.Create);

  return (
	<BoardDetail
	  operation={operation}
	  pathName={ERoute.AffiliateActivity}
	  promiseCreate={createBoardAffiliateActivity}
	  promiseDelete={deleteBoardAffiliateActivity}
	  promiseUpdate={updateBoardAffiliateActivity}
	  record={data}
	/>
  );
};

AffiliateActivity.defaultProps = {};

export default AffiliateActivity;
