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
    padding: 0px 20px 0px 0px;
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
  .no-cursor {
    cursor: default !important;
  }
  .vertical-bar {
    border-left: 3px solid ${PrimaryColor};
    height: 17px;
    width: 0px;
    display: inline-block;
    margin: 0px 7px;
  }
`;

export const ContentTitle = styled.div`
  margin: 60px auto 20px auto;
  font-size: 25px;
  text-align: left;
  max-width: ${CWindowWidth}px;
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
    margin: 0px 10px;
    word-wrap: break-word;
    word-break: break-all;
  }

  .label {
    font-weight: bold;
    margin-right: 10px;
    font-size: 14px;
  }
  .value {
    font-weight: normal;
    font-size: 14px;
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
      max-width: 100%;
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
    background: transparent;
    overflow: hidden;
    margin-bottom: 20px;
    max-height: 400px;
  }
  .ant-carousel .slick-dots-top {
    top: 0px;
  }
  .ant-carousel .slick-dots {
    right: auto;
    height: 50px;
    margin: 0px;
    padding-top: 12px;
    padding-left: 5%;
    padding-right: 5%;
    z-index: 0;
    li button {
      height: 10px;
	  background-color: #6e6e6e !important;
    }
    li.slick-active button {
	  background-color: #fff !important;
	  box-shadow: 1px 1px #e3e3e3;
    }
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
    background-size: 20px;
    background-position: 80% 75%;
    position: relative;
  }
  .background-heart::before {
    z-index: -1;
    opacity: 0.4;
  }

  .area-right-top {
    padding: 10px 20px;
    width: 100%;
    max-width: 300px;
	height: 130px;
    margin: auto;
    margin-top: 30px;
    border-radius: 5px;
    box-shadow: 0 2px 5px #000;
    display: block;

    .title {
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      color: ${PrimaryColor};
      margin: 0px;
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
    display: inline-block;
    width: 100%;
    font-weight: bold;
    color: ${PrimaryColor};
    font-size: 18px;
  }
  .board-title::after {
    float: right;
    line-height: 28px;
    font-weight: normal;
    color: #a9a9a9;
    font-size: 12px;
    content: '더보기 >';
  }
  .img-banner {
    height: 40px;
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
