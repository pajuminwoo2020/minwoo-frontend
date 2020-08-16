import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {get, isEmpty, map} from 'lodash';
import {AxiosResponse} from 'axios';
import {ExclamationCircleOutlined, InboxOutlined, PlusOutlined} from '@ant-design/icons';
import {UploadChangeParam} from 'antd/lib/upload/interface';
import {Row, Col, Form, Input, Button, Modal, Upload, Select} from 'antd';
import {FormattedDate} from 'react-intl';
import {Link} from 'react-router-dom';
import {BoardDetailWrapper} from 'components/base/styles';
import {EBoardOperation} from 'enums/board.enum';
import DefaultSource from 'assets/default.png';
import {ENotificationType} from 'enums/base.enum';
import {ERoute, EMessageID} from 'enums/route.enum';
import NoMatch from 'components/base/error/NoMatch';
import {TBoardDetail, TCreateBoardDetail, TUpdateBoardDetail} from 'modules/board';
import {TSelectList} from 'modules/types';
import EditorComponent from 'components/base/EditorComponent';
import {showConfirm} from 'components/modal/showConfirm';
import {handleFieldError} from 'libs/api/errorHandle';
import {useThumbnail} from 'libs/hooks';
import {CUploadProps} from 'constants/base.const';
import {filteredFileNames} from 'libs/utils';
import Configs from 'config';
import {usePermission} from 'libs/hooks';

type TBoardDetailProps = {
  operation: EBoardOperation;
  pathName: string;
  promiseCreate: any,
  promiseUpdate: any,
  promiseDelete: any,
  hasThumbnail?: boolean,
  categories?: TSelectList;
  record?: TBoardDetail;
};

const {Option} = Select;
export const BoardDetail = ({
  operation,
  pathName,
  promiseCreate,
  promiseDelete,
  promiseUpdate,
  categories,
  hasThumbnail=false,
  record
}: TBoardDetailProps) => {
  const {boardManagementPermission} = usePermission();
  const BoardTitle = () => {
    return (
      <>
        <Row justify="space-between" align="top" className="box-title" gutter={[3, 3]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <div className="title-item">
              <span className="label">제목</span>
              <span className="value">{get(record, 'title')}</span>
            </div>
          </Col>
          <Col xs={24} sm={24} md={5} lg={5} xl={5}>
            <div className="title-item">
              <span className="label">작성자</span>
              <span className="value">{get(record, 'created_by.fullname')}</span>
            </div>
          </Col>
          <Col xs={24} sm={24} md={7} lg={7} xl={7}>
            <div className="title-item">
              <span className="label">작성일자</span>
              <span className="value">
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
              </span>
            </div>
          </Col>
        </Row>
        <Row className= "box-sub-title" justify="start">
          {get(record, 'category') && (
            <Col>
              <div className="title-item">
                <span className="label">카테고리</span>
                <span className="value">{get(record, 'category.name')}</span>
              </div>
            </Col>
          )}
          <Col>
            <div className="title-item">
              <span className="label">조회수</span>
              <span className="value">{get(record, 'hit_count')}</span>
            </div>
          </Col>
        </Row>
      </>
    );
  };

  const BoardView = () => {
    const {boardManagementPermission} = usePermission();

    async function onClickDelete() {
      try {
        await promiseDelete(get(record, 'id'));

        window.location.href = `${pathName}?messageID=${EMessageID.BoardDelete}`;
      } catch (e) {
        throw e;
      }
    }

    return (
      <>
        {boardManagementPermission &&
          <div style={{textAlign: 'right', marginBottom: '10px'}}>
            <Link to={`${ERoute.ActivityNotice}/${EBoardOperation.Create}`}>
              <Button
                type="primary"
                size="large"
                icon={<PlusOutlined/>}
              >
                글쓰기
              </Button>
            </Link>
          </div>
        }
        <BoardTitle/>
        <div className="body-view">
          <div dangerouslySetInnerHTML={{ __html: `${get(record, 'body', '')}`}}/>
        </div>
        {get(record, 'files', []).length > 0 && (
          <div className="box-attachments">
            첨부파일
            {map(get(record, 'files', []), v => (
              <a className="file-name" href={`${Configs.API_HOST}${get(v, 'absolute_url')}`}>{get(v, 'file_name')}</a>
            ))}
          </div>
        )}
        <Row justify="space-between" className="btn-bottom">
          <Col>
            <Link to={pathName}>
              <Button type="primary" size="large">목록</Button>
            </Link>
          </Col>
          {boardManagementPermission &&
            <Col>
              <Button
                type="primary"
                size="large"
                onClick={() => showConfirm(() => onClickDelete(), '게시글을 삭제하시겠습니까?')}
                style={{marginRight: '20px'}}
              >
                삭제
              </Button>
              <Link to={`${pathName}/${EBoardOperation.Edit}/${get(record, 'id')}`}>
                <Button type="primary" size="large">수정</Button>
              </Link>
            </Col>
          }
        </Row>
      </>
    );
  }

  const BoardEdit = () => {
    const [form] = Form.useForm();
    const [thumbnailSource, setThumbnail, setThumbnailSource] = useThumbnail(hasThumbnail);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    useEffect(() => {
      if (isEmpty(record) === false) {
        form.setFieldsValue({
          title: get(record, 'title'),
          files: map(get(record, 'files'), v => ({
            uid: v.id,
            status: 'done',
            name: v.file_name,
          })),
          body: get(record, 'body'),
          category: get(record, 'category.id'),
        });
        setThumbnailSource(get(record, 'thumbnail_source'));
      }
    }, [record]);

    function onClickUpdate() {
      form.validateFields().then(value => {
        handleUpdate(value as TUpdateBoardDetail);
      });
      async function handleUpdate(value: TUpdateBoardDetail) {
        try {
          setSubmitButtonDisabled(true);
          await promiseUpdate(get(record, 'id'), {
            title: get(value, 'title'),
            body: get(value, 'body'),
            category: get(value, 'category'),
            file_ids: filteredFileNames(get(value, 'files')),
            thumbnail_source: thumbnailSource,
          });

          window.location.href = `${pathName}?messageID=${EMessageID.BoardEdit}`;
        } catch (e) {
          handleFieldError(e, form);
          throw e;
        } finally {
          setSubmitButtonDisabled(false);
        }
      }
    }

    return (
      <>
        <Form form={form} className="body-edit">
          <Form.Item noStyle>
            <Input.Group>
              <Row>
                {categories && (
                  <Col flex='120px'>
                    <Form.Item name="category">
                      <Select size="large" style={{width: '100%'}} placeholder="카테고리">
                        {categories.map(v => {
                          return (
                            <Option value={v.value} key={v.value}>
                              {v.label}
                            </Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                )}
                <Col flex='auto'>
                  <Form.Item name="title" rules={[{required: true, message: '제목을 입력해주세요'}]}>
                    <Input size="large" placeholder="제목"/>
                  </Form.Item>
                </Col>
              </Row>
            </Input.Group>
          </Form.Item>
          <Form.Item name="body" rules={[{required: true, message: '내용을 입력해주세요'}]}>
            <EditorComponent content={get(record, 'body', '')} setThumbnail={setThumbnail}/>
          </Form.Item>
          <Form.Item
            noStyle
            name="files"
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.files !== currentValues.files
            }
            valuePropName="fileList"
            getValueFromEvent={(e: UploadChangeParam) => (Array.isArray(e) ? e : e && e?.fileList)}
          >
            <Upload.Dragger name="file" {...CUploadProps}>
              <p className="ant-upload-drag-icon"><InboxOutlined/></p>
              <p className="ant-upload-text">파일 업로드하기</p>
              <p className="ant-upload-hint">파일을 드래그하거나 여기를 클릭해주세요</p>
            </Upload.Dragger>
          </Form.Item>
        </Form>
        <Row justify="space-between" className="btn-bottom">
          <Col>
            <Link to={pathName}>
              <Button type="primary" size="large">목록</Button>
            </Link>
          </Col>
          <Col>
            <Button
              type="primary"
              size="large"
              disabled={submitButtonDisabled}
              onClick={onClickUpdate}
            >
              수정
            </Button>
          </Col>
        </Row>
      </>
    );
  }

  const BoardCreate = () => {
    const [form] = Form.useForm();
    const [thumbnailSource, setThumbnail] = useThumbnail(hasThumbnail);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    function onClickCreate() {
      form.validateFields().then(value => {
        handleCreate(value as TCreateBoardDetail);
      });
      async function handleCreate (value: TCreateBoardDetail) {
        try {
          setSubmitButtonDisabled(true);
          await promiseCreate({
            title: get(value, 'title'),
            body: get(value, 'body'),
            category: get(value, 'category'),
            file_ids: filteredFileNames(get(value, 'files')),
            thumbnail_source: thumbnailSource,
          });

          window.location.href = `${pathName}?messageID=${EMessageID.BoardCreate}`;
        } catch (e) {
          handleFieldError(e, form);
          throw e;
        } finally {
          setSubmitButtonDisabled(false);
        }
      }
    }

    return (
      <>
        <Form form={form} className="body-edit">
          <Form.Item noStyle>
            <Input.Group>
              <Row>
                {categories && (
                  <Col flex='120px'>
                    <Form.Item name="category">
                      <Select size="large" style={{width: '100%'}} placeholder="카테고리">
                        {categories.map(v => {
                          return (
                            <Option value={v.value} key={v.value}>
                              {v.label}
                            </Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                )}
                <Col flex='auto'>
                  <Form.Item name="title" rules={[{required: true, message: '제목을 입력해주세요'}]}>
                    <Input size="large" placeholder="제목"/>
                  </Form.Item>
                </Col>
              </Row>
            </Input.Group>
          </Form.Item>
          <Form.Item name="body" rules={[{required: true, message: '내용을 입력해주세요'}]}>
            <EditorComponent setThumbnail={setThumbnail}/>
          </Form.Item>
          <Form.Item
            noStyle
            name="files"
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.files !== currentValues.files
            }
            valuePropName="fileList"
            getValueFromEvent={(e: UploadChangeParam) => (Array.isArray(e) ? e : e && e?.fileList)}
          >
            <Upload.Dragger name="file" {...CUploadProps}>
              <p className="ant-upload-drag-icon"><InboxOutlined/></p>
              <p className="ant-upload-text">파일 업로드하기</p>
              <p className="ant-upload-hint">파일을 드래그하거나 여기를 클릭해주세요</p>
            </Upload.Dragger>
          </Form.Item>
        </Form>
        <Row justify="space-between" className="btn-bottom">
          <Col>
            <Link to={pathName}>
              <Button type="primary" size="large">목록</Button>
            </Link>
          </Col>
          <Col>
            <Button
              type="primary"
              size="large"
              disabled={submitButtonDisabled}
              onClick={onClickCreate}
            >
              등록
            </Button>
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
        <>
          {boardManagementPermission && <BoardEdit/>}
        </>
      || operation === EBoardOperation.Create &&
        <>
          {boardManagementPermission && <BoardCreate/>}
        </>
      ||
        <NoMatch/>
      }
    </BoardDetailWrapper>
  );
}

export function getImageSource(item: TBoardDetail) {
  if (get(item, 'thumbnail_source'))
    return `${Configs.API_HOST}${get(item, 'thumbnail_source')}`;

  return DefaultSource;
}

export default BoardDetail;
