import React, {useState, useEffect} from 'react';
import {Button, Checkbox, Form, Input, Card } from 'antd';
import {get} from 'lodash';
import styled from 'styled-components';
import MapSubway from 'assets/map-subway.png'
import MapBus from 'assets/map-bus.png'
import MapCar from 'assets/map-car.png'
import Map1 from 'assets/map1.png';
import Map2 from 'assets/map2.png';
import {shallowEqual, useSelector} from 'react-redux';
import {RootState} from 'modules';
import Configs from 'config';
import GoogleMapReact from 'google-map-react';

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
  const information = useSelector((state: RootState) => state.information.info, shallowEqual);
  function renderMarkers(map: any, maps: any) {
    let marker = new maps.Marker({
      position: {lat: Number(get(information, 'location_latitude')), lng: Number(get(information, 'location_longitude'))},
      map,
      title: '파주여성민우회',
    });
  }

  return (
    <LocationWrapper>
      <div className = "location_name_title">
        <p>파주여성민우회</p>
        <p>파주여성민우회 부설 성폭력상담소</p>
      </div>
      <div className = "location_address_div">
        <p style={{marginBottom: '3px'}}>
          <div className="location_address_title"> 도로명 주소</div>
          <span>{get(information, 'address_street')}</span>
        </p>
        <p>
          <div className="location_address_title"> 지번 주소</div>
          <span>{get(information, 'address_jibun')}</span>
        </p>
      </div>
      <div style={{height: '400px', maxWidth: '600px', marginBottom: '20px'}}>
        {get(information, 'location_latitude', 0) && (
        <GoogleMapReact
          bootstrapURLKeys={{key: Configs.GOOGLE_API_KEY}}
          defaultCenter={{lat: Number(get(information, 'location_latitude')), lng: Number(get(information, 'location_longitude'))}}
          defaultZoom={17}
          onGoogleApiLoaded={({map, maps}: any) => renderMarkers(map, maps)}
          yesIWantToUseGoogleMapApiInternals
        >
        </GoogleMapReact>
      )}
      </div>
      <ul className = "traffic_ul">
        <li className = "traffic_li" style={{backgroundImage: `url(${MapSubway})`}}>
          <p style={{color :"#00b5ad", fontWeight :"bolder"}}>
            지하철 이용
          </p>
          <p style={{marginBottom:15}}>
            <div dangerouslySetInnerHTML={{__html: `${get(information, 'location_subway')}`}}/>
          </p>
        </li>
        <li className = "traffic_li" style={{backgroundImage: `url(${MapBus})`}}>
          <p style={{color :"#447fc1", fontWeight :"bolder"}}>
            버스 이용
          </p>
          <p style={{marginBottom:15}}>
            <div dangerouslySetInnerHTML={{__html: `${get(information, 'location_bus')}`}}/>
          </p>
        </li>
        <li className = "traffic_li" style={{backgroundImage: `url(${MapCar})`}}>
          <p style={{color :"#d7a52a", fontWeight :"bolder"}}>
              차량 이용
          </p>
          <p style={{marginBottom:15}}>
            <div dangerouslySetInnerHTML={{__html: `${get(information, 'location_car')}`}}/>
          </p>
        </li>
      </ul>
    </LocationWrapper>
  );
}

export default Location;
