import React, {useState, useEffect} from 'react';
import {Button, Checkbox, Form, Input, Card } from 'antd';
import {get} from 'lodash';
import styled from 'styled-components';
import MapSubway from 'assets/map-subway.png'
import MapBus from 'assets/map-bus.png'
import MapCar from 'assets/map-car.png'
import Map1 from 'assets/map1.png';
import Map2 from 'assets/map2.png';
import {CAddressStreet, CAddressJibun} from 'constants/base.const';

export const LocationWrapper = styled.div`
  .location_name_title {
    padding-left : 35px;
    margin-bottom :25px;
    background-image : url(${Map1});
    background-repeat : no-repeat;
    background-position : top left;
    background-position-y :3px;
    background-size : 16px;
    p {
      margin-bottom: 4px;
    }
  }
  .location_address_div {
    padding-left : 35px;
    margin-bottom : 25px;
    background-image: url(${Map2});
    background-repeat : no-repeat;
    background-position : top left;
    background-position-y : 3px;
    background-size : 13px;
  }
  .location_address_title {
    display: inline-block;
    font-weight : bold;
    width: 80px;
  }
  .traffic_ul {
    margin-bottom : 70px;
    padding-top : 40px;
    padding-left : 0px;
    border-top-color : #eeeeee;
    border-top-width : 1px;
    border-top-style : solid;
  }
  .traffic_li {
    padding-left : 165px;
    margin-bottom : 60px;
    background-repeat : no-repeat;
    background-position : center left;
    list-style : none;
    background-size : 140px;
    min-height : 140px;
  }
`;
const Location = () => {

  return (
    <LocationWrapper>
      <div className = "location_name_title">
        <p>파주여성민우회</p>
        <p>파주여성민우회 부설 성폭력상담소</p>
      </div>
      <div className = "location_address_div">
        <p style={{marginBottom: '3px'}}>
          <div className="location_address_title"> 도로명 주소</div>
          <span>{CAddressStreet}</span>
        </p>
        <p>
          <div className="location_address_title"> 지번 주소</div>
          <span>{CAddressJibun}</span>
        </p>
      </div>
      <ul className = "traffic_ul">
        <li className = "traffic_li" style={{backgroundImage: `url(${MapSubway})`}}>
          <p style={{color :"#00b5ad", fontWeight :"bolder"}}>
            지하철 이용
          </p>
          <p style={{marginBottom:15}}>
            망원역 1번출구 우회전 → [망원우체국교차로]까지 275m 이동 → 횡단보도 이용 후 [노랑통닭과 닭갈비]까지 직진후 우회전 진입 → [시민공간 나루]까지 234m<br/><br/>
          </p>
        </li>
        <li className = "traffic_li" style={{backgroundImage: `url(${MapBus})`}}>
          <p style={{color :"#447fc1", fontWeight :"bolder"}}>
            버스 이용
          </p>
          <p style={{marginBottom:15}}>
            <strong>271</strong> 성산시장입구역 하차 후 도보 5분 <br/>
            <strong>7013A/B</strong> 성서초등학교역 하차 후 도보 3분 <br/><br/>
          </p>
        </li>
        <li className = "traffic_li" style={{backgroundImage: `url(${MapCar})`}}>
          <p style={{color :"#d7a52a", fontWeight :"bolder"}}>
              차량 이용
          </p>
          <p style={{marginBottom:15}}>
          망원우체국 서교동(연남동) 방면 227m 직진 → 성미산로 5길(작은나무카페와 세븐일레븐 사이골목) 좌회전 후 97m → 월드컵로26길(작은 사거리) 좌회전 후 48m 이동 → 시민공간 나루 3층 <br/><br/>
          *주차공간이 협소하니 되도록 대중교통을 이용해 주시기 바랍니다.
          </p>
        </li>
      </ul>
    </LocationWrapper>
  );
}

export default Location;
