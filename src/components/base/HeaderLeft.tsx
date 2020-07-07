import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';
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
          <a href="/intro/about">{getMenuTitle('/intro/about')[1]}</a>
        </Menu.Item>
        <Menu.Item key="/intro/people">
          <a href="/intro/people">{getMenuTitle('/intro/people')[1]}</a>
        </Menu.Item>
        <Menu.Item key="/intro/history">
          <a href="/intro/history">{getMenuTitle('/intro/history')[1]}</a>
        </Menu.Item>
        <Menu.Item key="/intro/settlement">
          <a href="/intro/settlement">{getMenuTitle('/intro/settlement')[1]}</a>
        </Menu.Item>
        <Menu.Item key="/intro/location">
          <a href="/intro/location">{getMenuTitle('/intro/location')[1]}</a>
        </Menu.Item>
      </SubMenu>
      <SubMenu title={getMenuTitle('/activity')[0]}>
        <Menu.Item key="/activity/notice">
          <a href="/activity/notice">{getMenuTitle('/activity/notice')[1]}</a>
        </Menu.Item>
        <Menu.Item key="/activity/action">
          <a href="/activity/action">{getMenuTitle('/activity/action')[1]}</a>
        </Menu.Item>
        <Menu.Item key="/activity/press">
          <a href="/activity/press">{getMenuTitle('/activity/press')[1]}</a>
        </Menu.Item>
      </SubMenu>
      <SubMenu title={getMenuTitle('/affiliate')[0]}>
        <Menu.ItemGroup title="성폭력상담소">
          <Menu.Item key="/affiliate/about">
            <a href="/affiliate/about">{getMenuTitle('/affiliate/about')[2]}</a>
          </Menu.Item>
          <Menu.Item key="/affiliate/activity">
            <a href="/affiliate/activity">{getMenuTitle('/affiliate/activity')[2]}</a>
          </Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <SubMenu title={getMenuTitle('/member')[0]}>
        <Menu.Item key="/member/society_about">
          <a href="/member/society_about">{getMenuTitle('/member/society_about')[1]}</a>
        </Menu.Item>
        <Menu.Item key="/member/society_activity">
          <a href="/member/society_activity">{getMenuTitle('/member/society_activity')[1]}</a>
        </Menu.Item>
        <Menu.Item key="/member/local">
          <a href="/member/local">{getMenuTitle('/member/local')[1]}</a>
        </Menu.Item>
        <Menu.Item key="/member/donation">
          <a href="/member/donation">{getMenuTitle('/member/donation')[1]}</a>
        </Menu.Item>
        <Menu.Item key="/member/band">
          <a href="/member/band">{getMenuTitle('/member/band')[1]}</a>
        </Menu.Item>
      </SubMenu>
      <SubMenu title={getMenuTitle('/board')[0]}>
        <Menu.Item key="/board/newsletter">
          <a href="/board/newsletter">{getMenuTitle('/board/newsletter')[1]}</a>
        </Menu.Item>
        <Menu.Item key="/board/gallery">
          <a href="/board/gallery">{getMenuTitle('/board/gallery')[1]}</a>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};
