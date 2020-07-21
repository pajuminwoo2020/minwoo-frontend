import {List} from 'antd';
import {ColumnsType} from 'antd/es/table';
import {get} from 'lodash';
import React from 'react';
import {
  getSocietyAbouts,
  getSocietyAbout,
  createSocietyAbout,
  deleteSocietyAbout,
  updateSocietyAbout,
} from 'libs/api/society';
import {useDataApi} from 'libs/hooks';
import {TSocietyAboutDetail} from 'modules/society';
import {TListResponse} from 'modules/types';

const SocietyAbout = () => {
  const [{data, loading}] = useDataApi<TListResponse<TSocietyAboutDetail>>(getSocietyAbouts, {
    contents: [],
    last: false,
  });

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
			  title={<div>{item.name}</div>}
			  //description={<div style={{color: '#f86e6b'}}>{item.activity}</div>}
			  description={<div dangerouslySetInnerHTML={{__html: item.activity}}></div>}
			/>
		  </List.Item>
		  )}
	  />
    </>
  );
};

SocietyAbout.defaultProps = {};

export default SocietyAbout;
