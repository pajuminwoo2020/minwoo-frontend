import React from 'react';
import styled from 'styled-components';
import {get} from 'lodash';
import {Row, Col, Form, Input, Button} from 'antd';
import {FormattedDate} from 'react-intl';
import {useHistory} from 'react-router-dom';
import {BoardDetailWrapper} from 'components/base/styles';
import {EBoardOperation} from 'enums/board.enum';
import {ENotificationType} from 'enums/base.enum';
import NoMatch from 'components/base/error/NoMatch';
import {TBoardDetail, TCreateBoardDetail} from 'modules/board';
import EditorComponent from 'components/base/EditorComponent';
import {handleFieldError} from 'libs/api/errorHandle';

type TBoardDetailProps = {
  operation: EBoardOperation;
  pathName: string;
  promiseCreate: any,
  promiseUpdate?: any,
  promiseDelete?: any,
  record?: TBoardDetail;
};

export const BoardDetail = ({
  operation,
  pathName,
  promiseCreate,
  record
}: TBoardDetailProps) => {
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
    return (
      <div className="box">
        <BoardTitle/>
        <div className= "body-view">
          <EditorComponent content={get(record, 'body', '')} disabled={true}/>
        </div>
      </div>
    );
  }

  const BoardEdit = () => {
    return (
      <div className="box">
        <div className= "body-edit">
          <EditorComponent content={get(record, 'body', '')} disabled={false}/>
        </div>
      </div>
    );
  }

  const BoardCreate = () => {
    const [form] = Form.useForm();
    const history = useHistory();

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
      <div className="box">
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
      </div>
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
