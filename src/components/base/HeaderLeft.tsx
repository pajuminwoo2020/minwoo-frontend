import React, {useState} from 'react';
import {useLocation, Link} from 'react-router-dom';
import {Layout, Menu, Typography, Button, Drawer, Breadcrumb} from 'antd';
import styled from 'styled-components';
import {filter, get, map} from 'lodash';
import {ERoute} from 'enums/route.enum';
import {usePermission} from 'libs/hooks/usePermission';
import {PrimaryColor} from 'GlobalStyles';

type TMenuProps = {
  mode: "horizontal" | "inline";
  onClick?: () => void;
};

const {SubMenu} = Menu;
const {Text} = Typography;
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
    name: '지역젠더이슈',
    path: 'press',
  }, {
    name: '후원하기',
    path: 'donation',
  }, {
    name: '활동일정',
    path: 'calendar',
  }],
}, {
  name: '파주성폭력상담소',
  path: 'affiliate',
  children: [{
    name: '소개',
    path: 'about',
  }, {
    name: '반성폭력활동',
    path: 'activity',
  }],
}, {
  name: '소모임',
  path: 'member',
  children: [{
    name: '소모임소개',
    path: 'society_about',
  }, {
    name: '소모임활동',
    path: 'society_activity',
  }],
}, {
  name: '자료실',
  path: 'bulletin',
  children: [{
    name: '자료실',
    path: 'drive',
  }, {
    name: '소식지',
    path: 'newsletter',
  }, {
    name: '갤러리',
    path: 'gallery',
  }],
}, {
  name: '인트라넷',
  path: 'intranet',
  children: [{
    name: '공유방',
    path: 'share',
  }, {
    name: '자료실',
    path: 'drive',
  }],
}, {
  name: '게시판',
  path: 'search',
  children: [{
    name: '전체 검색',
    path: 'global',
  }],
}];

export function getMenuTitle(route: string) {
  const path = route.split('/');
  const subMenu = filter(menuNames, x => x.path == path[1]);

  if (path.length <= 2) {
    return [get(subMenu[0], 'name')];
  }

  const menu = filter(get(subMenu[0], 'children'), x => x.path == path[2]);

  return [get(subMenu[0], 'name'), get(menu[0], 'name')];
}

export const HeaderLeft = ({mode, onClick}: TMenuProps) => {
  const location = useLocation();

  return (
    <Menu selectedKeys={[location.pathname]} mode={mode} onClick={onClick}>
      <SubMenu title={<Link to={ERoute.IntroAbout}><div style={{height: '100%'}}>{getMenuTitle('/intro')[0]}</div></Link>}>
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
      <SubMenu title={<Link to={ERoute.ActivityNotice}><div style={{height: '100%'}}>{getMenuTitle('/activity')[0]}</div></Link>}>
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
      <SubMenu title={<Link to={ERoute.MemberSocietyAbout}><div style={{height: '100%'}}>{getMenuTitle('/member')[0]}</div></Link>}>
        <Menu.Item key={ERoute.MemberSocietyAbout}>
          <Link to={ERoute.MemberSocietyAbout}>{getMenuTitle(ERoute.MemberSocietyAbout)[1]}</Link>
        </Menu.Item>
        <Menu.Item key={ERoute.MemberSocietyActivity}>
          <Link to={ERoute.MemberSocietyActivity}>{getMenuTitle(ERoute.MemberSocietyActivity)[1]}</Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu title={<Link to={ERoute.BulletinDrive}><div style={{height: '100%'}}>{getMenuTitle('/bulletin')[0]}</div></Link>}>
        <Menu.Item key={ERoute.BulletinDrive}>
          <Link to={ERoute.BulletinDrive}>{getMenuTitle(ERoute.BulletinDrive)[1]}</Link>
        </Menu.Item>
        <Menu.Item key={ERoute.BulletinNewsletter}>
          <Link to={ERoute.BulletinNewsletter}>{getMenuTitle(ERoute.BulletinNewsletter)[1]}</Link>
        </Menu.Item>
        <Menu.Item key={ERoute.BulletinGallery}>
          <Link to={ERoute.BulletinGallery}>{getMenuTitle(ERoute.BulletinGallery)[1]}</Link>
        </Menu.Item>
      </SubMenu>
      <span className="vertical-bar"></span>
      <SubMenu title={<Link to={ERoute.AffiliateAbout}><div style={{height: '100%'}}>{getMenuTitle('/affiliate')[0]}</div></Link>}>
        <Menu.Item key={ERoute.AffiliateAbout}>
          <Link to={ERoute.AffiliateAbout}>{getMenuTitle(ERoute.AffiliateAbout)[1]}</Link>
        </Menu.Item>
        <Menu.Item key={ERoute.AffiliateActivity}>
          <Link to={ERoute.AffiliateActivity}>{getMenuTitle(ERoute.AffiliateActivity)[1]}</Link>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};
