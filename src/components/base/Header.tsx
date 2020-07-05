import React from 'react';
import {useIntl} from 'react-intl';
import {useLocation, Link} from 'react-router-dom';
import {Layout, Menu, Col, Row, Typography, Button} from 'antd';
import styled from 'styled-components';
import LogoSource from 'assets/logo.png';
import {HeaderWrapper} from 'components/base/styles';
import {PrimaryColor} from 'GlobalStyles';

const {Header, Content} = Layout;
const {Text} = Typography;

const LogoImage = () => {
  const {formatMessage: f} = useIntl();

  return (
    <a href="/">
      <img src={LogoSource} style={{width: '30px', height: '30px'}}/>
      <span style={{marginLeft: '10px', fontSize: '30px', color: PrimaryColor}}>Bigstep</span>
    </a>
  );
};

export const HeaderBeforeLogin = ({children}: {children: React.ReactNode;}) => {
  const {formatMessage: f} = useIntl();
  const location = useLocation();

  return (
    <Layout>
      <HeaderWrapper>
        <Header>
          <Row justify='space-between'>
            <Col span={4}>
              <LogoImage/>
            </Col>
            <Col span={12}>
              <Menu selectedKeys={[location.pathname]} mode="horizontal">
                <Menu.Item key="/about">
                  <Link to="/about"><Text>{f({id: 'header.about'})}</Text></Link>
                </Menu.Item>
                <Menu.Item key="/item">
                  <Link to="/item"><Text>{f({id: 'header.item'})}</Text></Link>
                </Menu.Item>
              </Menu>
            </Col>
            <Col span={8}>
              <Button size="large" href="/login">{f({id: 'header.button.login'})}</Button>
              <Button type="primary" size="large" href="/signup">{f({id: 'header.button.get_started'})}</Button>
            </Col>
          </Row>
        </Header>
      </HeaderWrapper>
      <Content>
        {children}
      </Content>
    </Layout>
  );
};



