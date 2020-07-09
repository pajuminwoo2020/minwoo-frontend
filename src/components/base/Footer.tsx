import {Col, Row, Divider} from 'antd';
import React from 'react';
import styled from 'styled-components';
import LogoWhiteSource from 'assets/logo-white.png';
import {ERoute} from 'enums/route.enum';

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

  .block-title {
    display: inline-block;
    padding: 0px 3px;
    font-weight: bold;
    font-size: 14px;
  }
`;

export const FooterArea = () => {
  return (
    <FooterWrapper>
      <Row gutter={20}>
        <Col span="4"></Col>
        <Col md={{span: 24}} lg={{span: 12}}>
          <img className="block-title" src={LogoWhiteSource} style={{width: 'auto', height: '20px'}}/>
          <p className="block-title">파주여성민우회</p>
          <Divider/>
          <p>주소 : (410-837) 경기도 고양시 일산동구 무궁화로 32-21 로데오메탈릭타워 602-2호</p>
          <p>이메일 pjminwoo@hanmail.net / 대표전화 (031)907-1003 / 팩스 (031)907-5009</p>
          <p>[후원계좌] 국민은행 813-25-0011-869 (예금주 한국여성민우회)</p>
        </Col>
        <Col md={{span: 24}} lg={{span: 4}}>
          <p className="block-title" style={{color: 'transparent'}}>Empty</p>
          <Divider/>
          <p><a href={ERoute.MemberDonation}>후원하기</a></p>
          <p><a href={ERoute.IntroLocation}>찾아오시는 길</a></p>
        </Col>
        <Col span="4"></Col>
      </Row>
    </FooterWrapper>
  );
}

export default FooterArea;
