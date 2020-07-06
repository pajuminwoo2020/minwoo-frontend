import React from 'react';
import styled from 'styled-components';
import {device} from 'GlobalStyles';

export const HeaderWrapper = styled.div`
  .ant-layout-header {
    background-color: transparent;
    height: 80px;
    line-height: 80px;
    padding: 0px 20px;
    font-size: 20px;
  }

  .ant-menu-item {
    font-size: 17px;
  }

  .ant-btn {
    margin: 0px 10px;
  }

  .ant-btn > span {
    height: 100%;
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
`;
