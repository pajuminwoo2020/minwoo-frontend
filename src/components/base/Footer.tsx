import {Col, Row, Divider} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import LogoWhiteSource from 'assets/logo-white.png';
import {ERoute} from 'enums/route.enum';
import {CAddressStreet, CEmail, CPhone, CFax, CBankAccount, CWindowWidth} from 'constants/base.const';

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
      <Row gutter={20} style={{width: CWindowWidth, margin: '0px auto'}}>
        <Col md={{span: 24}} lg={{span: 12}}>
          <img className="block-title" src={LogoWhiteSource} style={{width: 'auto', height: '20px'}}/>
          <p className="block-title">파주여성민우회</p>
          <Divider/>
          <p>주소 : {CAddressStreet}</p>
          <p>이메일 {CEmail} / 대표전화 {CPhone} / 팩스 {CFax}</p>
          <p>[후원계좌] {CBankAccount}</p>
        </Col>
        <Col md={{span: 24}} lg={{span: 6}}>
          <p className="block-title" style={{color: 'transparent'}}>Empty</p>
          <Divider/>
          <p><Link to={ERoute.IntroAbout}>단체소개</Link></p>
          <p><Link to={ERoute.ActivityDonation}>후원하기</Link></p>
          <p><Link to={ERoute.IntroLocation}>찾아오시는 길</Link></p>
        </Col>
        <Col md={{span: 24}} lg={{span: 6}}>
          <p className="block-title" style={{color: 'transparent'}}>Empty</p>
          <Divider/>
          <p><Link to={ERoute.Privacy}>개인정보보호정책</Link></p>
          <p><Link to={ERoute.Agreement}>이용약관</Link></p>
        </Col>
      </Row>
    </FooterWrapper>
  );
}

export default FooterArea;
