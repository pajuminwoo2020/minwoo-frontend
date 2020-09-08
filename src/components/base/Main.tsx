import React, {useState} from 'react';
import {EyeOutlined, BankOutlined, PhoneOutlined} from '@ant-design/icons/lib';
import {FormattedDate} from 'react-intl';
import {Link} from 'react-router-dom';
import {get, map, filter} from 'lodash';
import {shallowEqual, useSelector} from 'react-redux';
import {RootState} from 'modules';
import {Card, Divider, List, Carousel, Row, Col, Button, Typography, Popover, Tooltip} from 'antd';
import {MainWrapper} from 'components/base/styles';
import {getImageSource} from 'components/base/BoardDetail';
import {TListResponse} from 'modules/types';
import {TBoardDetail} from 'modules/board';
import {TBanner} from 'modules/information';
import {useDataApi} from 'libs/hooks';
import {getBoardNotices, getBoardActions, getBoardActivityMembers, getBoardPresses} from 'libs/api/board';
import {getBanners} from 'libs/api/information';
import {PrimaryColor, CardWrapper} from 'GlobalStyles'
import {ERoute} from 'enums/route.enum'
import {EBoardOperation} from 'enums/board.enum'
import {EBannerType} from 'enums/information.enum'
import Configs from 'config';
import FacebookSource from 'assets/logo_facebook.png';
import InstagramSource from 'assets/logo_instagram.png';
import HumanSource from 'assets/logo_human.png';
import NTSSource from 'assets/logo_nts.png';

const {Text} = Typography;
const {Meta} = Card;
const Main = () => {
  const information = useSelector((state: RootState) => state.information.info, shallowEqual);
  const [{data:dataBanner, loading:loadingBanner}] = useDataApi<TListResponse<TBanner>>(getBanners.bind(null, {
    params: {
      current: 1,
      pageSize: 99,
    },
  }));
  const [{data:dataNotice, loading:loadingNotice}] = useDataApi<TListResponse<TBoardDetail>>(getBoardNotices.bind(null, {
    params: {
      current: 1,
      pageSize: 5,
    },
  }));
  const [{data:dataAction, loading:loadingAction}] = useDataApi<TListResponse<TBoardDetail>>(getBoardActions.bind(null, {
    params: {
      current: 1,
      pageSize: 6,
    },
  }));
  const [{data:dataMember, loading:loadingMember}] = useDataApi<TListResponse<TBoardDetail>>(getBoardActivityMembers.bind(null, {
    params: {
      current: 1,
      pageSize: 2,
    },
  }));
  const [{data:dataPress, loading:loadingPress}] = useDataApi<TListResponse<TBoardDetail>>(getBoardPresses.bind(null, {
    params: {
      current: 1,
      pageSize: 5,
    },
  }));

  return (
    <MainWrapper>
      HELLO
      <Carousel autoplay dotPosition="top">
        {map(filter(get(dataBanner, 'contents', []), v => v.banner_type === EBannerType.Large), v => (
          <a href={get(v, 'href')}>
            <img src={`${Configs.API_HOST}${get(v, 'absolute_url')}`}/>
          </a>
        ))}
      </Carousel>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={24} md={18} lg={18} xl={18}>
          <Link to={ERoute.ActivityAction}><Text className="board-title">민우뉴스</Text></Link>
          <Divider/>
          <List
            style={{paddingBottom: '18px'}}
            grid={{gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3}}
            dataSource={get(dataAction, 'contents')}
            loading={loadingAction}
            renderItem={item => (
              <List.Item>
                <CardWrapper to={`${ERoute.ActivityAction}/${EBoardOperation.View}/${get(item, 'id')}`}>
                  <Card
                    bodyStyle={{padding: '10px 20px'}}
                    hoverable
                    cover={<img src={getImageSource(item)} alt='image'/>}
                  >
                    <Meta title={get(item, 'title')} description={
                      <FormattedDate
                        value={get(item, 'created_at')}
                        year="numeric"
                        month="long"
                        day="2-digit"
                      />
                    }/>
                  </Card>
                </CardWrapper>
              </List.Item>
            )}
          />
        </Col>
        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
          <Link to={ERoute.ActivityMember}><Text className="board-title">회원활동</Text></Link>
          <Divider/>
          <List
            style={{paddingBottom: '18px'}}
            grid={{gutter: 16, xs: 1, sm: 2, md: 1, lg: 1, xl: 1, xxl: 1}}
            dataSource={get(dataMember, 'contents')}
            loading={loadingMember}
            renderItem={item => (
              <List.Item>
                <CardWrapper to={`${ERoute.ActivityMember}/${EBoardOperation.View}/${get(item, 'id')}`}>
                  <Card
                    bodyStyle={{padding: '10px 20px'}}
                    hoverable
                    cover={<img src={getImageSource(item)} alt='image'/>}
                  >
                    <Meta title={get(item, 'title')} description={
                      <FormattedDate
                        value={get(item, 'created_at')}
                        year="numeric"
                        month="long"
                        day="2-digit"
                      />
                    }/>
                  </Card>
                </CardWrapper>
              </List.Item>
            )}
          />
        </Col>
      </Row>
      <Row gutter={[16,16]} justify="center">
        <Col xs={24} sm={24} md={9} lg={9} xl={9}>
          <Link to={ERoute.ActivityNotice}><Text className="board-title">공지사항</Text></Link>
          <Divider/>
          <List
            size="small"
            split={false}
            itemLayout="horizontal"
            dataSource={get(dataNotice, 'contents')}
            loading={loadingNotice}
            renderItem={item => (
              <List.Item>
                <Link to={`${ERoute.ActivityNotice}/${EBoardOperation.View}/${get(item, 'id')}`}>
                  <span className="title">
                    {get(item, 'title')}
                  </span>
                </Link>
              </List.Item>
            )}
          />
        </Col>
        <Col xs={24} sm={24} md={9} lg={9} xl={9}>
          <Link to={ERoute.ActivityPress}><Text className="board-title">지역소식</Text></Link>
          <Divider/>
          <List
            size="small"
            split={false}
            itemLayout="horizontal"
            dataSource={get(dataPress, 'contents')}
            loading={loadingPress}
            renderItem={item => (
              <List.Item>
                <Link to={`${ERoute.ActivityPress}/${EBoardOperation.View}/${get(item, 'id')}`}>
                  <span className="title">
                    {get(item, 'title')}
                  </span>
                </Link>
              </List.Item>
            )}
          />
        </Col>
        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
          <Row>
            <Link
              className="area-right-top background-heart"
              to={ERoute.ActivityDonation}
              style={{marginBottom: '10px', textAlign: 'center'}}
            >
              <p className="title">후원하기</p>
              <p><BankOutlined/>&nbsp;<Text>{get(information, 'bank_account')}</Text></p>
              <p><PhoneOutlined/>&nbsp;<Text>{get(information, 'phone')}</Text></p>
            </Link>
          </Row>
          <Row justify="space-between" style={{marginTop: '10px'}}>
            <Col>
              <Popover
                placement="bottomLeft"
                content={
                  <iframe
                    style={{border: 'none', height: '250px'}}
                    name="f33be3bc0afec"
                    width="100%"
                    height="100%"
                    data-testid="fb:page Facebook Social Plugin"
                    title="fb:page Facebook Social Plugin"
                    src="https://www.facebook.com/v2.0/plugins/page.php?adapt_container_width=true&amp;app_id=&amp;channel=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df61399cf36e77c%26domain%3Dwww.paju.womenlink.or.kr%26origin%3Dhttps%253A%252F%252Fwww.paju.womenlink.or.kr%252Ff1bc07eebc708a%26relation%3Dparent.parent&amp;container_width=320&amp;height=250&amp;hide_cover=true&amp;href=https%3A%2F%2Fwww.facebook.com%2Fpajuminwoo%2F&amp;locale=ko_KR&amp;sdk=joey&amp;show_facepile=false&amp;small_header=true&amp;tabs=timeline"
                  >
                  </iframe>
                }
              >
                <a href="https://www.facebook.com/pajuminwoo/">
                  <img src={FacebookSource} style={{width: 'auto', height: '50px'}}/>
                </a>
              </Popover>
            </Col>
            <Col>
              <Popover
                placement="bottomLeft"
                content={
                  <iframe
                    src={`${get(information, 'instagram_feed')}/embed`}
                    width="100%"
                    height="100%"
                    style={{border: 'none', height: '250px'}}
                  >
                  </iframe>
                }
              >
                <a href="https://www.instagram.com/pajuminwoo/">
                  <img src={InstagramSource} style={{width: 'auto', height: '50px'}}/>
                </a>
              </Popover>
            </Col>
            <Col>
              <Tooltip placement="bottom" title="국세청">
                <a href="https://www.nts.go.kr/">
                  <img src={NTSSource} style={{width: 'auto', height: '50px'}}/>
                </a>
              </Tooltip>
            </Col>
            <Col>
              <Tooltip placement="bottom" title="국가인권위원회">
                <a href="https://www.humanrights.go.kr/">
                  <img src={HumanSource} style={{width: 'auto', height: '50px'}}/>
                </a>
              </Tooltip>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row justify="space-between" gutter={[0, 8]} style={{marginTop: '12px'}}>
        {map(
          filter(filter(get(dataBanner, 'contents', []), (v, idx) => v.banner_type === EBannerType.Small), (v, idx) => idx < 3),
          (item, idx) => (
            <>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <a href={get(item, 'href')}>
                  <img src={`${Configs.API_HOST}${get(item, 'absolute_url')}`} className="img-banner"/>
                </a>
              </Col>
              {idx != 2 && <Col xs={0} sm={0} md={4} lg={4} xl={4}></Col>}
            </>
          )
        )}
      </Row>
	</MainWrapper>
  );
}

export default Main;
