import {CheckOutlined, PlusOutlined} from '@ant-design/icons/lib';
import {Button, Table, Typography} from 'antd';
import {ColumnsType} from 'antd/es/table';
import {get} from 'lodash';
import React, {useEffect, useState} from 'react';
import {FormattedDate} from 'react-intl';
import {getBoardSettlements} from 'libs/api/intro';
import {useDataApi, usePagination} from 'libs/hooks';
import {TBoardSettlement} from 'modules/intro';
import {TListResponse, TPagination} from 'modules/types';
import {TUser} from 'modules/user';
import SearchInput from 'components/base/SearchInput';
import {TableWrapper, TableHeaderWrapper} from 'GlobalStyles';

const Settlement = () => {
  const [pagination, setPagination] = usePagination();
  const reloadPage = (page?: Partial<TPagination>) => {
    setPagination({
      ...pagination,
      ...page,
    });
  };
  const getPromise = getBoardSettlements.bind(null, {
    params: {
      current: pagination.current,
      pageSize: pagination.pageSize,
      q: pagination.q,
    },
  });
  const [{data, loading}, setCallback] = useDataApi<TListResponse<TBoardSettlement>>(getPromise, {
    contents: [],
    last: false,
  });

  useEffect(() => {
    setCallback(() => getPromise);
  }, [pagination]);

  const columns: ColumnsType<TBoardSettlement> = [
    {
      title: '제목',
      dataIndex: 'title',
      className: 'column-title',
      render: (title: string) => <a href="#">{title}</a>,
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
      <Button className="add-button" type="primary" size="large" icon={<PlusOutlined/>}>글쓰기</Button>
    </TableHeaderWrapper>
    <TableWrapper>
      <Table
        tableLayout={'fixed'}
        rowKey="id"
        loading={loading}
        columns={columns}
        pagination={{
          ...pagination,
          total: get(data, 'total', 0),
        }}
        size="small"
        dataSource={get(data, 'contents')}
        onChange={(page, filters, sorter, extra) => {
          reloadPage(page);
        }}
      />
    </TableWrapper>
    </>
  );
};

Settlement.defaultProps = {};

export default Settlement;
