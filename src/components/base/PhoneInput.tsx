import React, {useState, useEffect} from 'react';
import {get} from 'lodash';
import {FormInstance} from 'rc-field-form';
import {Typography, Form, Input, Row, Col} from 'antd';

const {Title, Paragraph, Text} = Typography;
type TPhoneInput = {
  form: FormInstance;
  formName: string;
  name: string;
  onChange?: (value: string | number | undefined | object) => void;
};
const PhoneInput = ({form, formName, name, onChange}: TPhoneInput) => {
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [third, setThird] = useState('');

  function triggerChange(changedValue: string | number | undefined | object) {
    onChange && onChange(changedValue);
  }

  function onValueChange(v: object) {
    let firstValue = get(v, 'first', first);
    let secondValue = get(v, 'second', second);
    let thirdValue = get(v, 'third', third);

    firstValue = firstValue.replace(/[^0-9\.]/g, '');
    setFirst(firstValue);
    secondValue = secondValue.replace(/[^0-9\.]/g, '');
    setSecond(secondValue);
    thirdValue = thirdValue.replace(/[^0-9\.]/g, '');
    setThird(thirdValue);

    form.setFields([
      {name: `${name}_first`, value: firstValue},
      {name: `${name}_second`, value: secondValue},
      {name: `${name}_third`, value: thirdValue},
    ]);

    if (firstValue || secondValue || thirdValue) {
      triggerChange(`${firstValue}-${secondValue}-${thirdValue}`);
    } else {
      triggerChange('');
    }
  }

  useEffect(() => {
    const phone = form.getFieldValue(name);
    if (phone && typeof phone === "string") {
      setFirst(phone.split('-')[0]);
      setSecond(phone.split('-')[1]);
      setThird(phone.split('-')[2]);
      form.setFields([
        {name: `${name}_first`, value: phone.split('-')[0]},
        {name: `${name}_second`, value: phone.split('-')[1]},
        {name: `${name}_third`, value: phone.split('-')[2]},
      ]);
    }
  }, [form.getFieldValue(name)]);

  return (
    <Input.Group>
      <Row gutter={[8, 0]}>
        <Col xs={7} sm={7} md={7} lg={5} xl={5}>
          <Form.Item name={`${name}_first`} noStyle>
            <Input onChange={e => {
              onValueChange({first: e.target.value, second: second, third: third});
            }} style={{width:'100%'}}/>
          </Form.Item>
        </Col>
        <span style={{fontWeight: 'bold', fontSize: '16px'}}>-</span>
        <Col xs={7} sm={7} md={7} lg={5} xl={5}>
          <Form.Item name={`${name}_second`} noStyle>
            <Input onChange={e => {
              onValueChange({first: first, second: e.target.value, third: third});
            }} style={{width:'100%'}}/>
          </Form.Item>
        </Col>
        <span style={{fontWeight: 'bold', fontSize: '16px'}}>-</span>
        <Col xs={7} sm={7} md={7} lg={5} xl={5}>
          <Form.Item name={`${name}_third`} noStyle>
            <Input onChange={e => {
              onValueChange({first: first, second: second, third: e.target.value});
            }} style={{width:'100%'}}/>
          </Form.Item>
        </Col>
      </Row>
      <Input id={`${formName}_${name}`} style={{visibility: 'hidden', height: '0px', width: '0px', padding: '0px', margin: '0px'}}/>
    </Input.Group>
  );
}

export default PhoneInput;
