import React, {useState, useEffect} from 'react';
import {get} from 'lodash';
import {FormInstance} from 'rc-field-form';
import {Typography, Form, Input} from 'antd';
import moment, {Moment} from 'moment';
// @ts-ignore
import {YearPicker, MonthPicker, DayPicker} from 'react-dropdown-date';
import {CDefaultDateTimeFormat} from 'constants/base.const';

function formatDate(date: Date) {
    var d = new Date(date),
        month = '' + (d.getMonth()+1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

const {Title, Paragraph, Text} = Typography;
type TDropdownDatePicker = {
  form: FormInstance;
  name: string;
};
const DropdownDatePicker = ({form, name}: TDropdownDatePicker) => {
  const [Year, setYear] = useState<number>();
  const [Month, setMonth] = useState<number>();
  const [Day, setDay] = useState<number>();

  useEffect(() => {
    if (Year && Month && Day) {
      const date = formatDate(new Date(Year, Month, Day));
      form.setFields([{name: `${name}`, value: date}]);
    }
  }, [Year, Month, Day]);

  useEffect(() => {
    const date = form.getFieldValue(name);
    if (date) {
      setYear(Number(date.split('-')[0]));
      setMonth(Number(date.split('-')[1]-1));
      setDay(Number(date.split('-')[2]));
    }
  }, [form.getFieldValue(name)]);

  return (
    <Input.Group>
      <Form.Item noStyle>
        <YearPicker
          defaultValue={'선택'}
          end={new Date().getFullYear()}
          classes="date-picker-dropdown"
          value={Year}
          onChange={(year: number) => {setYear(year)}}
          reverse
        />
        <Text style={{margin: '0px 10px 0px 5px'}}>년</Text>
      </Form.Item>
      <Form.Item noStyle>
        <MonthPicker
          defaultValue={'선택'}
          year={Year}
          value={Month}
          onChange={(month: number) => {setMonth(month)}}
          endYearGiven
          classes="date-picker-dropdown"
          numeric
	    />
        <Text style={{margin: '0px 10px 0px 5px'}}>월</Text>
      </Form.Item>
      <Form.Item noStyle>
        <DayPicker
          defaultValue={'선택'}
	  	  year={Year}
          month={Month}
          value={Day}
          endYearGiven
          onChange={(day: number) => {setDay(day)}}
          classes="date-picker-dropdown"
	    />
        <Text style={{margin: '0px 10px 0px 5px'}}>일</Text>
      </Form.Item>
    </Input.Group>
  );
}

export default DropdownDatePicker;
