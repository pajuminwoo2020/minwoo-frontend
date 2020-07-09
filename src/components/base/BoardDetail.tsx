import React, {useEffect} from 'react';
import styled from 'styled-components';
import {get, isEmpty} from 'lodash';
import {AxiosResponse} from 'axios';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import {Row, Col, Form, Input, Button, Modal} from 'antd';
import {FormattedDate} from 'react-intl';
import {useHistory} from 'react-router-dom';
import {BoardDetailWrapper} from 'components/base/styles';
import {EBoardOperation} from 'enums/board.enum';
import {ENotificationType} from 'enums/base.enum';
import NoMatch from 'components/base/error/NoMatch';
import {TBoardDetail, TCreateBoardDetail} from 'modules/board';
import EditorComponent from 'components/base/EditorComponent';
import {showConfirm} from 'components/modal/showConfirm';
import {handleFieldError} from 'libs/api/errorHandle';

type TBoardDetailProps = {
  operation: EBoardOperation;
  pathName: string;
  promiseCreate: any,
  promiseUpdate: any,
  promiseDelete: any,
  record?: TBoardDetail;
};

export const BoardDetail = ({
  operation,
  pathName,
  promiseCreate,
  promiseDelete,
  promiseUpdate,
  record
}: TBoardDetailProps) => {
  const history = useHistory();
  const BoardTitle = () => {
    return (
      <>
        <Row justify="space-between" align="middle" className="box-title">
          <Col>
            <div className="title-item">
              <div className="label">제목</div>
              <div className="value">{get(record, 'title')}</div>
            </div>
          </Col>
          <Col>
            <div className="title-item">
              <div className="label">작성자</div>
              <div className="value">{get(record, 'created_by.fullname')}</div>
            </div>
            <div className="title-item">
              <div className="label">작성일자</div>
              <div className="value">
                <FormattedDate
                  value={get(record, 'created_at')}
                  year="numeric"
                  month="long"
                  day="2-digit"
                  hour12={true}
                  hour="numeric"
                  minute="numeric"
                  second="numeric"
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row className= "box-sub-title" justify="end">
          <Col>
            <div className="title-item">
              <div className="label">조회수</div>
              <div className="value">{get(record, 'hit_count')}</div>
            </div>
          </Col>
        </Row>
      </>
    );
  };

  const BoardView = () => {
    async function onClickDelete() {
      try {
        await promiseDelete(get(record, 'id'));

        history.push({
          pathname: pathName,
          state: {
            notification: {type: ENotificationType.Success, content: '성공적으로 글을 삭제했습니다' }
          },
        });
      } catch (e) {
        throw e;
      }
    }

    return (
      <>
        <BoardTitle/>
        <div className= "body-view">
          <EditorComponent content={get(record, 'body', '')} disabled={true}/>
        </div>
        <Row justify="space-between" className="btn-bottom">
          <Col>
            <Button type="primary" size="large" href={pathName}>목록</Button>
          </Col>
          <Col>
            <Button
              type="primary"
              size="large"
              onClick={() => showConfirm(() => onClickDelete(), '게시글을 삭제하시겠습니까?')}
              style={{marginRight: '20px'}}
            >삭제</Button>
            <Button type="primary" size="large" href={`${pathName}/${EBoardOperation.Edit}/${get(record, 'id')}`}>수정</Button>
          </Col>
        </Row>
      </>
    );
  }

  const BoardEdit = () => {
    const [form] = Form.useForm();

    useEffect(() => {
      if (isEmpty(record) === false) {
        form.setFieldsValue({
          title: get(record, 'title'),
        });
      }
    }, [record]);

    async function onClickUpdate() {
      try {
        await promiseUpdate(get(record, 'id'), {
          title: form.getFieldValue('title'),
          body: form.getFieldValue('body'),
        });

        history.push({
          pathname: pathName,
          state: {
            notification: {type: ENotificationType.Success, content: '성공적으로 글을 수정했습니다' }
          },
        });
      } catch (e) {
        handleFieldError(e, form);
        throw e;
      }
    }

    return (
      <>
        <Form form={form} className="body-edit">
          <Form.Item name="title" rules={[{required: true, message: '제목을 입력해주세요'}]}>
            <Input size="large" placeholder="제목"/>
          </Form.Item>
          <Form.Item name="body">
            <EditorComponent content={get(record, 'body', '')} disabled={false}/>
          </Form.Item>
        </Form>
        <Row justify="space-between" className="btn-bottom">
          <Col>
            <Button type="primary" size="large" href={pathName}>목록</Button>
          </Col>
          <Col>
            <Button type="primary" size="large" onClick={onClickUpdate}>수정</Button>
          </Col>
        </Row>
      </>
    );
  }

  const BoardCreate = () => {
    const [form] = Form.useForm();

    async function onClickCreate() {
      try {
        await promiseCreate({
          title: form.getFieldValue('title'),
          body: form.getFieldValue('body'),
        });

        history.push({
          pathname: pathName,
          state: {
            notification: {type: ENotificationType.Success, content: '성공적으로 글을 등록했습니다' }
          },
        });
      } catch (e) {
        handleFieldError(e, form);
        throw e;
      }
    }

    return (
      <>
        <Form form={form} className="body-edit">
          <Form.Item name="title" rules={[{required: true, message: '제목을 입력해주세요'}]}>
            <Input size="large" placeholder="제목"/>
          </Form.Item>
          <Form.Item name="body">
            <EditorComponent disabled={false}/>
          </Form.Item>
        </Form>
        <Row justify="space-between" className="btn-bottom">
          <Col>
            <Button type="primary" size="large" href={pathName}>목록</Button>
          </Col>
          <Col>
            <Button type="primary" size="large" onClick={onClickCreate}>등록</Button>
          </Col>
        </Row>
      </>
    );
  }

  return (
    <BoardDetailWrapper>
      {operation === EBoardOperation.View &&
        <BoardView/>
      || operation === EBoardOperation.Edit &&
        <BoardEdit/>
      || operation === EBoardOperation.Create &&
        <BoardCreate/>
      ||
        <NoMatch/>
      }
    </BoardDetailWrapper>
  );
}

export default BoardDetail;
