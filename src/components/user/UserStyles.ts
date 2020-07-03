import {Layout, Typography} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {device} from 'GlobalStyles';

const {Text} = Typography;
export const BoxWidth = '420px';
export const BoxPadding = '46px';

export const FormWrapper = styled.div`
  background-color: #f8f8f8;
  padding: 40px ${BoxPadding};

  @media ${device.mobile} {
    min-width: 350px;
    padding: 40px 26px;
  }

  @media ${device.tablet} {
    width: ${BoxWidth};
  }

  border-radius: 6px;
  box-shadow: 0 7px 12px 0 rgba(38, 52, 64, 0.9);
  overflow: hidden;

  .form {
    max-width: 500px;
    margin: 0 auto;
  }
  .form-button {
    margin-top: 10px;
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
`;

export const Title = styled(Text)`
  display: block;
  font-size: 23px;
  color: #000000;
  margin-bottom: 23px;
  background-color: #fff;
  margin: -40px -46px 23px -46px;
  min-height: 70px;
  padding: 20px 46px;
  white-space: pre-line;

  .subtitle {
    font-size: 13px;
    color: #979797;
    display: block;
  }
`;
