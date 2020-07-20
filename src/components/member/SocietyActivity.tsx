import {CheckOutlined, PlusOutlined} from '@ant-design/icons/lib';
import {Button, Table, Typography} from 'antd';
import {useRouteMatch, Link} from 'react-router-dom';
import {ColumnsType} from 'antd/es/table';
import {get} from 'lodash';
import React, {useEffect, useState} from 'react';
import {TableWrapper, TableHeaderWrapper} from 'GlobalStyles';
import {FormattedDate} from 'react-intl';
import {
  getBoardSocietyActivitys,
  getBoardSocietyActivity,
  createBoardSocietyActivity,
  deleteBoardSocietyActivity,
  updateBoardSocietyActivity,
} from 'libs/api/board';
import {useDataApi, usePagination} from 'libs/hooks';
import {TBoardDetail, TCategory} from 'modules/board';
import {EBoardOperation, EBoardType} from 'enums/board.enum';
import {ERoute} from 'enums/route.enum';
import {TListResponse, TPagination, RouteMatch, TSelectList} from 'modules/types';
import {TUser} from 'modules/user';
import SearchInput from 'components/base/SearchInput';
import Category from 'components/base/Category';
import BoardDetail from 'components/base/BoardDetail';
import {getCategoriesSelect} from 'libs/api/board';

const SocietyActivity = () => {
  const [pagination, setPagination] = usePagination();
  const reloadPage = (page?: Partial<TPagination>) => {
    setPagination({
      ...pagination,
      ...page,
    });
  };
  const getPromise = getBoardSocietyActivitys.bind(null, {
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

  const columns: ColumnsType<TBoardDetail> = [
    {
      title: '번호',
      dataIndex: 'id',
      className: 'column-id',
    },
    {
      title: '카테고리',
      dataIndex: 'category',
      className: 'column-category',
      render: (category: TCategory) => (
        <span>{get(category, 'name')}</span>
      )
    },
    {
      title: '제목',
      dataIndex: 'title',
      className: 'column-title',
      render: (_: any, record: TBoardDetail) => (
        <Link to={`${ERoute.MemberSocietyActivity}/${EBoardOperation.View}/${record.id}`}>
          {get(record, 'title')}
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
        <Category pagination={pagination} reloadPage={reloadPage} boardType={EBoardType.SocietyActivity}/>
        <SearchInput pagination={pagination} reloadPage={reloadPage}/>
        <Link to={`${ERoute.MemberSocietyActivity}/${EBoardOperation.Create}`}>
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

export const SocietyActivityDetail = () => {
  const match = useRouteMatch(`${ERoute.MemberSocietyActivity}/:operation/:record_id?`);
  let {operation=EBoardOperation.View, record_id} = (match?.params as RouteMatch) || {};
  const [{data, loading}] = useDataApi<TBoardDetail>(getBoardSocietyActivity.bind(null, record_id), {}, operation != EBoardOperation.Create);
  const [{data: categories, loading: categoriesLoading}] = useDataApi<TSelectList>(getCategoriesSelect.bind(null, EBoardType.SocietyActivity), []);

  return (
	<BoardDetail
	  operation={operation}
	  pathName={ERoute.MemberSocietyActivity}
	  promiseCreate={createBoardSocietyActivity}
	  promiseDelete={deleteBoardSocietyActivity}
	  promiseUpdate={updateBoardSocietyActivity}
      categories={categories}
	  record={data}
	/>
  );
};

SocietyActivity.defaultProps = {};

export default SocietyActivity;
