import React, {useState, useEffect} from 'react';
import {Button, Checkbox, Form, Input} from 'antd';
import { DatePicker, Space } from 'antd';
import {isEmpty, get} from 'lodash';
import moment, {Moment} from 'moment'
import {Title, FormWrapper} from 'components/user/styles';
import {handleFieldError} from 'libs/api/errorHandle';
import {ERoute} from 'enums/route.enum';
import {TCalendar} from 'modules/information';
import {RouteMatch} from 'modules/types';
import {createSchedule, updateSchedule, getSchedule} from 'libs/api/information';
import {Row, Col} from 'antd';
import {Link, useLocation, useRouteMatch} from 'react-router-dom';
import {LockOutlined, UserOutlined, PhoneOutlined} from '@ant-design/icons';
import {useDataApi} from 'libs/hooks';
import {CDefaultDateTimeFormat} from 'constants/base.const';

const CalendarEdit = ({isEdit}: {isEdit: boolean;}) => {
  const match = useRouteMatch(`${ERoute.CalendarEdit}/:record_id`);
  let {record_id} = (match?.params as RouteMatch) || {};
  const [form] = Form.useForm();
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [fromDate, setFromDate] = useState<Moment | null>();
  const onClickAddSchedule = () => {
    form.validateFields().then(value => {
      handleAddSchedule(value as TCalendar);
    });
  };
  const [{data, loading}] = useDataApi<TCalendar>(getSchedule.bind(null, record_id), {}, isEdit);
  const handleAddSchedule = async (value: TCalendar) => {
    try {
      setSubmitButtonDisabled(true);
      isEdit === true
        ? await updateSchedule(Number(record_id), value)
        : await createSchedule(value);

      window.location.href = `${ERoute.ActivityCalendar}`;
    } catch (e) {
      handleFieldError(e, form);
      throw e;
    } finally {
      setSubmitButtonDisabled(false);
    }
  };

  useEffect(() => {
    if (isEmpty(data) === false) {
      form.setFieldsValue({
        schedule_name: get(data, 'schedule_name'),
        schedule_from: moment(get(data, 'schedule_from'), CDefaultDateTimeFormat),
        schedule_to: moment(get(data, 'schedule_to'), CDefaultDateTimeFormat),
        memo: get(data, 'memo'),
      });
    }
  }, [data]);

  function disabledDate(current: Moment) {
    if (!fromDate)
      return false;

    return current && current.date() != fromDate.date() || current.month() != fromDate.month();
  }

  function changeScheduleFrom(date: Moment | null) {
    setFromDate(date);
    if (date) {
      form.setFieldsValue({
        schedule_to: moment(date, CDefaultDateTimeFormat),
      });
    }
  }

  return (
    <FormWrapper>
      <Title>일정추가</Title>
      <Form
        form={form}
        className="form"
      >
        <Form.Item
          name={'schedule_name'}
          className="form-item"
          rules={[{required: true, message: '일정 제목을 입력해주세요' }]}
        >
          <Input
            size="large"
            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder='일정 제목'
          />
        </Form.Item>
        <Form.Item noStyle>
          <Input.Group>
            <Row justify="space-between" align="middle" gutter={16}>
              <Col span={10}>
                <Form.Item
                  name={'schedule_from'}
                  className="form-item"
                  style={{verticalAlign: 'middle'}}
                  rules={[{required: true, message: '시작 시각을 입력해주세요' }]}
                >
                  <DatePicker
                    showTime
                    size="large"
                    format={CDefaultDateTimeFormat}
                    placeholder='시작 시각'
                    onChange={changeScheduleFrom}
                  />
                </Form.Item>
              </Col>
              <Col span={4}>
                <div style={{display: 'inline-block', marginBottom: '14px', textAlign: 'center', width: '100%'}}>-</div>
              </Col>
              <Col span={10}>
                <Form.Item
                  name={'schedule_to'}
                  className="form-item"
                  style={{verticalAlign: 'middle'}}
                  rules={[{required: true, message: '종료 시각을 입력해주세요' }]}
                >
                  <DatePicker
                    showTime
                    size="large"
                    format={CDefaultDateTimeFormat}
                    placeholder='종료 시각'
                    disabledDate={disabledDate}
                    showNow={false}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Input.Group>
        </Form.Item>
        <Form.Item
          name={'memo'}
          className="form-item"
        >
          <Input.TextArea
            placeholder='메모'
            rows={6}
          />
        </Form.Item>
        <Form.Item shouldUpdate={true} className="form-button">
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              onClick={onClickAddSchedule}
              loading={submitButtonDisabled}
            >
              저장
            </Button>
          )}
        </Form.Item>
      </Form>
    </FormWrapper>
  );
}

export default CalendarEdit;
