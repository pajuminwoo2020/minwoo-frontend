import React from 'react';
import styled from 'styled-components';
import {device} from 'GlobalStyles';
import {CDefaultEditorHeight} from 'constants/base.const';

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
  margin: 60px auto 20px auto;
  font-size: 25px;
  text-align: left;
  width: 1200px;
  padding: 0px 10px;
`;

export const BoardDetailWrapper = styled.div`
  .box-title {
    background-color: #f5f5f5;
    padding: 15px 20px;
  }
  .box-sub-title {
    border-bottom: 1px solid #ccc;
    padding: 5px 20px;
    .label {
      font-size: 12px;
    }
  }

  .title-item {
    display: inline-block;
    margin: 0px 20px;
  }

  .label {
    font-weight: bold;
    margin-right: 20px;
    display: inline-block;
    font-size: 15px;
  }
  .value {
    font-weight: normal;
    display: inline-block;
    font-size: 15px;
  }

  .body-edit {
    min-height: ${CDefaultEditorHeight}px;
    background-color: #f5f5f5;
    padding: 20px;
    .tox-tinymce {
      z-index: 0;
    }
    margin-bottom: 10px;
  }

  .body-view {
    min-height: ${CDefaultEditorHeight}px;
    padding: 0px 0px 20px 0px;
    .tox-tinymce {
      border: none;
      z-index: 0;
    }
    .tox-editor-header {
      display: none;
    }
  }

  .btn-bottom {
    margin-bottom: 20px;
  }
`;
