import React, {useState, useEffect} from 'react';
import {Button, Checkbox, Form, Input, Card, Tabs, Row, Col, Divider, List, Typography  } from 'antd';
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
import {PeopleWrapper} from 'components/intro/styles'
import styled from 'styled-components';
import MapSubway from 'assets/map-subway.png'
import MapBus from 'assets/map-bus.png'
import MapCar from 'assets/map-car.png'
import Group from 'assets/intro-group-2020.png'
import Red from 'assets/Ellipse-red.png'
import {TBoardDetail} from 'modules/board';
import {TPeople} from 'modules/people';
import {TListResponse, TPagination, RouteMatch} from 'modules/types';
import {
	getPeoples,
  } from 'libs/api/people';
const { TabPane } = Tabs;



const data1 = [
	'Racing car sprays burning fuel into crowd.',
	'Japanese princess to wed commoner.',
	'Australian walks 100km after outback crash.',
	'Man charged over missing wedding girl.',
	'Los Angeles battles huge | wildfires.',
  ];
const People = () => {

const getPromise = getPeoples.bind(null,{
    params: {
      current: 1,
      pageSize: 10,
	},
}
);
const [{data, loading}] = useDataApi<TListResponse<TPeople>>(getPromise, {
    contents: [],
    last: false,
  });

  return (
<PeopleWrapper>
    <Tabs defaultActiveKey="1" type ="card" tabBarGutter ={-1} style={{marginTop:37}}>
    	<TabPane tab="조직도/활동가 및 임원" key="1">
			<div style={{margin:40, fontSize:36, fontWeight:"bolder", color:"#666666", textAlign:"center"}}>
				<h4>함께하는 사람들</h4>
			</div>
			<Divider style={{color:'#f4f1db'}}>

			</Divider>
			<Row style={{marginBottom:20, marginTop:20, paddingBottom:20}}>
				<Col span={3}>
					<h4 style={{backgroundImage : `url(${Red})`, float:"left", width:100, height:100, paddingTop:40, textAlign:"center", color:"#f86e6b", fontWeight:"bolder" }}>이사</h4>
				</Col>
				<Col span={9} style={{position:"relative"}}>
					
						<List					
							dataSource={get(data, 'contents')}
							split = {false}
							size ="small"
							style={{position:"absolute", top:"35%"}}
						
							renderItem={item => {
								
								if(get(item, 'department') == '대표')
								return (
								<List.Item >
									{get(item, 'name')} | {get(item, 'position')}
								</List.Item>
								)
							}}
						/>	
					
				</Col>
			</Row>
			<Divider style={{color:'#f4f1db'}}>

			</Divider>
			<Row style={{marginBottom:20, marginTop:20, paddingBottom:20}}>
				<Col span={3}>
					<h4 style={{backgroundImage : `url(${Red})`, float:"left", width:100, height:100, paddingTop:40, textAlign:"center", color:"#f86e6b", fontWeight:"bolder" }}>이사</h4>
				</Col>
				<Col span={9}   >
					
						<List					
							dataSource={get(data, 'contents')}
							split = {false}
							size ="small"
							loading = {loading}
							
						
							renderItem={item => {
								
								if(get(item, 'department') == 'DB3-1팀')
								return (
								<List.Item >
									{get(item, 'name')} | {get(item, 'position')}
								</List.Item>
								)
							}}
						/>
					
				</Col>
				<Col span={3}>
					<h4 style={{backgroundImage : `url(${Red})`, float:"left", width:100, height:100, paddingTop:40, textAlign:"center", color:"#f86e6b", fontWeight:"bolder" }}>이사</h4>
				</Col>
				<Col span={9}>

				</Col>
			</Row>
			<Row style={{marginBottom:20, marginTop:20, paddingBottom:20}}>
				<Col span={3}>
					<h4 style={{backgroundImage : `url(${Red})`, float:"left", width:100, height:100, paddingTop:40, textAlign:"center", color:"#f86e6b", fontWeight:"bolder" }}>이사</h4>
				</Col>
				<Col span={9}>

				</Col>
			</Row>
			<Divider style={{color:'#f4f1db'}}>

			</Divider>
			<Row style={{marginBottom:20, marginTop:20, paddingBottom:20}}>
				<Col span={3}>
					<h4 style={{backgroundImage : `url(${Red})`, float:"left", width:100, height:100, paddingTop:40, textAlign:"center", color:"#f86e6b", fontWeight:"bolder" }}>이사</h4>
				</Col>
				<Col span={9}>
					<ul style={{float:"left", fontSize:14, color:"#6e6e6e", listStyle:"none"}}>
						<li>
							김민문정
						</li>
						<li>
							김수아
						</li>
						<li>
							석재은
						</li>
						<li>
							심미선
						</li>
						<li>
							이임혜경
						</li>
						<li>
							장임다혜
						</li>
						<li>
							정연보
						</li>
						<li>
							정형옥
						</li>
						<li>
							조인섭
						</li>
					</ul>
				</Col>
				<Col span={3}>
					<h4 style={{backgroundImage : `url(${Red})`, float:"left", width:100, height:100, paddingTop:40, textAlign:"center", color:"#f86e6b", fontWeight:"bolder" }}>이사</h4>
				</Col>
				<Col span={9}>

				</Col>
			</Row>
		
			
				
		</TabPane>
    	<TabPane tab="지부" key="2">
      		Content of Tab Pane 2
    	</TabPane>
    </Tabs>
</PeopleWrapper>
  );
}

export default People;
