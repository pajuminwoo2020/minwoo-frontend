import React, {useState} from 'react';
import {useLocation, Link} from 'react-router-dom';
import {shallowEqual, useSelector} from 'react-redux';
import {Layout, Menu, Col, Row, Typography, Button, Drawer, Breadcrumb, Divider} from 'antd';
import styled from 'styled-components';
import {RootState} from 'modules';
import {filter, get, map} from 'lodash';
import {AlignCenterOutlined, HomeOutlined} from '@ant-design/icons';
import LogoSource from 'assets/logo.png';
import {HeaderWrapper, ContentTitle} from 'components/base/styles';
import {HeaderLeft, getMenuTitle} from 'components/base/HeaderLeft';
import {HeaderRight} from 'components/base/HeaderRight';
import Footer from 'components/base/Footer';
import {PrimaryColor} from 'GlobalStyles';

const {Header, Content} = Layout;
const {Text} = Typography;

export const LogoImage = () => {
  return (
    <a href="/">
      <img src={LogoSource} style={{width: 'auto', height: '40px'}}/>
      <span style={{marginLeft: '10px', fontSize: '18px', fontWeight: 'bold', color: '#000'}}>파주여성민우회</span>
    </a>
  );
};

export const HeaderTemplate = ({children}: {children: React.ReactNode;}) => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  return (
    <Layout>
      <HeaderWrapper>
        <Header>
          <Row>
            <Col flex="200px">
              <LogoImage/>
            </Col>
            <Col flex="auto" className="header-large">
              <Row justify='space-between'>
                <HeaderLeft mode="horizontal"/>
                <HeaderRight/>
              </Row>
            </Col>
            <Col flex="auto" className="header-small">
              <Button type="primary" onClick={()=> {setVisible(true);}} style={{margin: 'auto'}}>
                <AlignCenterOutlined/>
              </Button>
              <Drawer
                placement="right"
                closable={true}
                onClose={() => {setVisible(false);}}
                visible={visible}
              >
                <div style={{marginTop: '20px'}}>
                  <HeaderRight/>
                  <div style={{marginTop: '20px'}}>
                    <HeaderLeft mode="inline" onClick={() => {setVisible(false);}}/>
                  </div>
                </div>
              </Drawer>
            </Col>
          </Row>
        </Header>
        <Breadcrumb style={{margin: '80px 30px'}} className="hide-on-mobile">
          {getMenuTitle(location.pathname)[0] && (
            <>
              <Breadcrumb.Item><HomeOutlined/></Breadcrumb.Item>
              {map(getMenuTitle(location.pathname), v => (
                <Breadcrumb.Item>{v}</Breadcrumb.Item>
              ))}
            </>
          )}
        </Breadcrumb>
      </HeaderWrapper>
      {getMenuTitle(location.pathname).pop() && (
        <ContentTitle>
          <Text strong={true}>{getMenuTitle(location.pathname).pop()}</Text>
          <Divider style={{borderTop: `1px solid ${PrimaryColor}`}}/>
        </ContentTitle>
      )}
      <Content>
        <div style={{margin: '0px 30px', minHeight: '90vh'}}>
          {children}
        </div>
        <Footer/>
      </Content>
    </Layout>
  );
};
