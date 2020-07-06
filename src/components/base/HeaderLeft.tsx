import React, {useState} from 'react';
import {useLocation, Link} from 'react-router-dom';
import {Layout, Menu, Col, Row, Typography, Button, Drawer, Breadcrumb} from 'antd';
import styled from 'styled-components';
import {filter, get, map} from 'lodash';

type TMenuProps = {
  mode: "horizontal" | "inline";
  onClick?: () => void;
};

const {SubMenu} = Menu;
const menuNames = [{
  name: '소개',
  path: 'intro',
  children: [{
    name: '민우회소개',
    path: 'about',
  }, {
    name: '조직도',
    path: 'people',
  }, {
    name: '연혁',
    path: 'history',
  }, {
    name: '결산보고',
    path: 'settlement',
  }, {
    name: '찾아오시는 길',
    path: 'location',
  }],
}, {
  name: '활동',
  path: 'activity',
  children: [{
    name: '공지사항',
    path: 'notice',
  }, {
    name: '민우액션',
    path: 'action',
  }, {
    name: '언론속의 민우회',
    path: 'press',
  }, {
  }],
}, {
  name: '부설기구',
  path: 'affiliate',
  children: [{
    group: '성폭력상담소',
    name: '소개',
    path: 'about',
  }, {
    group: '성폭력상담소',
    name: '반성폭력활동',
    path: 'activity',
  }],
}, {
  name: '회원공간',
  path: 'member',
  children: [{
    name: '소모임소개',
    path: 'society_about',
  }, {
    name: '소모임활동',
    path: 'society_activity',
  }, {
    name: '지역소식',
    path: 'local',
  }, {
    name: '후원하기',
    path: 'donation',
  }, {
    name: '회원공간',
    path: 'band',
  }],
}, {
  name: '자료실',
  path: 'board',
  children: [{
    name: '소식지',
    path: 'newsletter',
  }, {
    name: '갤러리',
    path: 'gallery',
  }],
}];

export function getMenuTitle(route: string) {
  const path = route.split('/');
  const subMenu = filter(menuNames, x => x.path == path[1]);

  if (path.length <= 2) {
    return [get(subMenu[0], 'name')];
  }

  const menu = filter(get(subMenu[0], 'children'), x => x.path == path[2]);
  const group = get(menu[0], 'group');

  if (group)
    return [get(subMenu[0], 'name'), group, get(menu[0], 'name')];

  return [get(subMenu[0], 'name'), get(menu[0], 'name')];
}

export const HeaderLeft = ({mode, onClick}: TMenuProps) => {
  const location = useLocation();

  return (
    <Menu selectedKeys={[location.pathname]} mode={mode} onClick={onClick}>
      <SubMenu title={getMenuTitle('/intro')[0]}>
        <Menu.Item key="/intro/about">
          <Link to="/intro/about">{getMenuTitle('/intro/about')[1]}</Link>
        </Menu.Item>
        <Menu.Item key="/intro/people">
          <Link to="/intro/people">{getMenuTitle('/intro/people')[1]}</Link>
        </Menu.Item>
        <Menu.Item key="/intro/history">
          <Link to="/intro/history">{getMenuTitle('/intro/history')[1]}</Link>
        </Menu.Item>
        <Menu.Item key="/intro/settlement">
          <Link to="/intro/settlement">{getMenuTitle('/intro/settlement')[1]}</Link>
        </Menu.Item>
        <Menu.Item key="/intro/location">
          <Link to="/intro/location">{getMenuTitle('/intro/location')[1]}</Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu title={getMenuTitle('/activity')[0]}>
        <Menu.Item key="/activity/notice">
          <Link to="/activity/notice">{getMenuTitle('/activity/notice')[1]}</Link>
        </Menu.Item>
        <Menu.Item key="/activity/action">
          <Link to="/activity/action">{getMenuTitle('/activity/action')[1]}</Link>
        </Menu.Item>
        <Menu.Item key="/activity/press">
          <Link to="/activity/press">{getMenuTitle('/activity/press')[1]}</Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu title={getMenuTitle('/affiliate')[0]}>
        <Menu.ItemGroup title="성폭력상담소">
          <Menu.Item key="/affiliate/about">
            <Link to="/affiliate/about">{getMenuTitle('/affiliate/about')[2]}</Link>
          </Menu.Item>
          <Menu.Item key="/affiliate/activity">
            <Link to="/affiliate/activity">{getMenuTitle('/affiliate/activity')[2]}</Link>
          </Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <SubMenu title={getMenuTitle('/member')[0]}>
        <Menu.Item key="/member/society_about">
          <Link to="/member/society_about">{getMenuTitle('/member/society_about')[1]}</Link>
        </Menu.Item>
        <Menu.Item key="/member/society_activity">
          <Link to="/member/society_activity">{getMenuTitle('/member/society_activity')[1]}</Link>
        </Menu.Item>
        <Menu.Item key="/member/local">
          <Link to="/member/local">{getMenuTitle('/member/local')[1]}</Link>
        </Menu.Item>
        <Menu.Item key="/member/donation">
          <Link to="/member/donation">{getMenuTitle('/member/donation')[1]}</Link>
        </Menu.Item>
        <Menu.Item key="/member/band">
          <Link to="/member/band">{getMenuTitle('/member/band')[1]}</Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu title={getMenuTitle('/board')[0]}>
        <Menu.Item key="/board/newsletter">
          <Link to="/board/newsletter">{getMenuTitle('/board/newsletter')[1]}</Link>
        </Menu.Item>
        <Menu.Item key="/board/gallery">
          <Link to="/board/gallery">{getMenuTitle('/board/gallery')[1]}</Link>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};
