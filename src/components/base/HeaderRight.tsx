import React, {useState} from 'react';
import {useLocation, Link} from 'react-router-dom';
import {ClickParam,} from 'antd/lib/menu';
import {DownOutlined, UserOutlined, SettingOutlined} from '@ant-design/icons';
import {shallowEqual, useSelector} from 'react-redux';
import {ERoute} from 'enums/route.enum';
import {Avatar, Menu, Col, Row, Typography, Button, Drawer, Breadcrumb, Dropdown} from 'antd';
import styled from 'styled-components';
import {RootState} from 'modules';
import {userLogout} from 'libs/api/user';
import {usePermission} from 'libs/hooks/usePermission';
import {cookies, CCSRFToken} from 'libs/api/apiClient';
import Configs from 'config';
import {getMenuTitle} from 'components/base/HeaderLeft';

const {Text} = Typography;

type TRightMenuProps = {
  onClick?: () => void;
};
export const HeaderRight = ({onClick}: TRightMenuProps) => {
  const currentUser = useSelector((state: RootState) => state.user.current_user, shallowEqual);
  const [visible, setVisible] = useState(false);
  const {adminPagePermission, boardManagementPermission} = usePermission();
  const rightMenu = (
    <Menu onClick={onClickMenu}>
      {adminPagePermission && (
        <Menu.Item key="admin-page">관리자페이지</Menu.Item>
      )}
      <Menu.Item key="user-setting">
        <Link to={ERoute.UserEdit}>
          정보수정
        </Link>
      </Menu.Item>
      <Menu.Item key="logout">로그아웃</Menu.Item>
    </Menu>
  );
  const intranetMenu = (
    <Menu style={{minWidth: '100px'}}>
      <Menu.Item key={ERoute.IntranetShare}>
        <Link to={ERoute.IntranetShare}>{getMenuTitle(ERoute.IntranetShare)[1]}</Link>
      </Menu.Item>
      <Menu.Item key={ERoute.IntranetDrive}>
        <Link to={ERoute.IntranetDrive}>{getMenuTitle(ERoute.IntranetDrive)[1]}</Link>
      </Menu.Item>
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
        break;
      case 'logout':
        onClickLogout();
        break;
      case 'admin-page':
        window.location.href = `${Configs.API_HOST}/admin/main`;
        break;
    }
    onClick && onClick();
    setVisible(false);
  }

  function onClickButton() {
    onClick && onClick();
  }

  return (
    <Row align="middle" justify="space-around">
      {currentUser ? (
        <div>
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
              <div style={{display: 'inline-block'}}>
                <Avatar shape="circle" style={{marginRight: '5px'}} size="small" icon={<UserOutlined />}/>
                <Text strong={true}>{currentUser.fullname}</Text>
              </div>
              <div style={{display: 'inline-block'}}>
                <Text>&nbsp;&nbsp;{currentUser.userid}</Text>
                <DownOutlined style={{marginLeft: 10}}/>
              </div>
            </div>
          </Dropdown>
          {boardManagementPermission && (
            <Dropdown
              trigger={['click']}
              overlay={intranetMenu}
              placement="bottomLeft"
            >
              <SettingOutlined style={{marginLeft: '10px'}}/>
            </Dropdown>
          )}
        </div>
      ) : (
        <>
          <Link to={ERoute.UserLogin}>
            <Button size="large" type="primary" onClick={onClickButton}>로그인</Button>
          </Link>
          <Link to={ERoute.UserSignup}>
            <Button size="large" onClick={onClickButton}>회원가입</Button>
          </Link>
        </>
      )}
    </Row>
  );
};
