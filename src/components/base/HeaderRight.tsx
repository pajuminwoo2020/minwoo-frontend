import React, {useState} from 'react';
import {useLocation, Link} from 'react-router-dom';
import {ClickParam,} from 'antd/lib/menu';
import {DownOutlined, UserOutlined} from '@ant-design/icons';
import {shallowEqual, useSelector} from 'react-redux';
import {ERoute} from 'enums/route.enum';
import {Avatar, Menu, Col, Row, Typography, Button, Drawer, Breadcrumb, Dropdown} from 'antd';
import styled from 'styled-components';
import {RootState} from 'modules';
import {userLogout} from 'libs/api/user';
import {cookies, CCSRFToken} from 'libs/api/apiClient';

const {Text} = Typography;

export const HeaderRight = () => {
  const currentUser = useSelector((state: RootState) => state.user.current_user, shallowEqual);
  const [visible, setVisible] = useState(false);
  const rightMenu = (
    <Menu onClick={onClickMenu}>
      <Menu.Item key="user-setting">정보수정</Menu.Item>
      <Menu.Item key="logout">로그아웃</Menu.Item>
    </Menu>
  );

  async function onClickLogout() {
    try {
      await userLogout();
      cookies.remove('sessionid');
      cookies.remove(CCSRFToken);
      window.location.href = ERoute.UserLogin;
    } catch (e) {
      throw e;
    }
  }

  function onClickMenu(e: ClickParam) {
    switch (e.key) {
      case 'user-setting':
        window.location.href = ERoute.UserEdit;
        break;
      case 'logout':
        onClickLogout();
        break;
    }
    setVisible(false);
  }

  return (
    <Row align="middle" justify="space-around">
      {currentUser ? (
        <Dropdown
          trigger={['click']}
          overlay={rightMenu}
          placement="bottomLeft"
          onVisibleChange={() => {setVisible(!visible);}}
          visible={visible}
        >
          <div
            style={{
              display: 'inline-block',
              cursor: 'pointer',
            }}
          >
            <Avatar shape="circle" style={{marginRight: '5px'}} size="small" icon={<UserOutlined />}/>
            <Text strong={true}>{currentUser.fullname}</Text>
            <Text>&nbsp;&nbsp;{currentUser.userid}</Text>
            <DownOutlined style={{marginLeft: 10}}/>
          </div>
        </Dropdown>
      ) : (
        <>
          <Link to={ERoute.UserLogin}>
            <Button size="large" type="primary">로그인</Button>
          </Link>
          <Link to={ERoute.UserSignup}>
            <Button size="large">회원가입</Button>
          </Link>
        </>
      )}
    </Row>
  );
};
