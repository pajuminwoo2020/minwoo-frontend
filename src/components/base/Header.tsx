import React, {useState} from 'react';
import {useIntl} from 'react-intl';
import {useLocation, Link} from 'react-router-dom';
import {Layout, Menu, Col, Row, Typography, Button, Drawer} from 'antd';
import styled from 'styled-components';
import {AlignCenterOutlined} from '@ant-design/icons';
import LogoSource from 'assets/logo.png';
import {HeaderWrapper} from 'components/base/styles';
import {PrimaryColor} from 'GlobalStyles';

type TMenuProps = {
  mode: "horizontal" | "inline";
  onClick?: () => void;
};

const {Header, Content} = Layout;
const {Text} = Typography;

const LogoImage = () => {
  const {formatMessage: f} = useIntl();

  return (
    <a href="/">
      <img src={LogoSource} style={{width: '30px', height: '30px'}}/>
      <span style={{marginLeft: '10px', fontSize: '2rem', color: PrimaryColor}}>Bigstep</span>
    </a>
  );
};

export const HeaderBeforeLogin = ({children}: {children: React.ReactNode;}) => {
  const {formatMessage: f} = useIntl();
  const location = useLocation();
  const RightMenu = ({mode, onClick}: TMenuProps) => {
    return (
      <Menu selectedKeys={[location.pathname]} mode={mode} onClick={onClick}>
        <Menu.Item key="/login">
          <Link to="/login"><Text>{f({id: 'header.button.login'})}</Text></Link>
        </Menu.Item>
        <Menu.Item key="/signup">
          <Link to="/signup"><Text>{f({id: 'header.button.get_started'})}</Text></Link>
        </Menu.Item>
      </Menu>
    );
  };
  const LeftMenu = ({mode, onClick}: TMenuProps) => {
    return (
      <Menu selectedKeys={[location.pathname]} mode={mode} onClick={onClick}>
        <Menu.Item key="/about">
          <Link to="/about"><Text>{f({id: 'header.about'})}</Text></Link>
        </Menu.Item>
        <Menu.Item key="/item">
          <Link to="/item"><Text>{f({id: 'header.item'})}</Text></Link>
        </Menu.Item>
      </Menu>
    );
  };
  const [visible, setVisible] = useState(false);

  return (
    <Layout>
      <HeaderWrapper>
        <Header>
          <Row>
            <Col flex="150px">
              <LogoImage/>
            </Col>
            <Col flex="auto" className="header-large">
              <Row justify='space-between'>
                <LeftMenu mode="horizontal"/>
                <RightMenu mode="horizontal"/>
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
                  <LeftMenu mode="inline" onClick={() => {setVisible(false);}}/>
                  <RightMenu mode="inline" onClick={() => {setVisible(false);}}/>
                </div>
              </Drawer>
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
