/*
import React, {useState} from 'react';

const SocietyAbout = () => {
  return (
	<>
	  SocietyAboutSocietyAbout
	</>
  );
}

export default SocietyAbout;
*/
import {CheckOutlined, PlusOutlined} from '@ant-design/icons/lib';
import {List} from 'antd';
import {useRouteMatch} from 'react-router-dom';
import {ColumnsType} from 'antd/es/table';
import {get} from 'lodash';
import React, {useEffect, useState} from 'react';
import {TableWrapper, TableHeaderWrapper} from 'GlobalStyles';
import {FormattedDate} from 'react-intl';
import {
  getSocietyAbouts,
  getSocietyAbout,
  createSocietyAbout,
  deleteSocietyAbout,
  updateSocietyAbout,
} from 'libs/api/society';
import {useDataApi, usePagination} from 'libs/hooks';
import {TSocietyAboutDetail} from 'modules/society';
import {ERoute} from 'enums/route.enum';
import {TListResponse, TPagination, RouteMatch} from 'modules/types';
import {TUser} from 'modules/user';
import SearchInput from 'components/base/SearchInput';
import BoardDetail from 'components/base/BoardDetail';

const SocietyAbout = () => {
  const [pagination, setPagination] = usePagination();
  const reloadPage = (page?: Partial<TPagination>) => {
    setPagination({
      ...pagination,
      ...page,
    });
  };
  const getPromise = getSocietyAbouts.bind(null, {
    params: {
      current: pagination.current,
      pageSize: pagination.pageSize,
      q: pagination.q,
    },
  });
  const [{data, loading}, setCallback] = useDataApi<TListResponse<TSocietyAboutDetail>>(getPromise, {
    contents: [],
    last: false,
  });

  useEffect(() => {
    setCallback(() => getPromise);
  }, [pagination]);

  const columns: ColumnsType<TSocietyAboutDetail> = [
	{
		title: '번호',
		dataIndex: 'id',
		className: 'column-id',
	},
    {
      title: '소모임명',
      dataIndex: 'name',
      className: 'column-name',
      render: (name: string) => (
        <> {name}
        </>
      )
    },
    {
      title: '활동',
      dataIndex: 'activity',
      className: 'column-activity',
      render: (activity: string) => <>{activity}</>,
    },
  ];

  return (
    <>
      <List
		  itemLayout='horizontal'
		  dataSource={get(data, 'contents')}
		  renderItem={item => (
		  <List.Item>
			<List.Item.Meta
			  title={<a href="https://ant.design">{item.name}</a>}
			  description={item.activity}
			/>
		  </List.Item>
		  )}
	  />
    </>
  );
};

SocietyAbout.defaultProps = {};

export default SocietyAbout;
