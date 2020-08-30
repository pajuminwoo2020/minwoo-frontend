import React, {useLayoutEffect, useState, useEffect} from 'react';
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
import {CWindowWidth} from 'constants/base.const';

const {Header, Content} = Layout;
const {Text} = Typography;

export const LogoImage = () => {
  return (
    <Link to="/">
      <img src={LogoSource} style={{width: '100%', height: 'auto'}}/>
    </Link>
  );
};

export const BaseTemplate = ({children}: {children: React.ReactNode;}) => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [leftPadding, setLeftPadding] = useState(0);

  useLayoutEffect(() => {
    function updateSize() {
      setLeftPadding(window.innerWidth > CWindowWidth + 8 ? (window.innerWidth - CWindowWidth)/2 : 8);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
  }, []);

  return (
    <Layout>
      <HeaderWrapper>
        <Header>
          <Row style={{paddingLeft: leftPadding}}>
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
                  <HeaderRight onClick={() => {setVisible(false);}}/>
                  <div style={{marginTop: '20px'}}>
                    <HeaderLeft mode="inline" onClick={() => {setVisible(false);}}/>
                  </div>
                </div>
              </Drawer>
            </Col>
          </Row>
        </Header>
        <Breadcrumb style={{margin: '80px auto', maxWidth: `${CWindowWidth}px`, padding: '0px 10px'}}>
          {getMenuTitle(location.pathname)[0] && (
            <>
              <Breadcrumb.Item><Link to="/"><HomeOutlined/></Link></Breadcrumb.Item>
              {map(getMenuTitle(location.pathname), v => (
                <Breadcrumb.Item key={v}>{v}</Breadcrumb.Item>
              ))}
            </>
          )}
        </Breadcrumb>
      </HeaderWrapper>
      {getMenuTitle(location.pathname).pop() && (
        <ContentTitle>
          <Text strong={true}>{getMenuTitle(location.pathname).pop()}</Text>
        </ContentTitle>
      )}
	  <Content>
		<div style={{margin: '0px auto', maxWidth: `${CWindowWidth}px`, minHeight: '400px', padding: '0px 10px'}}>
		  {children}
		</div>
	  </Content>
      <Footer/>
    </Layout>
  );
};
