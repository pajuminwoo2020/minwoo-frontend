import {Button, Checkbox, Input, Menu, Modal, Radio, Typography} from 'antd';
import {get} from 'lodash';
import {Link} from 'react-router-dom';
import styled, {createGlobalStyle, CSSProp} from 'styled-components';

export const size = {
  mobile: '450px',
  small_tablet: '700px',
  tablet: '1150px',
  desktop: '2560px',
};

export const device = {
  mobile: `(max-width: ${size.mobile})`,
  small_tablet: `(max-width: ${size.small_tablet})`,
  tablet: `(max-width: ${size.tablet})`,
  desktop: `(max-width: ${size.desktop})`,
};
export const PrimaryColor = '#f86e6b';
const GlobalStyles = createGlobalStyle`
  #root {
    height: 100vh;
  }

  @font-face {
    font-family:'NotoSansKR';
    src: url(${require('assets/fonts/NotoSansKR-Regular.otf')});
  }
  @font-face {
    font-family:'DMSans';
    src: url(${require('assets/fonts/DMSans-Regular.ttf')});
  }
  body {
    font-family: 'DMSans', 'NotoSansKR', sans-serif;
  }

  .ant-btn-primary {
    border-color: transparent !important;
  }

  .ant-layout {
	min-height: 100vh !important;
  }

  .ant-layout-header {
    box-shadow: 0 2px 15px 0 rgba(0,0,0,0.15);
    background-color: #fff !important;
    z-index: 10 !important;
    min-width: 430px;
  }

  .ant-menu {
    background-color: #fff !important;
  }

  .ant-menu-horizontal {
    border-bottom: 0px !important;
  }

  .ant-menu-horizontal > .ant-menu-item a {
    color: #000 !important;
  }

  .ant-menu-inline > .ant-menu-submenu > .ant-menu-submenu-title {
    height: 24px !important;
    line-height: 24px !important;
  }

  .column-right {
    text-align: right !important;
  }

  .ant-modal-body {
    padding: 24px 32px 28px 32px !important;
    background-color: #f8f8f8 !important;
  }

  .ant-descriptions-bordered {
    background-color: #ffffff !important;
  }

  .ant-modal-footer {
    padding: 0px 40px 40px 40px !important;
    background-color: #f8f8f8 !important;
    border-top: 0px !important;
  }

  .ant-pagination {
    text-align: center;
    float: none !important;
  }

  .form-item-upload-dragger .ant-form-item-control {
    display: block;
  }

  .ant-divider-horizontal {
	margin: 16px 0 !important;
  }

  .ant-table.ant-table-bordered .ant-table-container {
    border: 1px solid #dedfe1 !important;
  }

  .ant-table tbody > tr > td {
    border-bottom: 1px solid #dedfe1 !important;
  }

  .ant-table.ant-table-bordered thead > tr > th, .ant-table.ant-table-bordered tbody > tr > td, .ant-table.ant-table-bordered tfoot > tr > th, .ant-table.ant-table-bordered tfoot > tr > td {
    border-right: 0 !important;
  }

  .bs-table {
    .ant-table-row-level-1 > td {
      background-color: #f8f8f8;
    }

    th, td {
      white-space: nowrap;
    }
  }

  .sidemenu-item-group {
    .ant-menu-item-group-title {
      opacity: 0.5;
      font-size: 13px;
    }
  }

  .ant-tag {
    &.mc, &.cc, &.shared, &.ic, &.j {
      background-color: #3486d9;
      color: white;
    }
    &.requested, &.i, &.started_active_offline {
      background-color: #f5cd45;
      color: white;
    }
    &.unshared, &.editing_active_online, &.cp, &.mp, &.ip, &.u {
      background-color: #f8f8f8;
      border-color: #dedfe1;
      color: #b6b6b6;
    }
  }
  .ant-form-item-control-input {
    & > span {
      width: 100% !important;
    }
  }
  .field-required > div > label::before {
    display: inline-block;
    margin-right: 4px;
    color: #ff4d4f;
    font-size: 14px;
    font-family: SimSun, sans-serif;
    line-height: 1;
    content: '*';
  }

  .guide-popover {
    .ant-popover-arrow {
      border-color: #2eb88d !important;
    }
    .ant-popover-inner {
      background-color: #2eb88d;
    }

    .ant-popover-title {
      color: white;
      padding-top: 20px !important;
      border-bottom: 0 !important;
    }

    .guide-popover-content {
      width: 250px;
      word-break: keep-all;
      display: inline-block;
    }

    .ant-popover-inner-content {
      color: white;
      & {
        button {
          color: #ffffff !important;
        }
      }
    }
  }

  .table-control-popover {
    .ant-popover-inner-content {
      padding: 15px 16px;
    }

    .table-control-title {
      color: #979797;
      font-weight: bold;
      font-size: 11px;
    }

    .table-control-popover-content {
      width: 240px;
    }
  }

  .table-control-popover-tag.ant-tag {
    cursor: pointer;
    color: #b6b6b6;
    border: 1px solid #dedfe1;
    background-color: #f8f8f8;
    margin-bottom: 8px;
  }

  .table-control-popover-tag.ant-tag-checkable:not(.ant-tag-checkable-checked):hover, .table-control-popover-tag.ant-tag-checkable-checked {
    background-color: #ffffff;
    color: #2eb88d;
    border-color: #2eb88d;
  }

  .form-item-required {
    .ant-form-item-label > label.ant-form-item-no-colon::before {
      display: inline-block;
      margin-right: 4px;
      color: #ff4d4f;
      font-size: 14px;
      font-family: SimSun, sans-serif;
      line-height: 1;
      content: '*';
    }
  }

  .hide-on-desktop {
    display: none;
  }
  @media screen and ${device.mobile} {
    .hide-on-mobile {
      display: none;
    }
    .hide-on-desktop {
      display: block;
    }
  }

  .date-picker-dropdown {
    height: 32px;
    width: 70px;
    font-size: 14px;
    padding: 0px 5px;
    background: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
  }
  .date-picker-dropdown:hover {
    cursor: pointer;
  }
`;

export const TableWrapper = styled.div`
  .ant-table-small .ant-table-thead > tr > th {
    border-color: ${PrimaryColor};
  }
  .ant-table-thead > tr > th {
    text-align: center;
    font-weight: bold;
    color: ${PrimaryColor};
  }
  .ant-table-cell {
    a {
      display: block;
    }
  }

  .column-category {
    text-align: center;
    width: 120px;

    @media screen and ${device.mobile} {
	  width: 80px;
    }
  }
  .column-title {
    padding: 0px 20px !important;

    @media screen and ${device.tablet} {
      width: 100%;
    }
    @media screen and ${device.mobile} {
      width: 100%;
    }
  }
  .column-created-at {
    width: 120px;

    @media screen and ${device.small_tablet} {
      display: none;
    }
  }
  .column-id {
    width: 80px;
    @media screen and ${device.mobile} {
	  width: 50px;
    }
  }
  .column-hit-count {
    width: 80px;

    @media screen and ${device.small_tablet} {
      display: none;
    }
  }
  .column-created-by {
    width: 150px;

    @media screen and ${device.small_tablet} {
      display: none;
    }
  }
  .title-category {
    font-weight: normal;
    color: #bebebe;
  }

  td.ant-table-cell.column-created-at {
    text-align: center;
    color: #a9a9a9;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  td.ant-table-cell.column-hit-count {
    text-align: center;
    color: #a9a9a9;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  td.ant-table-cell.column-created-by {
    text-align: center;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  td.ant-table-cell.column-id {
    text-align: center;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
`;

export const TableHeaderWrapper = styled.div`
  width: 100%;
  display: inline-block;
  margin-bottom: 20px;

  .search-input {
    float: left;
    max-width: 300px;
  }
  .add-button {
    display: inline-block;
    float: right;

    @media screen and ${device.tablet} {
      display: block;
    }
  }
`;

export const CardWrapper = styled(Link)`
  width: 100%;
  overflow: hidden;
  display: block;
  position: relative;

  .ant-card-cover > * {
    position: absolute;
    width: 100%;
  }

  .ant-card {
    width: 100%;
    height: 270px;
    overflow: hidden;
    margin: 0px auto;
  }
  .ant-card.large {
    height: 314px;
  }

  .ant-card-body {
    font-size: 12px;
    position: absolute;
    background-color: #fff;
    width: 100%;
    bottom: 0;
  }

  .ant-card-meta-title {
    font-size: 15px;
    font-weight: bold;
    height: 40px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-box-pack: center;
    -webkit-line-clamp: 2;
    word-break: break-word;
    white-space: normal;
    line-height: 22px;
    overflow: hidden;
  }

  .ant-card-meta-title:hover {
    color: ${PrimaryColor};
  }

  .title-category {
    font-size: 12px;
    font-weight: normal;
    color: ${PrimaryColor};
  }
`;

export const SignatureWrapper = styled.div`
  border-radius: 4px;
  border: solid 1px #dedfe1;
  background-color: #f8f8f8;
  max-width: 400px;
  height: 220px;
  .sig-canvas {
    width: 98%;
    height: 95%;
  }
`;

export default GlobalStyles;
