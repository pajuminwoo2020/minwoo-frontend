import React, {useState} from 'react';
import {useLocation, Link} from 'react-router-dom';
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
    name: '민우뉴스',
    path: 'action',
  }, {
    name: '회원활동',
    path: 'member',
  }, {
    name: '지역소식',
    path: 'press',
  }, {
    name: '후원하기',
    path: 'donation',
  }, {
    name: '일정표',
    path: 'calendar',
  }],
}, {
  name: '부설기구',
  path: 'affiliate',
  children: [{
    group: '성폭력상담소',
    name: '상담소소개',
    path: 'about',
  }, {
    group: '성폭력상담소',
    name: '활동자료',
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
    name: '회원공간',
    path: 'space',
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
  }, {
    name: '자료실',
    path: 'drive',
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
          <Link to={ERoute.IntroAbout}>{getMenuTitle(ERoute.IntroAbout)[1]}</Link>
        </Menu.Item>
        <Menu.Item key={ERoute.IntroPeople}>
          <Link to={ERoute.IntroPeople}>{getMenuTitle(ERoute.IntroPeople)[1]}</Link>
        </Menu.Item>
        <Menu.Item key={ERoute.IntroHistory}>
          <Link to={ERoute.IntroHistory}>{getMenuTitle(ERoute.IntroHistory)[1]}</Link>
        </Menu.Item>
        <Menu.Item key={ERoute.IntroSettlement}>
          <Link to={ERoute.IntroSettlement}>{getMenuTitle(ERoute.IntroSettlement)[1]}</Link>
        </Menu.Item>
        <Menu.Item key={ERoute.IntroLocation}>
          <Link to={ERoute.IntroLocation}>{getMenuTitle(ERoute.IntroLocation)[1]}</Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu title={getMenuTitle('/activity')[0]}>
        <Menu.Item key={ERoute.ActivityNotice}>
          <Link to={ERoute.ActivityNotice}>{getMenuTitle(ERoute.ActivityNotice)[1]}</Link>
        </Menu.Item>
        <Menu.Item key={ERoute.ActivityAction}>
          <Link to={ERoute.ActivityAction}>{getMenuTitle(ERoute.ActivityAction)[1]}</Link>
        </Menu.Item>
        <Menu.Item key={ERoute.ActivityMember}>
          <Link to={ERoute.ActivityMember}>{getMenuTitle(ERoute.ActivityMember)[1]}</Link>
        </Menu.Item>
        <Menu.Item key={ERoute.ActivityPress}>
          <Link to={ERoute.ActivityPress}>{getMenuTitle(ERoute.ActivityPress)[1]}</Link>
        </Menu.Item>
        <Menu.Item key={ERoute.ActivityDonation}>
          <Link to={ERoute.ActivityDonation}>{getMenuTitle(ERoute.ActivityDonation)[1]}</Link>
        </Menu.Item>
        <Menu.Item key={ERoute.ActivityCalendar}>
          <Link to={ERoute.ActivityCalendar}>{getMenuTitle(ERoute.ActivityCalendar)[1]}</Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu title={getMenuTitle('/affiliate')[0]}>
        <Menu.ItemGroup title="성폭력상담소">
          <Menu.Item key={ERoute.AffiliateAbout}>
            <Link to={ERoute.AffiliateAbout}>{getMenuTitle(ERoute.AffiliateAbout)[2]}</Link>
          </Menu.Item>
          <Menu.Item key={ERoute.AffiliateActivity}>
            <Link to={ERoute.AffiliateActivity}>{getMenuTitle(ERoute.AffiliateActivity)[2]}</Link>
          </Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <SubMenu title={getMenuTitle('/member')[0]}>
        <Menu.Item key={ERoute.MemberSocietyAbout}>
          <Link to={ERoute.MemberSocietyAbout}>{getMenuTitle(ERoute.MemberSocietyAbout)[1]}</Link>
        </Menu.Item>
        <Menu.Item key={ERoute.MemberSocietyActivity}>
          <Link to={ERoute.MemberSocietyActivity}>{getMenuTitle(ERoute.MemberSocietyActivity)[1]}</Link>
        </Menu.Item>
        <Menu.Item key={ERoute.MemberSpace}>
          <Link to={ERoute.MemberSpace}>{getMenuTitle(ERoute.MemberSpace)[1]}</Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu title={getMenuTitle('/bulletin')[0]}>
        <Menu.Item key={ERoute.BulletinNewsletter}>
          <Link to={ERoute.BulletinNewsletter}>{getMenuTitle(ERoute.BulletinNewsletter)[1]}</Link>
        </Menu.Item>
        <Menu.Item key={ERoute.BulletinGallery}>
          <Link to={ERoute.BulletinGallery}>{getMenuTitle(ERoute.BulletinGallery)[1]}</Link>
        </Menu.Item>
        <Menu.Item key={ERoute.BulletinDrive}>
          <Link to={ERoute.BulletinDrive}>{getMenuTitle(ERoute.BulletinDrive)[1]}</Link>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};
