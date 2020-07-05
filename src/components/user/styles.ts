import {Layout, Typography} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {device} from 'GlobalStyles';

const {Text} = Typography;
export const BoxWidth = '420px';
export const BoxPadding = '46px';

export const FormWrapper = styled.div`
  margin-left: 100px;

  padding: 40px ${BoxPadding};

  @media ${device.mobile} {
    min-width: 350px;
    padding: 40px 26px;
    margin-left: 0px;
  }

  @media ${device.tablet} {
    width: ${BoxWidth};
    margin-left: 100px;
  }

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
  min-height: 70px;
  padding: 20px 0px;
  white-space: pre-line;
`;