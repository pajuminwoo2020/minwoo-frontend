import React, {useState, useEffect} from 'react';
import {get} from 'lodash';
import {FormInstance} from 'rc-field-form';
import {Typography, Form, Input, Row, Col} from 'antd';

const {Title, Paragraph, Text} = Typography;
type TPhoneInput = {
  form: FormInstance;
  name: string;
  onChange?: (value: string | number | undefined) => void;
};
const PhoneInput = ({form, name, onChange}: TPhoneInput) => {

  function triggerChange(changedValue: string | number | undefined) {
    onChange && onChange(changedValue);
  }

  function onValueChange(v: string | number | undefined) {
    triggerChange(v);
  }

  function handleChangeInput(e: any) {
    let first = form.getFieldValue(`${name}_first`);
    let second = form.getFieldValue(`${name}_second`);
    let third = form.getFieldValue(`${name}_third`);
    if (first) {
      first = first.replace(/[^0-9\.]/g,'');
      form.setFields([{name: `${name}_first`, value: first}]);
    }
    if (second) {
      second = second.replace(/[^0-9\.]/g,'');
      form.setFields([{name: `${name}_second`, value: second}]);
    }
    if (third) {
      third = third.replace(/[^0-9\.]/g,'');
      form.setFields([{name: `${name}_third`, value: third}]);
    }
    if (first && second && third) {
      form.setFields([{name: name, value: `${first}-${second}-${third}`}]);
    } else {
      form.setFields([{name: name, value: undefined}]);
    }
    onValueChange(form.getFieldValue(name));
  }

  useEffect(() => {
    const phone = form.getFieldValue(name);
    console.log(phone);
    if (phone) {
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
            <Input onChange={handleChangeInput} style={{width:'100%'}}/>
          </Form.Item>
        </Col>
        <span style={{fontWeight: 'bold', fontSize: '16px'}}>-</span>
        <Col xs={7} sm={7} md={7} lg={5} xl={5}>
          <Form.Item name={`${name}_second`} noStyle>
            <Input onChange={handleChangeInput} style={{width:'100%'}}/>
          </Form.Item>
        </Col>
        <span style={{fontWeight: 'bold', fontSize: '16px'}}>-</span>
        <Col xs={7} sm={7} md={7} lg={5} xl={5}>
          <Form.Item name={`${name}_third`} noStyle>
            <Input onChange={handleChangeInput} style={{width:'100%'}}/>
          </Form.Item>
        </Col>
      </Row>
    </Input.Group>
  );
}

export default PhoneInput;
