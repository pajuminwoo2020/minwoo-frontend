import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import minwoo_intro from 'assets/minwoo_intro.png'

const { TabPane } = Tabs;

function callback(key: string) {
	console.log(key);
}

//ReactDOM.render(<Demo />, document.getElementById('container'));

const About = () => {
	return (
		<>
			<Tabs defaultActiveKey="1" onChange={callback}>
				<TabPane tab="소개" key="1">
					<div>
					민우회는 당신의 목소리가, 삶이 곧 운동이 되는 곳<br />
					지금보다 좀 더 나은, 다른 세상을 꿈꾸는 당신과 함께 합니다.<br />
					한국여성민우회는<br />
					차별 없이 평등하게 공존하는 세상을 향해 각자의 존엄성을 지키며<br />
					성평등한 노동권, 일과 생활의 균형을 위한 활동<br />
					여성이 자신의 몸과 건강의 주체가 되는 활동<br />
					성인지적 관점으로 미디어감시 활동<br />
					성평등 관점으로 복지국가를 기획하는 활동<br />
					성폭력 없는 세상을 만드는 반성폭력 활동<br />
					더불어 사는 민주사회를 위한 사회개혁 활동<br />
					풀뿌리로부터의 변화를 만드는 신나는 지역여성운동을 만들어 갑니다.<br />
					<img src={minwoo_intro} />
					</div>
				</TabPane>
				<TabPane tab="창립선언문 & 회원다짐" key="2">
					Content of Tab Pane 2
    			</TabPane>
				<TabPane tab="정관 & 운영규정" key="3">
					Content of Tab Pane 3
    			</TabPane>
			</Tabs>
		</>
	);
}

export default About;
