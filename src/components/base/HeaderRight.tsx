import React, {useState} from 'react';
import {useLocation, Link} from 'react-router-dom';
import {ClickParam} from 'antd/lib/menu';
import {DownOutlined} from '@ant-design/icons';
import {shallowEqual, useSelector} from 'react-redux';
import {Menu, Col, Row, Typography, Button, Drawer, Breadcrumb, Dropdown} from 'antd';
import styled from 'styled-components';
import {RootState} from 'modules';
import {userLogout} from 'libs/api/user';
import {cookies} from 'libs/api/apiClient';

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
      cookies.remove('womenlink_csrftoken');
      window.location.href = '/user/login';
    } catch (e) {
      throw e;
    }
  }

  function onClickMenu(e: ClickParam) {
    switch (e.key) {
      case 'user-setting':
        window.location.href = '/user/edit';
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
            <Text strong={true}>{currentUser.fullname}</Text>
            <Text>&nbsp;&nbsp;{currentUser.userid}</Text>
            <DownOutlined style={{marginLeft: 10}}/>
          </div>
        </Dropdown>
      ) : (
        <>
          <Button size="large" type="primary" href="/user/login"><Text>로그인</Text></Button>
          <Button size="large" href="/user/signup"><Text>회원가입</Text></Button>
        </>
      )}
    </Row>
  );
};
