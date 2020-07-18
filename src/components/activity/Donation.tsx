import React, {useState} from 'react';
import {FormattedNumber} from 'react-intl';
import {FormInstance} from 'rc-field-form';
import {PhoneOutlined} from '@ant-design/icons';
import {Divider, Steps, Button, Form, Select, Radio, Typography, Input, InputNumber, Row, Col, Descriptions} from 'antd';
import {get} from 'lodash';
import styled from 'styled-components';
import {PrimaryColor} from 'GlobalStyles';
import {FormFinishInfo} from 'rc-field-form/lib/FormContext';
import {commifyFormatter, commifyParser, dateRegExp, dateParser} from 'libs/validators';
import AddressModal from 'components/modal/AddressModal';
import {TDonation} from 'modules/information/types';
import {createDonation} from 'libs/api/information';
import {showNotification} from 'components/base/Common';
import {CPhone} from 'constants/base.const';

const {Step} = Steps;
const {Text} = Typography;
const StepWrapper = styled.div`
  .ant-steps-item-title {
    font-weight: bold;
    font-size: 18px;
  }
  .ant-steps-item-process .ant-steps-item-title {
    font-weight: bold;
  }
  .steps-content {
    min-height: 200px;
    margin: 40px;
  }
  .steps-action {
    text-align: center;
    .ant-btn {
      font-size: 15px;
      width: 100px;
      height: 50px;
    }
  }
  .ant-form-item-label {
    text-align: left;
    font-weight: bold;

    .large-label {
      font-size: 18px;
    }
  }
  .ant-form-item-extra {
    margin-top: 4px;
    font-size: 13px;
  }
  .ant-radio-button-wrapper-checked {
    background: ${PrimaryColor} !important;
    color: #fff !important;
  }
  .ant-form-item-label > label.ant-form-item-required::before {
    display: none;
  }
  .ant-form-item-label > label.ant-form-item-required::after {
    display: inline-block;
    margin-left: 4px;
    color: #ff4d4f;
    font-size: 14px;
    font-family: SimSun, sans-serif;
    line-height: 1;
    content: '*';
  }
  .item-required::after {
    display: inline-block;
    margin-left: 4px;
    color: #ff4d4f;
    font-size: 14px;
    font-family: SimSun, sans-serif;
    line-height: 1;
    content: '*';
  }
  label::after {
    display: none;
  }
`;
const Donation = () => {
  const [current, setCurrent] = useState(0);
  const [addressModal, setAddressModal] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState<TDonation>();
  const steps = [
    {
      title: '후원 종류 선택',
      content: <SelectType/>,
      index: 0,
    },
    {
      title: '후원 정보 입력',
      content: <UserInformation/>,
      index: 1,
    },
    {
      title: '후원 정보 확인',
      content: <RequestConfirm/>,
      index: 2,
    },
    {
      title: '후원 신청 완료',
      content: <Completed/>,
      index: 3,
    },
  ];

  function onClickNext() {
    setCurrent(current + 1);
  }

  function onClickPrev() {
    setCurrent(current - 1);
  }

  function onChange(current: number) {
    setCurrent(current);
  }

  function isDisabled(index: number) {
    if (index > current || current == 3)
      return true;

    return false;
  }

  function SelectType() {
    const [showInput, setShowInput] = useState(false);

    function handleChangePrice(value: string) {
      if (value === '0')
        setShowInput(true);

      form.setFields([
        {name: 'price', value: value}
      ]);
    }

    return (
      <Form
        name="1"
        form={form}
        labelCol={{span: 3}}
        wrapperCol={{span: 12}}
        layout="horizontal"
      >
        <Form.Item
          name="donation_type"
          label={<Text className="large-label">후원종류</Text>}
          extra="원하시는 후원 종류를 선택해주세요"
          rules={[{required: true, message: '후원종류를 선택해주세요'}]}
        >
          <Radio.Group>
            <Radio.Button value="정기후원">정기후원</Radio.Button>
            <Radio.Button value="일시후원">일시후원</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label={<Text className="large-label item-required">후원금액</Text>}
          extra="후원 금액을 입력해주세요"
        >
          <Input.Group>
            <Row gutter={[16, 0]}>
              <Col span={12}>
                <Select onChange={handleChangePrice} style={{width: '100%'}}>
                  <Select.Option value="10000">1만원</Select.Option>
                  <Select.Option value="20000">2만원</Select.Option>
                  <Select.Option value="30000">3만원</Select.Option>
                  <Select.Option value="50000">5만원</Select.Option>
                  <Select.Option value="0">직접입력</Select.Option>
                </Select>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={'price'}
                  noStyle
                  rules={[{required: true, message: '후원금액을 입력해주세요'}]}
                >
                  {showInput &&
                    <InputNumber
                      formatter={commifyFormatter}
                      parser={commifyParser}
                      style={{width: '100%'}}
                    />
                  }
                </Form.Item>
              </Col>
            </Row>
          </Input.Group>
        </Form.Item>
        <Form.Item
          name="period"
          label={<Text className="large-label">출금주기</Text>}
          rules={[{required: true, message: '출금주기를 입력해주세요'}]}
        >
          <Select style={{maxWidth: '150px'}} defaultValue="">
            <Select.Option value="1">1개월마다</Select.Option>
            <Select.Option value="12">12개월마다</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item shouldUpdate={true} noStyle={true}>
          <Divider/>
          <div className="steps-action">
            <Button htmlType="submit"type="primary">다음</Button>
          </div>
        </Form.Item>
      </Form>
    );
  }

  function UserInformation() {
    function handleChangeEmail(val: string) {
      form.setFields([{name: ['email', 'domain'], value: val}]);
    }

    return (
      <Form
        name="2"
        form={form}
        labelCol={{span: 3}}
        wrapperCol={{span: 12}}
        layout="horizontal"
      >
        <Form.Item
          name="user_name"
          label={<Text>성명</Text>}
          rules={[{required: true, message: '성명을 입력해주세요'}]}
        >
          <Input style={{maxWidth:'200px'}}/>
        </Form.Item>
        <Form.Item
          name="birthday"
          label={<Text>생년월일</Text>}
          normalize={dateParser}
          rules={[
            {
              required: true,
              message: '생년월일을 입력해주세요'
            },
            {
              pattern: dateRegExp,
              message: '생년월일을 정확히 입력해주세요'
            }
          ]}
        >
          <Input style={{maxWidth:'200px'}} placeholder="YYYY-MM-DD"/>
        </Form.Item>
        <Form.Item
          name="phone"
          label={<Text>전화번호</Text>}
          rules={[{required: true, message: '전화번호를 입력해주세요'}]}
        >
          <Input style={{maxWidth:'200px'}} placeholder="숫자만 입력"/>
        </Form.Item>
        <Form.Item
          name="email"
          label={<Text className="item-required">이메일</Text>}
        >
          <Input.Group>
            <Row gutter={[8, 0]}>
              <Col span={8}>
                <Form.Item
                  name={['email', 'userid']}
                  noStyle
                >
                  <Input style={{width:'100%'}}/>
                </Form.Item>
              </Col>
              <span style={{fontWeight: 'bold', fontSize: '16px'}}>@</span>
              <Col span={7}>
                <Form.Item
                  name={['email', 'domain']}
                  noStyle
                  rules={[{required: true, message: '이메일을 입력해주세요'}]}
                >
                  <Input style={{width:'100%'}}/>
                </Form.Item>
              </Col>
              <Col span={7}>
                <Select onChange={handleChangeEmail} style={{width: '100%'}} defaultValue="">
                  <Select.Option value="">직접입력</Select.Option>
                  <Select.Option value="daum.net">daum.net</Select.Option>
                  <Select.Option value="gmail.com">gmail.com</Select.Option>
                  <Select.Option value="hanmail.net">hanmail.net</Select.Option>
                  <Select.Option value="hotmail.com">hotmail.com</Select.Option>
                  <Select.Option value="naver.com">naver.com</Select.Option>
                  <Select.Option value="nate.com">nate.com</Select.Option>
                  <Select.Option value="chol.com">chol.com</Select.Option>
                  <Select.Option value="dreamwiz.com">dreamwiz.com</Select.Option>
                  <Select.Option value="empal.com">empal.com</Select.Option>
                  <Select.Option value="freechal.com">freechal.com</Select.Option>
                  <Select.Option value="hanafos.com">hanafos.com</Select.Option>
                  <Select.Option value="hitel.net">hitel.net</Select.Option>
                  <Select.Option value="korea.com">korea.com</Select.Option>
                  <Select.Option value="lycos.co.kr">lycos.co.kr</Select.Option>
                  <Select.Option value="netian.com">netian.com</Select.Option>
                  <Select.Option value="paran.com">paran.com</Select.Option>
                  <Select.Option value="unitel.co.kr">unitel.co.kr</Select.Option>
                  <Select.Option value="yahoo.com">yahoo.com</Select.Option>
                </Select>
              </Col>
            </Row>
          </Input.Group>
        </Form.Item>
        <Form.Item
          label={<Text className="item-required">출금계좌</Text>}
          name="bank"
          extra="출금계좌의 은행과 계좌번호를 입력해주세요"
        >
          <Input.Group>
            <Row gutter={[16, 0]}>
              <Col span={8}>
                <Form.Item
                  name={['bank', 'name']}
                  noStyle
                  rules={[{required: true, message: '은행을 선택해주세요'}]}
                >
                  <Input style={{width: '100%'}} placeholder="은행이름"/>
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item
                  name={['bank', 'number']}
                  noStyle
                  rules={[{required: true, message: '계좌번호를 입력해주세요'}]}
                >
                  <Input style={{width: '100%'}} placeholder="계좌번호(숫자만 입력)"/>
                </Form.Item>
              </Col>
            </Row>
          </Input.Group>
        </Form.Item>
        <Form.Item
          name="address"
          label={<Text>주소</Text>}
        >
          <Input.Group>
            <Row gutter={[8, 0]}>
              <Col span={5}>
                <Form.Item
                  name={['address', 'postal_code']}
                  noStyle
                >
                  <Input style={{width:'100%', color: 'rgba(0, 0, 0, 0.65)'}} disabled/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Button onClick={()=>{setAddressModal(true);}}>우편번호찾기</Button>
              </Col>
            </Row>
            <Form.Item
              name={['address', 'street']}
              noStyle
            >
              <Input style={{width:'100%', margin: '10px 0px', color: 'rgba(0, 0, 0, 0.65)'}} disabled/>
            </Form.Item>
            <Form.Item
              name={['address', 'extra']}
              noStyle
            >
              <Input style={{width:'100%'}} placeholder="나머지 주소"/>
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Form.Item shouldUpdate={true} noStyle={true}>
          <Divider/>
          <div className="steps-action">
            <Button style={{margin: '0 8px'}} onClick={onClickPrev}>이전</Button>
            <Button htmlType="submit"type="primary">다음</Button>
          </div>
        </Form.Item>
      </Form>
    );
  }

  function RequestConfirm() {
    return (
      <Form name="3" form={form} layout="horizontal">
        <Descriptions column={2} bordered>
          <Descriptions.Item label="후원종류">{get(data, 'donation_type')}</Descriptions.Item>
          <Descriptions.Item label="후원금액">
            <FormattedNumber
              value={Number(get(data, 'price'))}
              style="currency"
              currency="KRW"
            />
          </Descriptions.Item>
          <Descriptions.Item label="출금주기">{get(data, 'period')} 개월</Descriptions.Item>
          <Descriptions.Item label="계좌번호">{get(data, 'bank_account', '')}</Descriptions.Item>
          <Descriptions.Item label="성명">{get(data, 'user_name')}</Descriptions.Item>
          <Descriptions.Item label="생년월일">{get(data, 'birthday')}</Descriptions.Item>
          <Descriptions.Item span={2} label="전화번호">{get(data, 'phone')}</Descriptions.Item>
          <Descriptions.Item span={2} label="이메일">{get(data, 'email')}</Descriptions.Item>
          <Descriptions.Item span={2} label="주소">{get(data, 'address')}</Descriptions.Item>
        </Descriptions>
        <Divider/>
        <div className="steps-action">
          <Button style={{margin: '0 8px'}} onClick={onClickPrev}>이전</Button>
          <Button htmlType="submit" type="primary">후원하기</Button>
        </div>
      </Form>
    );
  }

  function Completed() {
    return (
      <div style={{textAlign: 'center', marginTop: '70px'}}>
        <p><Text style={{fontSize: '30px'}}>후원신청 감사합니다.</Text></p>
        <p><Text style={{fontSize: '25px'}}>빠른 시일 내에 연락드리도록 하겠습니다.</Text></p>
        <p><Text>(<PhoneOutlined/>)&nbsp;{CPhone}</Text></p>
      </div>
    );
  }

  function getAddress(form: FormInstance) {
    if (!form.getFieldValue(['address', 'postal_code']))
      return ''

    const extra =  form.getFieldValue(['address' ,'extra']) ? form.getFieldValue(['address' ,'extra']) : '';

    return `(${form.getFieldValue(['address', 'postal_code'])}) ${form.getFieldValue(['address', 'street'])} ${extra}`;
  }

  async function onFormFinish(formName: string, info: FormFinishInfo) {
    switch(formName) {
      case '1':
        setData({
          ...form.getFieldsValue(),
        } as TDonation);
        onClickNext();
        break;
      case '2':
        setData({
          ...data,
          ...form.getFieldsValue(),
          address: getAddress(form),
          email: `${form.getFieldValue(['email', 'userid'])}@${form.getFieldValue(['email', 'domain'])}`,
          bank_account: `${form.getFieldValue(['bank', 'name'])} ${form.getFieldValue(['bank', 'number'])}`
        } as TDonation);
        onClickNext();
        break;
      case '3':
        try {
          await createDonation(data as TDonation);
          showNotification('success', '후원신청이 완료되었습니다');
          onClickNext();
        } catch (e) {
          showNotification('error', '후원신청을 실패했습니다');
          setCurrent(0);
          throw e;
        }
        break;
    }
  }

  function onFinish(postalCode: string, street: string) {
    form.setFields([
      {name: ['address', 'postal_code'], value: postalCode},
      {name: ['address', 'street'], value: street},
    ]);
  }

  return (
    <StepWrapper>
      <Steps current={current} onChange={onChange}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} disabled={isDisabled(item.index)}/>
        ))}
      </Steps>
      <AddressModal visible={addressModal} setVisible={setAddressModal} onFinish={onFinish}/>
      <Form.Provider onFormFinish={onFormFinish}>
        <div className="steps-content">{steps[current].content}</div>
      </Form.Provider>
    </StepWrapper>
  );
}

export default Donation;
