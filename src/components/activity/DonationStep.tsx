import React, {useState, useRef} from 'react';
import {FormattedNumber} from 'react-intl';
import {Link, useLocation} from 'react-router-dom';
import {FormInstance} from 'rc-field-form';
import {PhoneOutlined, EditOutlined, DownloadOutlined} from '@ant-design/icons';
import queryString from 'query-string';
import {Divider, Steps, Button, Form, Select, Radio, Typography, Input, Row, Col, Descriptions, Checkbox, InputNumber} from 'antd';
import {RadioChangeEvent} from 'antd/lib/radio'
import {shallowEqual, useSelector} from 'react-redux';
import {RootState} from 'modules';
import {useDataApi} from 'libs/hooks';
import {get} from 'lodash';
import styled from 'styled-components';
import SignatureCanvas from 'react-signature-canvas';
import {ERoute} from 'enums/route.enum';
import {EDonationPrice, EDonationType, EMotivation} from 'enums/information.enum';
import {PrimaryColor, SignatureWrapper} from 'GlobalStyles';
import {FormFinishInfo} from 'rc-field-form/lib/FormContext';
import {dataURItoBlob} from 'libs/utils';
import AddressModal from 'components/modal/AddressModal';
import AgreeCMSModal from 'components/modal/AgreeCMSModal';
import AgreeUniqueModal from 'components/modal/AgreeUniqueModal';
import AgreePersonalModal from 'components/modal/AgreePersonalModal';
import AgreeOfferModal from 'components/modal/AgreeOfferModal';
import {TDonation, TDonationPage} from 'modules/information/types';
import {createDonation, getDonationPage} from 'libs/api/information';
import {showNotification} from 'components/base/Common';
import {commifyFormatter, commifyParser} from 'libs/validators';
import DropdownDatePicker from 'components/base/DropdownDatePicker';
import PhoneInput from 'components/base/PhoneInput';
import Configs from 'config';
import {DonationStepWrapper} from 'components/activity/Donation';

const {Step} = Steps;
const {Text, Title} = Typography;
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
    cursor: default;
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
  .ant-form-item {
    margin-bottom: 12px;
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
  .text-strong .ant-checkbox-disabled.ant-checkbox-checked .ant-checkbox-inner::after {
    border-color: #000 !important;
  }
  .text-strong .ant-checkbox-disabled,
  .text-strong .ant-checkbox-disabled .ant-checkbox-input,
  .text-strong .ant-checkbox-disabled + span,
  .text-strong.ant-input-disabled {
    color: #000 !important;
    font-weight: bold !important;
    cursor: default !important;
  }
`;
const DonationStep = () => {
  const [current, setCurrent] = useState(0);
  const [addressModal, setAddressModal] = useState(false);
  const [agreeCMSModal, setAgreeCMSModal] = useState(false);
  const [agreeUniqueModal, setAgreeUniqueModal] = useState(false);
  const [agreePersonalModal, setAgreePersonalModal] = useState(false);
  const [agreeOfferModal, setAgreeOfferModal] = useState(false);
  const [form] = Form.useForm();
  const [{data: donationPage, loading: pageLoading}] = useDataApi<TDonationPage>(getDonationPage.bind(null));
  const [data, setData] = useState<TDonation>();
  const [downloadUrl, setDownloadUrl] = useState('');
  const signaturePad = useRef<any>();
  const information = useSelector((state: RootState) => state.information.info, shallowEqual);
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
      title: '확인 및 서명',
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
    const donationTypeParam = queryString.parse(useLocation().search)?.donationType?.toString();
    const [showInput, setShowInput] = useState(false);
    const donationRegular = '정기후원';
    const donationTemp = '일시후원';
    const [donationType, setDonationType] = useState(donationTypeParam === 'regular' ? donationRegular : donationTemp);
    const [price, setPrice] = useState('0');

    function handleChangePrice(value: number) {
      if (value === 0) {
        setShowInput(true);
        form.setFields([{name: 'price', value: ''}]);
        setPrice('0');
      }
      else {
        setShowInput(false);
        form.setFields([{name: 'price', value: value}]);
        setPrice(commifyFormatter(String(value)));
      }
    }

    function handleDonationType(e: RadioChangeEvent) {
      if (e.target.value === donationRegular) {
        setDonationType(donationRegular);
      } else if (e.target.value === donationTemp) {
        setDonationType(donationTemp);
      }
      form.setFields([{name: 'select_price', value: ''}, {name: 'price', value: ''}]);
      setPrice('0');
    }

    function handleChangeInput(value: string | number | undefined) {
      setPrice(commifyFormatter(String(value)));
    }

    return (
      <Form
        name="1"
        form={form}
        labelCol={{span: 3}}
        wrapperCol={{span: 12}}
        initialValues={{donation_type: donationType}}
        layout="horizontal"
      >
        <Form.Item
          name="donation_type"
          label={<Text className="large-label">후원종류</Text>}
          rules={[{required: true, message: '후원종류를 선택해주세요'}]}
        >
          {donationType == donationRegular ? (
            <Radio.Button checked>정기후원</Radio.Button>
          ) : (
            <Radio.Button checked>일시후원</Radio.Button>
          )}
        </Form.Item>
        <Form.Item
          label={<Text className="large-label item-required">후원금액</Text>}
          extra="후원 금액을 입력해주세요"
        >
          <Input.Group>
            <Row gutter={[16, 0]}>
              <Col span={12}>
                <Form.Item
                  name={'select_price'}
                  noStyle
                >
                  {donationType == donationRegular ? (
                    <Select onChange={handleChangePrice} style={{width: '100%'}}>
                      <Select.Option value={EDonationPrice.KRW12000}>1만2천원</Select.Option>
                      <Select.Option value={EDonationPrice.KRW20000}>2만원</Select.Option>
                      <Select.Option value={EDonationPrice.KRW30000}>3만원</Select.Option>
                      <Select.Option value={EDonationPrice.KRW120000}>12만원(연회비)</Select.Option>
                      <Select.Option value={EDonationPrice.KRW1000000}>100만원(평생회원)</Select.Option>
                      <Select.Option value={0}>직접입력</Select.Option>
                    </Select>
                  ) : (
                    <Select onChange={handleChangePrice} style={{width: '100%'}}>
                      <Select.Option value={10000}>1만원</Select.Option>
                      <Select.Option value={30000}>3만원</Select.Option>
                      <Select.Option value={50000}>5만원</Select.Option>
                      <Select.Option value={100000}>10만원</Select.Option>
                      <Select.Option value={300000}>30만원</Select.Option>
                      <Select.Option value={0}>직접입력</Select.Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={'price'}
                  noStyle
                  rules={[{required: true, message: '후원금액을 입력해주세요'}]}
                >
                  {showInput && <InputNumber
                    onChange={handleChangeInput}
                    style={{width: '100%'}}
                    formatter={commifyFormatter}
                    parser={commifyParser}
                  />}
                </Form.Item>
              </Col>
            </Row>
          </Input.Group>
        </Form.Item>
        <Divider/>
        <div style={{float: 'right', marginBottom: '16px'}}>
          <Text style={{fontSize: '25px'}}>
            후원금액 합계 <strong>{price}</strong>원
          </Text>
        </div>
        <Form.Item shouldUpdate={true} noStyle={true}>
          <Divider/>
          <div className="steps-action">
            <Button htmlType="submit"type="primary">다음</Button>
          </div>
        </Form.Item>
        <DonationStepWrapper style={{maxWidth: '500px', margin: 'auto'}}>
          {donationType == donationRegular ? (
            <Row gutter={[16, 16]} align="top" style={{marginTop: '40px'}} justify="space-between">
              <div className="box-with-border color-blue">
                <p>정기후원</p>
              </div>
              <div style={{color: '#999999', padding: '20px 10px 0px 10px'}}>
                <div dangerouslySetInnerHTML={{ __html: `${get(donationPage, 'regular', '')}`}}/>
              </div>
            </Row>
          ) : (
            <Row gutter={[16, 16]} align="top" style={{marginTop: '40px'}} justify="space-between">
              <div className="box-with-border color-yellow">
                <p>일시후원</p>
              </div>
              <div style={{color: '#999999', padding: '20px 10px 0px 10px'}}>
                <div dangerouslySetInnerHTML={{ __html: `${get(donationPage, 'temporary', '')}`}}/>
              </div>
              <div style={{color: '#999999', padding: '0px 10px'}}>
              </div>
            </Row>
          )}
        </DonationStepWrapper>
      </Form>
    );
  }

  function UserInformation() {
    const [showRegistrationInput, setShowRegistrationInput] = useState(false);
    const [showBirthdayInput, setShowBirthdayInput] = useState(true);

    function handleChangeEmail(val: string) {
      form.setFields([{name: ['email', 'domain'], value: val}]);
    }

    function handleCheckSame(e: any) {
      if (e.target.checked) {
        let account_holder_name = form.getFieldValue('applicant_name');
        let account_holder_birthday = form.getFieldValue('applicant_birthday');
        let account_holder_phone = form.getFieldValue('applicant_phone');
        form.setFields([
          {name: 'account_holder_name', value: account_holder_name},
          {name: 'account_holder_birthday', value: account_holder_birthday},
          {name: 'account_holder_phone', value: account_holder_phone},
        ]);
      }
    }

    function handleCheckAll(e: any) {
      if (e.target.checked) {
        form.setFields([
          {name: 'agree_unique', value: 'true', validating: true, errors: []},
          {name: 'agree_personal', value: 'true', validating: true, errors: []},
          {name: 'agree_offer', value: 'true', validating: true, errors: []},
        ]);
      }
    }

    function handleCheckAgreeReceipt(e: any) {
      if (e.target.value === true) {
        setShowRegistrationInput(true);
      }
      else {
        setShowRegistrationInput(false);
      }
    }

    function handleCheckHolderType(e: any) {
      if (e.target.value === "개인") {
        setShowBirthdayInput(true);
      }
      else {
        setShowBirthdayInput(false);
      }
    }

    return (
      <Form
        name="2"
        form={form}
        labelCol={{span: 3}}
        wrapperCol={{span: 12}}
        layout="horizontal"
      >
        <Title level={4} style={{marginBottom: '20px'}}>후원자 정보</Title>
        <Form.Item
          name="applicant_name"
          label={<Text>성명</Text>}
          rules={[{required: true, message: '성명을 입력해주세요'}]}
          extra="후원자 성명"
        >
          <Input style={{maxWidth:'200px'}}/>
        </Form.Item>
        <Form.Item
          label={<Text>생년월일</Text>}
          extra="후원자 생년월일"
          name="applicant_birthday"
          rules={[{required: true, message: '생년월일을 선택해주세요'}]}
        >
          <DropdownDatePicker form={form} formName="2" name="applicant_birthday"/>
        </Form.Item>
        <Form.Item
          name="applicant_phone"
          extra="연락 가능한 정확한 번호를 입력해주세요."
          label={<Text>휴대전화번호</Text>}
          rules={[{required: true, message: '전화번호를 입력해주세요'}]}
        >
          <PhoneInput form={form} formName="2" name="applicant_phone"/>
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
        <br/>
        <Form.Item
          name="agree_newsletter"
          label={<Text>소식지 수령여부</Text>}
          rules={[{required: true, message: '소식지 수령여부를 선택해주세요'}]}
          labelCol={{span: 4}}
        >
          <Radio.Group>
            <Radio value={true}>수령</Radio>
            <Radio value={false}>미 수령</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="agree_email"
          label={<Text>이메일 수신여부</Text>}
          rules={[{required: true, message: '이메일 수신여부를 선택해주세요'}]}
          labelCol={{span: 4}}
        >
          <Radio.Group>
            <Radio value={true}>수신</Radio>
            <Radio value={false}>거부</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="agree_receipt"
          label={<Text>기부금영수증신청</Text>}
          rules={[{required: true, message: '영수증 신청여부를 선택해주세요'}]}
          labelCol={{span: 4}}
        >
          <Radio.Group onChange={handleCheckAgreeReceipt}>
            <Radio value={true}>발급</Radio>
            <Radio value={false}>미 발급</Radio>
          </Radio.Group>
        </Form.Item>
        {showRegistrationInput && (
          <Form.Item
            name={'resident_registration_number'}
            label={<Text className="item-required">주민등록번호</Text>}
            extra="소득세법 제160조에 따라 영수증 발급을 위해 주민등록번호를 수집하고 있습니다"
            labelCol={{span: 4}}
          >
            <Input.Group>
              <Row gutter={[16, 0]}>
                <Col span={8}>
                  <Form.Item
                    name={['resident_registration_number', 'first']}
                    noStyle
                    rules={[{required: true, message: '주민등록번호 앞자리를 입력해주세요'}]}
                  >
                    <Input maxLength={6} style={{width: '100%'}}/>
                  </Form.Item>
                </Col>
                <span style={{fontWeight: 'bold', fontSize: '16px'}}>-</span>
                <Col span={8}>
                  <Form.Item
                    name={['resident_registration_number', 'second']}
                    noStyle
                    rules={[{required: true, message: '주민등록번호 뒷자리를 입력해주세요'}]}
                  >
                    <Input.Password maxLength={7} type="password" style={{width: '100%'}}/>
                  </Form.Item>
                </Col>
              </Row>
            </Input.Group>
          </Form.Item>
        )}
        {get(data, 'donation_type') == EDonationType.Regular && (
          <Form.Item name="motivation"
            label={<Text>가입동기</Text>}
            wrapperCol={{span: 16}}
            labelCol={{span: 4}}
          >
            <Radio.Group>
              <Row>
                <Col xs={24} sm={24} md={24} lg={8} xl={8}><Radio value={EMotivation.SNS}>{EMotivation.SNS}</Radio></Col>
                <Col xs={24} sm={24} md={24} lg={8} xl={8}><Radio value={EMotivation.Suggestion}>{EMotivation.Suggestion}</Radio></Col>
                <Col xs={24} sm={24} md={24} lg={8} xl={8}><Radio value={EMotivation.Press}>{EMotivation.Press}</Radio></Col>
                <Col xs={24} sm={24} md={24} lg={8} xl={8}><Radio value={EMotivation.Activity}>{EMotivation.Activity}</Radio></Col>
                <Col xs={24} sm={24} md={24} lg={8} xl={8}><Radio value={EMotivation.Campaign}>{EMotivation.Campaign}</Radio></Col>
                <Col xs={24} sm={24} md={24} lg={8} xl={8}><Radio value={EMotivation.Plan}>{EMotivation.Plan}</Radio></Col>
                <Col xs={24} sm={24} md={24} lg={8} xl={8}><Radio value={EMotivation.Consulting}>{EMotivation.Consulting}</Radio></Col>
                <Col xs={24} sm={24} md={24} lg={8} xl={8}><Radio value={EMotivation.Education}>{EMotivation.Education}</Radio></Col>
                <Col xs={24} sm={24} md={24} lg={8} xl={8}><Radio value={EMotivation.ETC}>{EMotivation.ETC}</Radio></Col>
              </Row>
            </Radio.Group>
          </Form.Item>
        )}
        <Divider/>
        <br></br>
        <Title level={4} style={{marginBottom: '20px'}}>후원금 납입 방법</Title>
        {get(data, 'donation_type') == EDonationType.Regular && (
          <Form.Item
            name="payment_method"
            label={<Text>납부방법</Text>}
            extra="CMS(Cash Management Service)는 금융결제원을 통해 후원금 자동이체를 의뢰하는 방법으로, 약정하신 금액을 송금 수수료 없이 편리하게 후원하실 수 있습니다."
          >
            <Checkbox className="text-strong" defaultChecked disabled>자동이체(CMS)</Checkbox>
          </Form.Item>
        )}
        <Form.Item label={<Text>금액</Text>}>
          <Input style={{maxWidth:'200px'}} className="text-strong" value={commifyFormatter(String(get(data, 'price', 0)))} disabled/>
          <Text>&nbsp;원</Text>
        </Form.Item>
        <Form.Item
          name="account_holder_type"
          label={<Text>예금주구분</Text>}
        >
          <Radio.Group defaultValue="개인" onChange={handleCheckHolderType}>
            <Radio value="개인">개인</Radio>
            <Radio value="기업">기업/단체</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label={<Text className="item-required">예금주</Text>} style={{marginBottom: '0px'}}>
          <Input.Group>
            <Row>
              <Form.Item
                name="account_holder_name"
                rules={[{required: true, message: '성명을 입력해주세요'}]}
                extra="예금주 성명"
              >
                <Input style={{maxWidth:'200px'}}/>
              </Form.Item>
              <Checkbox onChange={handleCheckSame} style={{ marginLeft: '10px'}}>후원자와 동일</Checkbox>
            </Row>
          </Input.Group>
        </Form.Item>
        {showBirthdayInput ? (
          <Form.Item
            name="account_holder_birthday"
            label={<Text>생년월일</Text>}
            rules={[{required: true, message: '생년월일을 선택해주세요'}]}
            extra="개인사업자는 대표자 생년월일, 법인사업자는 사업자등록번호 10자리"
          >
            <DropdownDatePicker form={form} formName="2" name="account_holder_birthday"/>
          </Form.Item>
        ) : (
          <Form.Item
            name="account_holder_birthday"
            label={<Text>사업자등록번호</Text>}
            rules={[{required: true, message: '사업자등록번호를 입력해주세요'}]}
            extra="개인사업자는 대표자 생년월일, 법인사업자는 사업자등록번호 10자리"
          >
            <Input style={{maxWidth:'200px'}}/>
          </Form.Item>
        )}
        <Form.Item
          name="account_holder_phone"
          label={<Text>예금주<br/>휴대전화번호</Text>}
          rules={[{required: true, message: '전화번호를 입력해주세요'}]}
          extra="연락 가능한 정확한 번호를 입력해주세요."
        >
          <PhoneInput form={form} formName="2" name="account_holder_phone"/>
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
                  <Input style={{width: '100%'}} placeholder="계좌번호"/>
                </Form.Item>
              </Col>
            </Row>
          </Input.Group>
        </Form.Item>
        {get(data, 'donation_type') == EDonationType.Regular && (
          <Form.Item
            name="withdrawl_date"
            label={<Text>출금일</Text>}
            extra="미 출금 시 28일에 2차 출금 됩니다"
          >
            <Checkbox defaultChecked className="text-strong" disabled>21일</Checkbox>
          </Form.Item>
        )}
        {get(data, 'donation_type') == EDonationType.Regular && (
          <Form.Item
            label={<Text>CMS 약관</Text>}
            name="agree_cms"
            rules={[{required: true, message: '동의사항에 체크해주세요'}]}
            extra={<span>휴대전화번호 형식의 평생계좌는 CMS자동이체신청이 불가합니다.<br/>회비와 후원금은 소득공제를 받을 수 있습니다.<br/>매월 21일 출금됩니다. (2차출금: 28일, 3차 출금: 다음달 11일) 미납된 회비는 다음 출금일에 인출되며 최대 3달치까지 인출됩니다.<br/>만 14세 미만인 경우 온라인 회원가입이 불가합니다. {get(information, 'membership_management_phone')}(회원팀), {get(information, 'membership_management_email')}로 별도의 연락을 주시길 바랍니다.</span>}
          >
            <Checkbox.Group>
              <Checkbox value="true">CMS 약관에 동의합니다</Checkbox>
              <Button size="small" onClick={()=>{setAgreeCMSModal(true);}}>내용보기</Button>
            </Checkbox.Group>
          </Form.Item>
        )}
        <Divider/>
        <br></br>
        <Title level={4} style={{marginBottom: '20px'}}>약관동의</Title>
        <Form.Item
          name="agree_unique"
          rules={[{required: true, message: '동의사항에 체크해주세요'}]}
          labelCol={{span: 6}}
          label={<Text>파주여성민우회 이용 약관</Text>}
        >
          <Checkbox.Group>
            <Checkbox value="true">이용 약관에 동의합니다.</Checkbox>
            <Button size="small" onClick={()=>{setAgreeUniqueModal(true);}}>내용보기</Button>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item
          name="agree_personal"
          rules={[{required: true, message: '동의사항에 체크해주세요'}]}
          label={<Text>개인정보 수집 및 이용 약관</Text>}
          labelCol={{span: 6}}
        >
          <Checkbox.Group>
            <Checkbox value="true">개인정보 수집 및 이용 약관에 동의합니다.</Checkbox>
            <Button size="small" onClick={()=>{setAgreePersonalModal(true);}}>내용보기</Button>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item
          name="agree_offer"
          rules={[{required: true, message: '동의사항에 체크해주세요'}]}
          label={<Text>개인정보 제3자 제공 동의 약관</Text>}
          labelCol={{span: 6}}
        >
          <Checkbox.Group>
            <Checkbox value="true">개인정보 제3자 제공에 동의합니다.</Checkbox>
            <Button size="small" onClick={()=>{setAgreeOfferModal(true);}}>내용보기</Button>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item label=" " name="agree_all" labelCol={{span: 6}}>
          <Checkbox.Group>
            <Checkbox onChange={handleCheckAll} value="true"><strong>전체 동의하기</strong></Checkbox>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item shouldUpdate={true} noStyle={true}>
          <Divider/>
          <div className="steps-action">
            <Button style={{margin: '0 8px'}} onClick={onClickPrev}>이전</Button>
            <Button htmlType="submit" type="primary" onClick={() => {
              form.validateFields().catch(errorInfo => {
                const errorField = errorInfo.errorFields ? get(errorInfo.errorFields[0], 'name', '') : '';
                form.scrollToField(errorField, {
                  block: 'center',
                  behavior: 'smooth',
                });
              });
            }}>다음</Button>
          </div>
        </Form.Item>
      </Form>
    );
  }

  function RequestConfirm() {
    return (
      <Form
        name="3"
        form={form}
        labelCol={{span: 3}}
        layout="horizontal"
      >
        <Descriptions column={{xs:1, sm:1, md:2, lg:2, xl:2}}  bordered>
          <Descriptions.Item label="후원종류">{get(data, 'donation_type')}</Descriptions.Item>
          <Descriptions.Item label="후원금액">{commifyFormatter(String(get(data, 'price', '')))}원</Descriptions.Item>
          <Descriptions.Item label="후원자 성명">{get(data, 'applicant_name')}</Descriptions.Item>
          <Descriptions.Item label="후원자 생년월일">{get(data, 'applicant_birthday')}</Descriptions.Item>
          <Descriptions.Item label="후원자 휴대전화번호">{get(data, 'applicant_phone')}</Descriptions.Item>
          <Descriptions.Item label="주민등록번호">{get(data, 'resident_registration_number', '')}</Descriptions.Item>
          <Descriptions.Item label="이메일">{get(data, 'email')}</Descriptions.Item>
          <Descriptions.Item label="예금주">{get(data, 'account_holder_name')}</Descriptions.Item>
          <Descriptions.Item label="예금주 생년월일">{get(data, 'account_holder_birthday')}</Descriptions.Item>
          <Descriptions.Item label="예금주 휴대전화번호">{get(data, 'account_holder_phone')}</Descriptions.Item>
          <Descriptions.Item span={2} label="계좌번호">{`${get(data, 'bank_name', '')} ${get(data, 'account_number', '')}`}</Descriptions.Item>
          <Descriptions.Item span={2} label="주소">{get(data, 'address')}</Descriptions.Item>
        </Descriptions>
        <Form.Item name="image_signature" label={<Text>서명</Text>} style={{marginTop: '20px'}}>
          <SignatureWrapper>
            <SignatureCanvas
              ref={signaturePad}
              penColor='black'
              minWidth={2.5}
              maxWidth={4.5}
              canvasProps={{className: 'sig-canvas'}}
            />
            <Button
              style={{margin: '0px', position: 'absolute', bottom: '0', left: '0'}}
              size="small"
              onClick={() => signaturePad && signaturePad.current.clear()}
              icon={<EditOutlined/>}
            >
              지우기
            </Button>
          </SignatureWrapper>
        </Form.Item>
        <Form.Item
          name="memo"
          label={<Text>한줄메모</Text>}
          style={{marginTop: '20px'}}
          extra="한줄 응원메시지를 입력해주세요. 후원목록에 이름과 함께 표시됩니다."
        >
          <Input style={{maxWidth:'80%'}} placeholder="후원합니다~!"/>
        </Form.Item>
        <Form.Item shouldUpdate={true} noStyle={true}>
          <Divider/>
          <div className="steps-action">
            <Button style={{margin: '0 8px'}} onClick={onClickPrev}>이전</Button>
            <Button htmlType="submit" type="primary">후원하기</Button>
          </div>
        </Form.Item>
      </Form>
    );
  }

  function Completed() {
    return (
      <div style={{textAlign: 'left', marginTop: '70px'}}>
        <p>
          <a href={`${Configs.API_HOST}${downloadUrl}`}>
            <Text style={{fontSize: '25px', color: `${PrimaryColor}`}}><strong>신청서 확인 및 다운&nbsp;<DownloadOutlined/></strong></Text>
          </a>
        </p>
        <p><Text style={{fontSize: '25px'}}>후원신청 감사합니다.</Text></p>
        <p><Text style={{fontSize: '25px'}}>빠른 시일 내에 연락드리도록 하겠습니다.</Text></p>
        <p><Text>(<PhoneOutlined/>)&nbsp;{get(information, 'phone')}</Text></p>
        <Divider/>
        <div className="steps-action">
          <Link to={ERoute.ActivityDonation}>
            <Button type="primary">돌아가기</Button>
          </Link>
        </div>
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
        form.resetFields();
        break;
      case '2':
        setData({
          ...data,
          ...form.getFieldsValue(),
          address: getAddress(form),
          email: `${form.getFieldValue(['email', 'userid'])}@${form.getFieldValue(['email', 'domain'])}`,
          bank_name: `${form.getFieldValue(['bank', 'name'])}`,
          account_number: `${form.getFieldValue(['bank', 'number'])}`,
          agree_unique: (form.getFieldValue('agree_unique') == "true" ? true : false),
          agree_personal: (form.getFieldValue('agree_personal') == "true" ? true : false),
          agree_offer: (form.getFieldValue('agree_offer') == "true" ? true : false),
          resident_registration_number: form.getFieldValue(['resident_registration_number', 'first'])
          ? `${form.getFieldValue(['resident_registration_number', 'first'])}-${form.getFieldValue(['resident_registration_number', 'second'])}`
          : '',
          motivation: (form.getFieldValue('motivation') ? form.getFieldValue('motivation') : ''),
        } as TDonation);
        onClickNext();
        break;
      case '3':
        try {
          const imageDataURL = signaturePad.current.toDataURL('image/png');
          const imageDataBlob = dataURItoBlob(imageDataURL);
          const formData = new FormData();

          Object.keys(data as TDonation).forEach(function(key) {
            formData.append(key, get(data, key));
          });
          formData.append('image_signature', imageDataBlob, 'signature.png');
          formData.append('memo', form.getFieldValue('memo') ? form.getFieldValue('memo') : '후원합니다~!');

          const response = await createDonation(formData);
          setDownloadUrl(get(response, 'data.absolute_url', ''));
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
      <AgreeCMSModal visible={agreeCMSModal} setVisible={setAgreeCMSModal}/>
      <AgreeUniqueModal visible={agreeUniqueModal} setVisible={setAgreeUniqueModal}/>
      <AgreePersonalModal visible={agreePersonalModal} setVisible={setAgreePersonalModal}/>
      <AgreeOfferModal visible={agreeOfferModal} setVisible={setAgreeOfferModal}/>
      <Form.Provider onFormFinish={onFormFinish}>
        <div className="steps-content">{steps[current].content}</div>
      </Form.Provider>
    </StepWrapper>
  );
}

export default DonationStep;
