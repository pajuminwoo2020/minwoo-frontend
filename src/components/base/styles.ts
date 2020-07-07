import React from 'react';
import styled from 'styled-components';
import {device} from 'GlobalStyles';

export const HeaderWrapper = styled.div`
  height: 70px;

  .ant-layout-header {
    background-color: transparent;
    height: 70px;
    line-height: 70px;
    padding: 0px 20px;
	width: 100%;
	position: fixed;
	z-index: 1;
  }

  .ant-menu-submenu {
    font-size: 17px;
    font-weight: bold;
  }

  .ant-menu-submenu .ant-menu-item {
    font-size: 17px;
  }

  .ant-btn {
    margin: 0px 10px;
  }

  .ant-btn > span {
    height: 100%;
  }

  .ant-btn-primary .ant-typography {
    color: #fff;
  }

  .header-large {
    padding: 0 50px;
    display: inline-block;

    @media screen and ${device.tablet} {
      display: none;
    }
  }

  .header-small {
    display: none;
    text-align: right;

    @media screen and ${device.tablet} {
      display: inline-block;
    }
  }

  @media screen and ${device.mobile} {
    .hide-on-mobile {
      display: none;
    }
  }
`;

export const ContentTitle = styled.div`
  margin: 40px 30px 0px 30px;
  font-size: 25px;
  text-align: center;
`;
