import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';
import {Layout, Menu, Col, Row, Typography, Button, Drawer, Breadcrumb} from 'antd';
import styled from 'styled-components';
import {filter, get, map} from 'lodash';
import {ERoute} from 'enums/route.enum';

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
  path: 'bulletin',
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
        <Menu.Item key={ERoute.IntroAbout}>
          <a href={ERoute.IntroAbout}>{getMenuTitle(ERoute.IntroAbout)[1]}</a>
        </Menu.Item>
        <Menu.Item key={ERoute.IntroPeople}>
          <a href={ERoute.IntroPeople}>{getMenuTitle(ERoute.IntroPeople)[1]}</a>
        </Menu.Item>
        <Menu.Item key={ERoute.IntroHistory}>
          <a href={ERoute.IntroHistory}>{getMenuTitle(ERoute.IntroHistory)[1]}</a>
        </Menu.Item>
        <Menu.Item key={ERoute.IntroSettlement}>
          <a href={ERoute.IntroSettlement}>{getMenuTitle(ERoute.IntroSettlement)[1]}</a>
        </Menu.Item>
        <Menu.Item key={ERoute.IntroLocation}>
          <a href={ERoute.IntroLocation}>{getMenuTitle(ERoute.IntroLocation)[1]}</a>
        </Menu.Item>
      </SubMenu>
      <SubMenu title={getMenuTitle('/activity')[0]}>
        <Menu.Item key={ERoute.ActivityNotice}>
          <a href={ERoute.ActivityNotice}>{getMenuTitle(ERoute.ActivityNotice)[1]}</a>
        </Menu.Item>
        <Menu.Item key={ERoute.ActivityAction}>
          <a href={ERoute.ActivityAction}>{getMenuTitle(ERoute.ActivityAction)[1]}</a>
        </Menu.Item>
        <Menu.Item key={ERoute.ActivityPress}>
          <a href={ERoute.ActivityPress}>{getMenuTitle(ERoute.ActivityPress)[1]}</a>
        </Menu.Item>
      </SubMenu>
      <SubMenu title={getMenuTitle('/affiliate')[0]}>
        <Menu.ItemGroup title="성폭력상담소">
          <Menu.Item key={ERoute.AffiliateAbout}>
            <a href={ERoute.AffiliateAbout}>{getMenuTitle(ERoute.AffiliateAbout)[2]}</a>
          </Menu.Item>
          <Menu.Item key={ERoute.AffiliateActivity}>
            <a href={ERoute.AffiliateActivity}>{getMenuTitle(ERoute.AffiliateActivity)[2]}</a>
          </Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <SubMenu title={getMenuTitle('/member')[0]}>
        <Menu.Item key={ERoute.MemberSocietyAbout}>
          <a href={ERoute.MemberSocietyAbout}>{getMenuTitle(ERoute.MemberSocietyAbout)[1]}</a>
        </Menu.Item>
        <Menu.Item key={ERoute.MemberSocietyActivity}>
          <a href={ERoute.MemberSocietyActivity}>{getMenuTitle(ERoute.MemberSocietyActivity)[1]}</a>
        </Menu.Item>
        <Menu.Item key={ERoute.MemberLocal}>
          <a href={ERoute.MemberLocal}>{getMenuTitle(ERoute.MemberLocal)[1]}</a>
        </Menu.Item>
        <Menu.Item key={ERoute.MemberDonation}>
          <a href={ERoute.MemberDonation}>{getMenuTitle(ERoute.MemberDonation)[1]}</a>
        </Menu.Item>
        <Menu.Item key={ERoute.MemberBand}>
          <a href={ERoute.MemberBand}>{getMenuTitle(ERoute.MemberBand)[1]}</a>
        </Menu.Item>
      </SubMenu>
      <SubMenu title={getMenuTitle('/bulletin')[0]}>
        <Menu.Item key={ERoute.BulletinNewsletter}>
          <a href={ERoute.BulletinNewsletter}>{getMenuTitle(ERoute.BulletinNewsletter)[1]}</a>
        </Menu.Item>
        <Menu.Item key={ERoute.BulletinGallery}>
          <a href={ERoute.BulletinGallery}>{getMenuTitle(ERoute.BulletinGallery)[1]}</a>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};
