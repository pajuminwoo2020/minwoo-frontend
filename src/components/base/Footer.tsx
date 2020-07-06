import {Col, Row, Divider} from 'antd';
import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.div`
  background-color: #424242;
  width: 100%;
  color: #bebebe;
  padding: 20px;
  font-size: 12px;

  p {
    margin: 0px;
  }

  a {
    color: #bebebe;
  }
`;

export const FooterArea = () => {
  return (
    <FooterWrapper>
      <Row gutter={20}>
        <Col span="4"></Col>
        <Col span="10">
          <p>파주여성민우회</p>
          <Divider/>
          <p>주소 : (410-837) 경기도 고양시 일산동구 무궁화로 32-21 로데오메탈릭타워 602-2호</p>
          <p>이메일 pjminwoo@hanmail.net / 대표전화 (031)907-1003 / 팩스 (031)907-5009</p>
        </Col>
        <Col span="6">
          <p style={{color: 'transparent'}}>Empty</p>
          <Divider/>
          <p><a href="/member/donation">후원하기</a></p>
          <p><a href="/intro/location">찾아오시는 길</a></p>
        </Col>
        <Col span="4"></Col>
      </Row>
    </FooterWrapper>
  );
}

export default FooterArea;
