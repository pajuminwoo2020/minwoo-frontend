import React, {useState, useEffect} from 'react';
import {RightOutlined} from '@ant-design/icons/lib';
import {get} from 'lodash';
import {Button, Row, Col, Typography, Table, Skeleton} from 'antd';
import {ColumnsType} from 'antd/es/table';
import {shallowEqual, useSelector} from 'react-redux';
import {RootState} from 'modules';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {useDataApi, usePagination} from 'libs/hooks';
import {TListResponse, TPagination} from 'modules/types';
import {ERoute} from 'enums/route.enum';
import {TDonation, TDonationPage} from 'modules/information/types';
import {TableWrapper, PrimaryColor} from 'GlobalStyles';
import {getDonations, getDonationPage} from 'libs/api/information';

const {Text} = Typography;
export const DonationStepWrapper = styled.div`
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

  .box-with-border {
    margin: 0px auto;
    width: 100%;
    border-radius: 15px;
    font-size: 20px;
    text-align: center;
    padding: 10px 20px;

    p {
      margin-bottom: 0px;
    }
  }
  .box-with-border.color-blue {
    border: 3px solid #0dbeb5;
    color: #0dbeb5;
  }
  .box-with-border.color-yellow {
    border: 3px solid #ffe58f;
    color: #ffe58f;
  }
`;
const Donation = () => {
  const [pagination, setPagination] = usePagination(5);
  const information = useSelector((state: RootState) => state.information.info, shallowEqual);
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
  const [{data: donationPage, loading: pageLoading}] = useDataApi<TDonationPage>(getDonationPage.bind(null));

  useEffect(() => {
    setCallback(() => getPromise);
  }, [pagination]);

  const columns: ColumnsType<TDonation> = [
    {
      title: '후원종류',
      dataIndex: 'donation_type',
      className: 'column-created-by',
      render: (donation_type: string) => <Text>{donation_type}</Text>,
    },
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
      title: '신청인',
      dataIndex: 'applicant_name',
      className: 'column-created-by',
      render: (applicant_name: string) => <Text>{applicant_name}</Text>,
    },
  ];
  return (
	<DonationStepWrapper>
	  <Row gutter={[16, 16]} align="top">
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <div style={{padding: '0px 25px'}}>
            {pageLoading === true ? (
              <Skeleton active title={false} paragraph={{rows: 6}}/>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: `${get(donationPage, 'introduction', '')}`}}/>
            )}
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
	  <Row gutter={[16, 16]} align="top" style={{marginTop: '40px'}} justify="space-between">
        <Col xs={24} sm={24} md={11} lg={11} xl={11}>
          <div className="box-with-border color-blue">
            <p>회원이 되면</p>
          </div>
          <div style={{color: '#999999', padding: '20px 10px 0px 10px'}}>
            <div dangerouslySetInnerHTML={{ __html: `${get(donationPage, 'benefits', '')}`}}/>
          </div>
		</Col>
        <Col xs={24} sm={24} md={11} lg={11} xl={11}>
          <div className="box-with-border color-yellow">
            <p>회비 납부 방법</p>
          </div>
          <div style={{color: '#999999', padding: '20px 10px 0px 10px'}}>
            <div dangerouslySetInnerHTML={{ __html: `${get(donationPage, 'payment_method', '')}`}}/>
          </div>
          <div style={{color: '#999999', padding: '0px 10px'}}>
            <p><strong style={{color: `${PrimaryColor}`}}>{get(information, 'bank_account')}</strong> (예금주: 파주여성민우회)</p>
          </div>
		</Col>
	  </Row>
	</DonationStepWrapper>
  );
}

export default Donation;
