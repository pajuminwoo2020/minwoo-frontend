import React, { useState } from 'react';
import { Tabs, Timeline } from 'antd';
import { getHistories } from 'libs/api/information';
import { useDataApi } from 'libs/hooks';
import { TListResponse } from 'modules/types';
import { InformationHistory } from 'modules/information/types'
import { get, map } from 'lodash';



const { TabPane } = Tabs;


const History = () => {
  const [{data, loading}] = useDataApi<TListResponse<InformationHistory>>(getHistories.bind(null, {
    params: {
	current: 1,
	pageSize: 999
  }}));
	
  const histories = get(data,'contents',[])
  return (
	<>
	<Tabs defaultActiveKey="1">
	<TabPane tab="2020" key="1">
	  <Timeline mode="alternate">
        {map(get(data, 'contents', []).filter(v => v.year===2020), v => <Timeline.Item>{get(v, 'body')}</Timeline.Item>)}
    </Timeline>
    </TabPane>
    </Tabs>
  <br></br>
  <p></p>  
  </>
  );
}

export default History;
