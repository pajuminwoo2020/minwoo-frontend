import React from 'react';
import styled from 'styled-components';
import {device, PrimaryColor} from 'GlobalStyles';
import {CDefaultEditorHeight, CWindowWidth} from 'constants/base.const';
import HeartSource from 'assets/heart.png';

export const HeaderWrapper = styled.div`
  height: 70px;

  .ant-layout-header {
    background-color: transparent;
    height: 70px;
    line-height: 70px;
    padding: 0px 20px;
	max-width: 100%;
	width: 100%;
	position: fixed;
    z-index: 1;
    margin: 0px auto;
    @media screen and (max-width: 420px) {
      padding 0px 60px 0px 5px
    }
    @media screen and (max-width: 370px) {
      padding 0px 100px 0px 5px
    }
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
`;

export const ContentTitle = styled.div`
  margin: 60px auto 20px auto;
  font-size: 25px;
  text-align: left;
  max-width: ${CWindowWidth};
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
    .label, .value {
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
    padding: 20px 40px;
    overflow-x: hidden;
    .tox-tinymce {
      border: none;
      z-index: 0;
    }
    .tox-editor-header {
      display: none;
    }
    img {
      width: 100%;
      height: auto;
    }
  }

  .btn-bottom {
    padding-top: 20px;
    margin-bottom: 20px;
    border-top: 1px solid #ccc;
  }

  .box-attachments {
    font-weight: bold;
    background-color: #f5f5f5;
    padding: 15px 20px;

    .file-name {
      font-weight: normal;
      display: block;
    }
  }
`;

export const MainWrapper = styled.div`
  padding: 20px 0px;

  .ant-carousel .slick-slide {
    text-align: center;
    line-height: 160px;
    background: transparent;
    overflow: hidden;
    margin-bottom: 20px;
    max-height: 320px;
  }

  .ant-carousel img {
    margin: auto;
	width: 99%;
	height: auto;
  }
  .ant-carousel {
    overflow: hidden;
    height: webkit-fit-content;
    @media screen and ${device.mobile} {
      height: 200px;
    }
  }

  .background-heart {
    background-image: url(${HeartSource});
    background-repeat: no-repeat;
    background-size: 30px;
    background-position: 80% 70%;
    position: relative;
  }
  .background-heart::before {
    z-index: -1;
    opacity: 0.4;
  }

  .area-right-top {
    padding: 0px 20px;
    width: 100%;
    max-width: 300px;
	height: 150px;
    margin: auto;
    border-radius: 5px;
    box-shadow: 0 2px 5px #000;
    display: block;

    .title {
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      color: ${PrimaryColor};
      margin: 10px 0px;
    }

    p {
      text-align: left;
      display: block;
      margin: 0px;
      padding: 2px;
    }

    ul {
      padding: 0px 20px;
    }
  }

  .ant-list-sm .ant-list-item {
	padding: 6px 0px;
  }

  .ant-divider-horizontal {
	margin: 5px 0px 20px 0px !important;
	border-top: 1px solid ${PrimaryColor};
  }

  .mark {
	margin-right: 5px;
	color: ${PrimaryColor};
	font-weight: bold;
  }

  .red mark {
    color: #fff;
	background-color: ${PrimaryColor} !important;
  }
  .blue mark {
    color: #fff;
	background-color: #0dbeb5 !important;
  }

  .title {
	vertical-align: sub;
	width: 100%;
	text-overflow: ellipsis;
	display: -webkit-inline-box;
	-webkit-box-orient: vertical;
	-webkit-box-pack: center;
	-webkit-line-clamp: 1;
	word-break: break-word;
	white-space: normal;
	overflow: hidden;
  }
  .title:hover {
    color: ${PrimaryColor};
  }
  .board-title {
    font-weight: bold;
    color: ${PrimaryColor};
    font-size: 18px;
  }
  .img-banner {
    height: auto;
    width: 100%;
    margin: auto;
  }
}
`;

export const HistoryWrapper = styled.div`
  .year {
    color: ${PrimaryColor};
    text-align: center;
    font-size: 60px;
  }
  .year.row1 {
    color: #ffe58f;
  }
  .year.row2 {
    color: #0dbeb5;
  }
  .memo-wrapper {
    font-size: 15px;
    display: block;
    border-radius: 10px;
    background-color: #f1f1f1;
    padding: 10px 30px;
  }
`;
