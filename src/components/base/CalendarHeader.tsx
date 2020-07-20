import React, {useState} from 'react';
import {Col, Select, Row, Typography, Radio} from 'antd';

const CalendarHeader = ({value, type, onChange, onTypeChange}: any) => {
  const start = 0;
  const end = 12;
  const monthOptions = [];
  const current = value.clone();
  const localeData = value.localeData();
  const currentYear = new Date().getFullYear();
  const months = [];

  for (let i = 0; i < 12; i++) {
    current.month(i);
    months.push(localeData.monthsShort(current));
  }

  for (let index = start; index < end; index++) {
    monthOptions.push(
      <Select.Option className="month-item" value={`${index}`}>
        {months[index]}
      </Select.Option>,
    );
  }
  const month = value.month();
  const year = value.year();
  const options = [];
  for (let i = currentYear; i < currentYear + 10; i += 1) {
    options.push(
      <Select.Option key={i} value={i} className="year-item">
        {i}
      </Select.Option>,
    );
  }
  return (
    <div style={{padding: 8}}>
      <Row gutter={8} justify="end">
        <Col>
          <Select
            size="large"
            dropdownMatchSelectWidth={false}
            className="my-year-select"
            onChange={newYear => {
              const now = value.clone().year(newYear);
              onChange(now);
            }}
            value={String(year)}
          >
            {options}
          </Select>
        </Col>
        <Col>
          <Select
            size="large"
            dropdownMatchSelectWidth={false}
            value={String(month)}
            onChange={selectedMonth => {
              const newValue = value.clone();
              newValue.month(parseInt(selectedMonth, 10));
              onChange(newValue);
            }}
          >
            {monthOptions}
          </Select>
        </Col>
      </Row>
    </div>
  );
};

export default CalendarHeader;
