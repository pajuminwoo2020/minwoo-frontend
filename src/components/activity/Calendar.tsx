import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Calendar, Badge, Alert, Modal, Descriptions, Skeleton, Button, Row, Col} from 'antd';
import {useRouteMatch, Link} from 'react-router-dom';
import {filter, get, map} from 'lodash';
import moment from 'moment';
import {useDataApi} from 'libs/hooks';
import CalendarHeader from'components/base/CalendarHeader';
import AddressModal from 'components/modal/AddressModal';
import {TCalendar} from 'modules/information';
import {TListResponse, TListRequestParams, TModalState, TModalProps} from 'modules/types';
import {getCalendars, getCalendarsAll, deleteSchedule} from 'libs/api/information';
import {CDateFormat} from 'constants/base.const';
import {showConfirm} from 'components/modal/showConfirm';
import {getLocalDate} from 'libs/utils';
import {ERoute} from 'enums/route.enum';
import {usePermission} from 'libs/hooks';
import {PlusOutlined} from '@ant-design/icons/lib';

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
  .search-input {
    display: flex;
    flex: 1;
  }
  .add-button {
    display: inline-block;
    flex: 1;
    float: right;
  }
`;
const CalendarPage = () => {
  const today = getLocalDate();
  const [calendarViewModal, setCalendarViewModal] = useState<TModalState>({record: '', visible: false});
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [pannelDate, setPannelDate] = useState<string>(today);
  const {boardManagementPermission} = usePermission();

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
  }

  function handlePanelChange(value: any) {
    setPannelDate(value.format(CDateFormat));
  }

  return (
    <CalendarWrapper>
      {boardManagementPermission &&
        <Link to={`${ERoute.CalendarCreate}`}>
          <Button
            className="add-button"
            type="primary"
            size="large"
            icon={<PlusOutlined />}
          >
            일정추가
          </Button>
        </Link>
      }
      <Alert
        message={`[선택된 날짜]  ${selectedDate && moment(selectedDate).format(CDateFormat)}`}
        className="search-input"
      >
      </Alert>
      <Calendar
        dateFullCellRender={dateCellRender}
        headerRender={CalendarHeader}
        onSelect={handleSelect}
        onPanelChange={handlePanelChange}
      />
      <CalendarViewModal modalState={calendarViewModal} setModalState={setCalendarViewModal} />
    </CalendarWrapper>
  );
}

const CalendarViewModal = ({modalState, setModalState}: TModalProps) => {
  const [visible, setVisible] = useState(false);
  const {boardManagementPermission} = usePermission();
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

  async function onClickDelete(id: number) {
    try {
      await deleteSchedule(id);

      window.location.href = `${ERoute.ActivityCalendar}`;
    } catch (e) {
      throw e;
    }
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
      {loading === true ? (
        <Skeleton active title={false} paragraph={{rows: 4}} />
      ) : (
        <>
          {map(get(data, 'contents', []), v => (
            <>
              <Descriptions column={{xs:1, sm:1, md:2, lg:2, xl:2}} style={{marginBottom: '10px'}} bordered>
                <Descriptions.Item span={2} label="일정">{get(v, 'schedule_name')}</Descriptions.Item>
                <Descriptions.Item label="시작">{get(v, 'schedule_from')}</Descriptions.Item>
                <Descriptions.Item label="종료">{get(v, 'schedule_to')}</Descriptions.Item>
                <Descriptions.Item label="메모">
                  <span style={{whiteSpace: 'pre-wrap'}}>{get(v, 'memo')}</span>
                </Descriptions.Item>
              </Descriptions>
              {boardManagementPermission &&
                <Row justify="end" gutter={[16, 0]} style={{margin: '0px 0px 10px 0px'}}>
                  <Col>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => showConfirm(() => onClickDelete(get(v, 'id')), '일정을 삭제하시겠습니까?')}
                  >
                    삭제
                  </Button>
                </Col>
                <Col>
                  <Link to={`${ERoute.CalendarEdit}/${get(v, 'id')}`}>
                    <Button type="primary" size="small">
                      수정
                    </Button>
                  </Link>
                </Col>
                </Row>
              }
            </>
          ))}
        </>
      )}
    </Modal>
  );
};

export default CalendarPage;
