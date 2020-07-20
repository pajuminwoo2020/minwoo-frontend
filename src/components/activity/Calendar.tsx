import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Calendar, Badge, Alert, Modal, Descriptions} from 'antd';
import {filter, get, map} from 'lodash';
import moment from 'moment';
import {useDataApi} from 'libs/hooks';
import 'moment/locale/ko';
import CalendarHeader from'components/base/CalendarHeader';
import AddressModal from 'components/modal/AddressModal';
import {TCalendar} from 'modules/information';
import {TListResponse, TListRequestParams, TModalState} from 'modules/types';
import {getCalendars, getCalendarsAll} from 'libs/api/information';
import {CDateFormat} from 'constants/base.const';

moment.locale('ko');
const CalendarWrapper = styled.div`
  .events {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .events .ant-badge-status {
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    text-overflow: ellipsis;
    font-size: 12px;
  }
  .notes-month {
    text-align: center;
    font-size: 28px;
  }
  .notes-month section {
    font-size: 28px;
  }
  /* Hide scrollbar for Chrome, Safari and Opera */
  .ant-picker-calendar-date-content {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  .ant-picker-calendar-date-content::-webkit-scrollbar {
    display: none;
  }
`;
const CalendarPage = () => {
  const today = new Date().toISOString().slice(0, 10)
  const [calendarViewModal, setCalendarViewModal] = useState<TModalState>({record: '', visible: false});
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [pannelDate, setPannelDate] = useState<string>(today);
  const getPromise = getCalendarsAll.bind(null, {
    params: {
      current: 1,
      pageSize: 100,
      selected_date: pannelDate,
    } as TListRequestParams,
  });
  const [{data, loading}, setCallback] = useDataApi<TListResponse<TCalendar>>(getPromise, {
    contents: [],
    last: false,
  });

  useEffect(() => {
    setCallback(() => getPromise);
  }, [pannelDate]);

  function getListData(value: any) {
    const listData = filter(get(data, 'contents', []), v => {
      return value.format(CDateFormat) == get(v, 'schedule_from');
    });

    return listData || [];
  }

  function dateCellRender(value: any) {
    const listData = getListData(value);
    return (
      <div
        className="ant-picker-cell-inner ant-picker-calendar-date"
        onClick={()=>{
          if (listData.length > 0)
            setCalendarViewModal({record: value.format(CDateFormat), visible: true})
        }}
      >
        <div className="ant-picker-calendar-date-value">{value.date()}</div>
        <div className="ant-picker-calendar-date-content">
          <ul className="events">
            {listData.map(item => (
              <li key={get(item, 'id')}>
                <Badge status="success" text={get(item, 'schedule_name')} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  function handleSelect(value: any) {
    setSelectedDate(value.format(CDateFormat));
  };

  function handlePanelChange(value: any) {
    setPannelDate(value.format(CDateFormat));
  };

  return (
    <CalendarWrapper>
      <Alert message={`[선택된 날짜]  ${selectedDate && moment(selectedDate).format(CDateFormat)}`}/>
      <Calendar
        dateFullCellRender={dateCellRender}
        headerRender={CalendarHeader}
        onSelect={handleSelect}
        onPanelChange={handlePanelChange}
      />
      <CalendarViewModal modalState={calendarViewModal} setModalState={setCalendarViewModal}/>
	</CalendarWrapper>
  );
}

type TModalProps = {
  modalState: TModalState;
  setModalState: React.Dispatch<React.SetStateAction<TModalState>>;
};
const CalendarViewModal = ({modalState, setModalState}: TModalProps) => {
  const [visible, setVisible] = useState(false);
  const getPromise = getCalendars.bind(null, {
    params: {
      current: 1,
      pageSize: 100,
      selected_date: get(modalState, 'record'),
    } as TListRequestParams,
  });
  const [{data, loading}, setCallback] = useDataApi<TListResponse<TCalendar>>(getPromise, {
    contents: [],
    last: false,
  });

  useEffect(() => {
    setVisible(modalState.visible);
    if (modalState.visible === true) {
      setCallback(() => getPromise);
    }
  }, [modalState.visible]);

  function handleCancel() {
    setModalState({visible: false, record: ''});
  }

  return (
    <Modal
      title={`${get(modalState, 'record')} 일정`}
      visible={visible}
      centered={true}
      maskClosable={true}
      closable={true}
      footer={null}
      onCancel={handleCancel}
    >
      {map(get(data, 'contents', []), v => (
        <Descriptions column={2} style={{marginBottom: '10px'}} bordered>
          <Descriptions.Item span={2} label="일정">{get(v, 'schedule_name')}</Descriptions.Item>
          <Descriptions.Item label="시작">{get(v, 'schedule_from')}</Descriptions.Item>
          <Descriptions.Item label="종료">{get(v, 'schedule_to')}</Descriptions.Item>
          <Descriptions.Item label="메모">
            <span style={{whiteSpace: 'pre-wrap'}}>{get(v, 'memo')}</span>
          </Descriptions.Item>
        </Descriptions>
      ))}
    </Modal>
  );
};

export default CalendarPage;
