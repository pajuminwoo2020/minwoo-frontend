import {CheckOutlined, PlusOutlined} from '@ant-design/icons/lib';
import {Button, Table, Typography} from 'antd';
import {useRouteMatch, Link} from 'react-router-dom';
import {ColumnsType} from 'antd/es/table';
import {get} from 'lodash';
import React, {useEffect, useState} from 'react';
import {TableWrapper, TableHeaderWrapper} from 'GlobalStyles';
import {FormattedDate} from 'react-intl';
import {getBoardAll} from 'libs/api/board';
import {useDataApi, usePagination} from 'libs/hooks';
import {TBoardDetail, TCategory} from 'modules/board';
import {EBoardOperation, EBoardClassType} from 'enums/board.enum';
import {ERoute} from 'enums/route.enum';
import {TListResponse, TPagination, RouteMatch} from 'modules/types';
import {TUser} from 'modules/user';
import SearchInput from 'components/base/SearchInput';
import BoardDetail from 'components/base/BoardDetail';
import {usePermission} from 'libs/hooks';

function get_board_meta(board_type: EBoardClassType | undefined) {
  switch (board_type) {
    case EBoardClassType.Action:
      return ['민우액션', ERoute.ActivityAction];
    case EBoardClassType.NewsLetter:
      return ['소식지', ERoute.BulletinNewsletter];
    case EBoardClassType.ActivityMember:
      return ['회원활동', ERoute.ActivityMember];
    case EBoardClassType.Notice:
      return ['공지사항', ERoute.ActivityNotice];
    case EBoardClassType.AffiliateActivity:
      return ['반성폭력활동', ERoute.AffiliateActivity];
    case EBoardClassType.Press:
      return ['지역소식', ERoute.ActivityPress];
    case EBoardClassType.Settlement:
      return ['결산보고', ERoute.IntroSettlement];
    case EBoardClassType.Drive:
      return ['자료실', ERoute.BulletinDrive];
    case EBoardClassType.SocietyActivity:
      return ['소모임활동', ERoute.MemberSocietyActivity];
    case EBoardClassType.Gallery:
      return ['갤러리', ERoute.BulletinGallery];
    default:
      return ['', ''];
  }
}

const SearchGlobal = () => {
  const [pagination, setPagination] = usePagination();
  const {boardManagementPermission} = usePermission();
  const reloadPage = (page?: Partial<TPagination>) => {
    setPagination({
      ...pagination,
      ...page,
    });
  };
  const getPromise = getBoardAll.bind(null, {
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
      title: '게시판',
      dataIndex: 'board_type',
      className: 'column-category',
      render: (board_type: EBoardClassType) => (
        <span>{get_board_meta(board_type)[0]}</span>
      )
    },
    {
      title: '제목',
      dataIndex: 'title',
      className: 'column-title',
      render: (_: any, record: TBoardDetail) => (
        <Link to={`${get_board_meta(get(record, 'board_type'))[1]}/${EBoardOperation.View}/${record.id}`}>
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

SearchGlobal.defaultProps = {};

export default SearchGlobal;
