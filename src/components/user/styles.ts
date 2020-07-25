import {Layout, Typography} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {device} from 'GlobalStyles';

const {Text} = Typography;
export const BoxWidth = '420px';
export const BoxPadding = '46px';

export const FormWrapper = styled.div`
  margin: auto;
  overflow: hidden;
  padding: 40px ${BoxPadding};

  @media ${device.mobile} {
    width: 100%;
    padding: 40px 26px;
  }

  @media ${device.tablet} {
    max-width: ${BoxWidth};
    margin: auto;
  }

  .form {
    max-width: 450px;
    margin: 0 auto;
  }
  .form-button {
    margin-top: 30px;
    margin-bottom: 10px;
    & button {
      width: 100%;
    }
    button:disabled {
      background-color: #dedfe1 !important;
    }
  }
  .form-item {
    margin-bottom: 14px;
  }

  .form-bottom {
    .ant-form-item {
      display: inline-block;
    }
  }
  .ant-form-item-extra {
    font-size: 13px;
    margin-top: 2px;
    padding-left: 3px;
  }
`;

export const Title = styled(Text)`
  display: block;
  font-size: 23px;
  min-height: 70px;
  max-width: 450px;
  padding: 20px 0px;
  margin: auto;
  white-space: pre-line;
`;
