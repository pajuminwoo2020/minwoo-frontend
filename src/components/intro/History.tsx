import React, { useState } from 'react';
import {Timeline, Typography} from 'antd';
import {getMainHistories} from 'libs/api/information';
import {useDataApi} from 'libs/hooks';
import {TListResponse} from 'modules/types';
import {TInformationHistory} from 'modules/information/types'
import {get, map} from 'lodash';
import {HistoryWrapper} from 'components/base/styles';

const {Title} = Typography;
const History = () => {
  const [{data, loading}] = useDataApi<TInformationHistory>(getMainHistories.bind(null));

  const histories = get(data,'contents',[])
  return (
    <HistoryWrapper>
      {map(data, yearData =>
        <>
          <Title className='year'>{get(yearData, 'year')}</Title>
          <Timeline mode="alternate">
            {map(get(yearData, 'children', []), v =>
              <Timeline.Item>
                <div className='memo-wrapper'>{get(v, 'memo')}</div>
              </Timeline.Item>
            )}
          </Timeline>
        </>
      )}
    </HistoryWrapper>
  );
}

export default History;
