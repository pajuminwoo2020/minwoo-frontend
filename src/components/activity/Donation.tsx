import React, {useState, useEffect} from 'react';
import {RightOutlined} from '@ant-design/icons/lib';
import {get} from 'lodash';
import {Button, Row, Col, Typography, Table} from 'antd';
import {ColumnsType} from 'antd/es/table';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {useDataApi, usePagination} from 'libs/hooks';
import {TListResponse, TPagination} from 'modules/types';
import {ERoute} from 'enums/route.enum';
import {TDonation} from 'modules/information/types';
import {TableWrapper} from 'GlobalStyles';
import {getDonations} from 'libs/api/information';

const {Text} = Typography;
const DonationStepWrapper = styled.div`
  .large-btn {
	width: 200px;
	height: 50px;
	font-weight: bold;
	font-size: 16px;
	border-radius: 10px;
	margin-top: 10px;
  }

  .title {
	vertical-align: sub;
	width: 100%;
	text-overflow: ellipsis;
	display: -webkit-inline-box;
	-webkit-box-orient: vertical;
	-webkit-box-pack: center;
	-webkit-line-clamp: 1;
	word-break: break-word;
	white-space: normal;
	overflow: hidden;
  }
`;
const Donation = () => {
  const [pagination, setPagination] = usePagination(10);
  const reloadPage = (page?: Partial<TPagination>) => {
    setPagination({
      ...pagination,
      ...page,
    });
  };
  const getPromise = getDonations.bind(null, {
    params: {
      current: pagination.current,
      pageSize: pagination.pageSize,
    },
  });
  const [{data, loading}, setCallback] = useDataApi<TListResponse<TDonation>>(getPromise, {
    contents: [],
    last: false,
  });

  useEffect(() => {
    setCallback(() => getPromise);
  }, [pagination]);

  const columns: ColumnsType<TDonation> = [
    {
      title: '메모',
      dataIndex: 'memo',
      className: 'column-title',
      render: (memo: string) => (
        <>
          {memo ? <Text className="title">{memo}</Text> : <Text>후원합니다 ~!</Text>}
        </>
      ),
    },
    {
      title: '후원',
      dataIndex: 'user_name',
      className: 'column-created-by',
      render: (user_name: string) => <Text>{user_name}</Text>,
    },
  ];
  return (
	<DonationStepWrapper>
	  <Row gutter={[16, 16]} align="middle">
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
		  <div style={{padding: '0px 25px'}}>
			<p>
              <Text style={{fontWeight: 'bold', fontSize: '16px'}}>
                여성이 웃는 세상, 평등한 사회를 위한 발걸음,<br></br>
                민우회 회원이 되어주세요!
              </Text>
			</p>
			<p>
              <Text style={{fontSize: '14px'}}>
                민우회는 사회적 약자와 함께 하는 사회를 만들어내기 위해 실천 활동을 힘써 펼쳐나가고 있습니다.
              </Text>
			</p>
			<Link to={ERoute.ActivityDonationStep}>
			  <Button type="primary"  className="large-btn">후원신청하기<RightOutlined/></Button>
			</Link>
		  </div>
		</Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
		  <TableWrapper>
			<Table
			  tableLayout={'fixed'}
			  rowKey="id"
			  loading={loading}
			  columns={columns}
			  size="small"
              pagination={{...pagination, total: get(data, 'total', 0)}}
			  dataSource={get(data, 'contents')}
              onChange={(page, filters, sorter, extra) => {reloadPage(page);}}
			/>
		  </TableWrapper>
		</Col>
	  </Row>
	</DonationStepWrapper>
  );
}

export default Donation;
