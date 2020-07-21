import React, {useState, useEffect} from 'react';
import {Button, Checkbox, Form, Input, Card } from 'antd';
import { usePagination, useDataApi } from 'libs/hooks';
import {TUserLogin} from 'modules/user';
import {getUser} from 'libs/api/user';
import {getLocation} from 'libs/api/location'
import {TUser} from 'modules/user/types';
import {TLocation} from 'modules/location/types';
import {get} from 'lodash';
import { render } from 'react-dom';
import LogoSource from 'assets/logo.png'
import GlobalStyles from 'GlobalStyles'
import {LocationWrapper} from 'components/intro/styles'
import styled from 'styled-components';
import MapSubway from 'assets/map-subway.png'
import MapBus from 'assets/map-bus.png'
import MapCar from 'assets/map-car.png'
const Location = () => {
	const [form] = Form.useForm();
	const[count, setCount] = useState(0);
 	const onClickSome = () => {//딱히 이 url 접속시 특정 click 을 통해 수행해야할 것이 없어서 작업없어도 될듯. 
	};
	const [pagination, setpagination] = usePagination();

	const getPromise = getLocation.bind(null, );

	const [{data, loading}, setCallback] = useDataApi<TLocation>(getPromise, {
		location_name: "",
    	location_roadname : "",
    	location_lotnumber : "",
    	byTrain : "",
    	byBus : "",
    	byCar : "",
	});

	
	
	//useEffect(() => {
	//	setCallback(() => getPromise);
	//}, );
	// LogoSource -> `$`
	//<div style={{paddingLeft : 35, marginBottom:25, backgroundImage: `url(${LogoSource})`, backgroundRepeat : "no-repeat", backgroundPosition: "top left",
	//				backgroundPositionY:3, backgroundSize : 16}}> 
  return (
	<>
		<LocationWrapper>
		<div className = "location_name_title"> 
			<p> 한국여성민우회</p>
			<p> 한국여성민우회 부설 미디어운동본부</p>
			<p> 한국여성민우회 부설 성폭력상담소</p>
		</div>
		<div className = "location_address_div"> 
			<ul className = "location_address_title">
				<li style={{}}> 도로명 주소</li>
				<li> 지번 주소</li>
			</ul>
			<ul className = "location_address_body">
				<li> [03969] 서울 마포구 월드컵로 26길 39 시민공간 나루 3층</li>
				<li> [03969] 서울 마포구 성산1동 249-10 시민공간 나루 3층</li>
			</ul>
		</div>
			<ul className = "traffic_ul">
		  		<li className = "traffic_li" style={{backgroundImage: `url(${MapSubway})`}}>
					<p style={{color :"#00b5ad", fontWeight :"bolder"}}>
						지하철 이용
					</p>
					<p style={{marginBottom:15}}>
						{get(data, 'text_a')}
						6호선 망원역 1번출구 하차 후 도보 15분<br/>
						망원역 1번출구 우회전 → [망원우체국교차로]까지 275m 이동 → 횡단보도 이용 후 [노랑통닭과 닭갈비]까지 직진후 우회전 진입 → [시민공간 나루]까지 234m<br/><br/>
						*골목 진입 후 직진 하시다보면 주택가 골목이 펼쳐집니다. 그래서 걷다보면 민우회 사무실이 있을지 의심이 들기 시작합니다. 바로 그때 조금만 더 걸어오시면 ‘나루’ 건물이 나옵니다.<br/>
					</p>
				</li>
				<li className = "traffic_li" style={{backgroundImage: `url(${MapBus})`}}>
					<p style={{color :"#447fc1", fontWeight :"bolder"}}>
						버스 이용
					</p>
					<p style={{marginBottom:15}}>
						<b>지선버스</b><br/>
						271 성산시장입구역 하차 후 도보 5분 <br/>
						7013A/B 성서초등학교역 하차 후 도보 3분 <br/><br/>
						<b>마을버스</b><br/>
						마포09 망원우체국역 하차 후 도보 7분<br/>
						마포08, 마포15 성서초등학교역 하차 후 도보 7분<br/>

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
	</>
  );
}

export default Location;
