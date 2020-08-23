import React, {useState, useRef} from 'react';
import {FormattedNumber} from 'react-intl';
import {Link} from 'react-router-dom';
import {FormInstance} from 'rc-field-form';
import {PhoneOutlined, EditOutlined} from '@ant-design/icons';
import {Divider, Steps, Button, Form, Select, Radio, Typography, Input, Row, Col, Descriptions, Checkbox} from 'antd';
import {shallowEqual, useSelector} from 'react-redux';
import {RootState} from 'modules';
import {get} from 'lodash';
import styled from 'styled-components';
import SignatureCanvas from 'react-signature-canvas';
import {ERoute} from 'enums/route.enum';
import {EDonationPrice, EDonationType} from 'enums/information.enum';
import {PrimaryColor, SignatureWrapper} from 'GlobalStyles';
import {FormFinishInfo} from 'rc-field-form/lib/FormContext';
import {dateRegExp} from 'libs/validators';
import {dataURItoBlob} from 'libs/utils';
import AddressModal from 'components/modal/AddressModal';
import {TDonation} from 'modules/information/types';
import {createDonation} from 'libs/api/information';
import {showNotification} from 'components/base/Common';

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
`;
const DonationStep = () => {
  const [current, setCurrent] = useState(0);
  const [addressModal, setAddressModal] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState<TDonation>();
  const signaturePad = useRef<any>();
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
    const [showInput, setShowInput] = useState(false);

    function handleChangePrice(value: string) {
      if (value === 'ETC') {
        setShowInput(true);
        form.setFields([
          {name: 'price', value: ''}
        ]);
      }
      else {
        setShowInput(false);
        form.setFields([
          {name: 'price', value: value}
        ]);
      }
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
            <Radio.Button value={EDonationType.Regular}>정기후원</Radio.Button>
            <Radio.Button value={EDonationType.Temporary}>일시후원</Radio.Button>
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
                  <Select.Option value={EDonationPrice.Month12000}>(월) 1만2천원</Select.Option>
                  <Select.Option value={EDonationPrice.Month20000}>(월) 2만원</Select.Option>
                  <Select.Option value={EDonationPrice.Month30000}>(월) 3만원</Select.Option>
                  <Select.Option value={EDonationPrice.Year120000}>(년) 12만원</Select.Option>
                  <Select.Option value="ETC">직접입력</Select.Option>
                </Select>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={'price'}
                  noStyle
                  rules={[{required: true, message: '후원금액을 입력해주세요'}]}
                >
                  {showInput && <Input placeholder="예시: (월) 2만3천원" style={{width: '100%'}}/>}
                </Form.Item>
              </Col>
            </Row>
          </Input.Group>
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
    const [showRegistrationInput, setShowRegistrationInput] = useState(false);

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
          {name: 'agree_unique', value: 'true'},
          {name: 'agree_personal', value: 'true'},
          {name: 'agree_offer', value: 'true'},
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

    return (
      <Form
        name="2"
        form={form}
        labelCol={{span: 3}}
        wrapperCol={{span: 12}}
        layout="horizontal"
      >
        <Title level={4} style={{marginBottom: '20px'}}>신청인 정보</Title>
        <Form.Item
          name="applicant_name"
          label={<Text>성명</Text>}
          rules={[{required: true, message: '성명을 입력해주세요'}]}
          extra="신청인 성명"
        >
          <Input style={{maxWidth:'200px'}}/>
        </Form.Item>
        <Form.Item
          name="applicant_birthday"
          label={<Text>생년월일</Text>}
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
          extra="신청인 생년월일"
        >
          <Input style={{maxWidth:'200px'}} placeholder="생년월일 앞 6자리"/>
        </Form.Item>
        <Form.Item
          name="applicant_phone"
          extra="연락 가능한 정확한 전화번호를 입력해주세요."
          label={<Text>전화번호</Text>}
          rules={[{required: true, message: '전화번호를 입력해주세요'}]}
        >
          <Input style={{maxWidth:'200px'}} placeholder="010-1234-5678"/>
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
        <Divider/>
        <Title level={4} style={{marginBottom: '20px'}}>기부 정보</Title>
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
              <Checkbox onChange={handleCheckSame} style={{ marginLeft: '10px'}}>신청인과 동일</Checkbox>
            </Row>
          </Input.Group>
        </Form.Item>
        <Form.Item
          name="account_holder_birthday"
          label={<Text>생년월일</Text>}
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
          extra="개인사업자는 대표자 생년월일, 법인사업자는 사업자등록번호 10자리"
        >
          <Input style={{maxWidth:'200px'}} placeholder="예금주 생년월일 앞 6자리"/>
        </Form.Item>
        <Form.Item
          name="account_holder_phone"
          label={<Text>전화번호</Text>}
          rules={[{required: true, message: '전화번호를 입력해주세요'}]}
        >
          <Input style={{maxWidth:'200px'}} placeholder="010-1234-5678"/>
        </Form.Item>
        <Form.Item
          name="withdrawl_date"
          label={<Text>출금일</Text>}
          rules={[{required: true, message: '출금일을 선택해주세요'}]}
          extra="미 출금 시 28일에 2차 출금 됩니다"
        >
          <Checkbox.Group>
            <Checkbox value="21">21일</Checkbox>
          </Checkbox.Group>
        </Form.Item>
        <Divider/>
        <Title level={4} style={{marginBottom: '20px'}}>기부금 영수증</Title>
        <Form.Item
          name="agree_receipt"
          label={<Text>신청</Text>}
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
            label={<Text>주민등록번호</Text>}
            labelCol={{span: 4}}
            rules={[{required: true, message: '주민등록번호를 입력해주세요'}]}
            extra="소득세법 제160조에 따라 영수증 발급을 위해 주민등록번호를 수집하고 있습니다"
          >
            <Input placeholder="주민등록번호 13자리" style={{width: '100%'}}/>
          </Form.Item>
        )}
        <br></br>
        <Form.Item label={<Text>동의사항</Text>} labelCol={{span: 4}}>
          <Input.Group>
            <Form.Item name="agree_all">
              <Checkbox.Group>
                <Checkbox onChange={handleCheckAll} value="true"><strong>전체 동의하기</strong></Checkbox>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item name="agree_unique">
              <Checkbox.Group>
                <Checkbox value="true">고유 식별 정보수집 및 이용 동의</Checkbox>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item name="agree_personal">
              <Checkbox.Group>
                <Checkbox value="true">개인정보 수집 및 이용 약관 동의</Checkbox>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item name="agree_offer">
              <Checkbox.Group>
                <Checkbox value="true">개인정보 제3자 제공 동의</Checkbox>
              </Checkbox.Group>
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
      <Form
        name="3"
        form={form}
        labelCol={{span: 3}}
        layout="horizontal"
      >
        <Descriptions column={2} bordered>
          <Descriptions.Item label="후원종류">{get(data, 'donation_type')}</Descriptions.Item>
          <Descriptions.Item label="후원금액">{get(data, 'price', '')}</Descriptions.Item>
          <Descriptions.Item label="신청인 성명">{get(data, 'applicant_name')}</Descriptions.Item>
          <Descriptions.Item label="신청인 생년월일">{get(data, 'applicant_birthday')}</Descriptions.Item>
          <Descriptions.Item label="신청인 전화번호">{get(data, 'applicant_phone')}</Descriptions.Item>
          <Descriptions.Item label="주민등록번호">{get(data, 'resident_registration_number', '')}</Descriptions.Item>
          <Descriptions.Item label="이메일">{get(data, 'email')}</Descriptions.Item>
          <Descriptions.Item label="예금주">{get(data, 'account_holder_name')}</Descriptions.Item>
          <Descriptions.Item label="예금주 생년월일">{get(data, 'account_holder_birthday')}</Descriptions.Item>
          <Descriptions.Item label="예금주 전화번호">{get(data, 'account_holder_phone')}</Descriptions.Item>
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
              canvasProps={{width: 384, height: 204, className: 'sig-canvas'}}
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
    const information = useSelector((state: RootState) => state.information.info, shallowEqual);

    return (
      <div style={{textAlign: 'center', marginTop: '70px'}}>
        <p><Text style={{fontSize: '30px'}}>후원신청 감사합니다.</Text></p>
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
          formData.append('memo', form.getFieldValue('memo'));

          await createDonation(formData);
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

export default DonationStep;
