import React, {useState, useEffect} from 'react';
import {Button, Checkbox, Form, Input} from 'antd';
import { DatePicker, Space } from 'antd';

import {Title, FormWrapper} from 'components/user/styles';
import {handleFieldError} from 'libs/api/errorHandle';
import {ERoute} from 'enums/route.enum';
import {TCalendar} from 'modules/information';
import {createSchedule} from 'libs/api/information';
import {Row, Col} from 'antd';

import {Link, useLocation} from 'react-router-dom';
import {LockOutlined, UserOutlined, PhoneOutlined} from '@ant-design/icons';


const CalendarEdit = () => {
    const [form] = Form.useForm();
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
    const onClickAddSchedule = () => {
        form.validateFields().then(value => {
          handleAddSchedule(value as TCalendar);
        });
      };
      const handleAddSchedule = async (value: TCalendar) => {
        try {
          setSubmitButtonDisabled(true);
          const response = await createSchedule({
            schedule_name: value.schedule_name,
            schedule_from: value.schedule_from,
            schedule_to: value.schedule_to,
            memo:value.memo
          });
    
          window.location.href = `${ERoute.ActivityCalendar}`;
        } catch (e) {
          handleFieldError(e, form);
          throw e;
        } finally {
          setSubmitButtonDisabled(false);
        }
      };

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
                    rules={[
                        {
                            type: 'string',
                            message: '일정 제목 형식이 올바르지 않습니다',
                        },
                        { required: true, message: '일정 제목을 입력해주세요' },
                    ]}
                >
                    <Input
                        size="large"
                        prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder='일정 제목'
                    />
                </Form.Item>
                <Form.Item>
                    <Input.Group>
                        <Row justify="space-between" gutter={16}>
                            <Col span={10}>
                                <Form.Item
                                    name={'schedule_to'}
                                    className="form-item"
                                    style={{ verticalAlign: 'middle' }}
                                >
                                    <DatePicker showTime size="large" format="YYYY-MM-DD HH:mm" placeholder='시작 시각' />
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <div style={{ display: 'inline-block', textAlign: 'center', margin: 'auto', width: '100%' }}>
                                    -
                                </div>
                            </Col>
                            <Col span={10}>
                                <Form.Item
                                    name={'schedule_from'}
                                    className="form-item"
                                    style={{ verticalAlign: 'middle' }}
                                >
                                    <DatePicker showTime size="large" format="YYYY-MM-DD HH:mm" placeholder='종료 시각' />
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