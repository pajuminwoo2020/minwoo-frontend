import React, {useEffect} from 'react';
import queryString from 'query-string';
import {get, remove} from 'lodash';
import {useLocation} from 'react-router-dom';
import {ENotificationType} from 'enums/base.enum';
import {showNotification} from 'components/base/Common';
import {EMessageID} from 'enums/route.enum';

function NotificationMessage() {
  const location = useLocation();
  const messageID = queryString.parse(useLocation().search)?.messageID?.toString();
  const messageParam = queryString.parse(useLocation().search)?.messageParam?.toString();

  function generateMessage() {
    switch (messageID) {
      case EMessageID.SignupSuccess:
        return `회원가입이 완료되었습니다. 이메일[${messageParam}] 인증 후에 로그인할 수 있습니다.`;
      case EMessageID.ActivateSuccess:
        return '이메일 인증이 완료되었습니다.';
      case EMessageID.PasswordUpdate:
        return '비밀번호 재설정이 완료되었습니다. 새로운 비밀번호로 로그인해주세요';
      case EMessageID.PasswordReset:
        return `비밀번호 재설정 메일을 보냈습니다. 이메일[${messageParam}]을 확인하세요`;
      case EMessageID.BoardDelete:
        return '성공적으로 글을 삭제했습니다';
      case EMessageID.BoardEdit:
        return '성공적으로 글을 수정했습니다';
      case EMessageID.BoardCreate:
        return '성공적으로 글을 등록했습니다';
      default:
        return '';
    }
  }

  useEffect(() => {
    if (messageID) {
      showNotification('success', generateMessage());
    }
  }, [location]);

  return <></>;
}

NotificationMessage.defaultProps = {};

export default NotificationMessage;
