import React, {useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {ENotificationType} from 'enums/base.enum';
import {userActivate} from 'libs/api/user';
import { ERoute } from 'enums/route.enum';

const Activate = () => {
  const history = useHistory();

  let {uidb64 = '', token = ''} = useParams();

  const handleAction = async (uidb64: string, token: string) => {
    try {  
      await userActivate(uidb64, token);
      let redirectPath = ERoute.UserLogin;

      history.push({
        pathname: redirectPath,
        state: {
          notification: {type: ENotificationType.Success, content: '이메일 인증이 완료되었습니다.'},
        },
      });
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    handleAction(uidb64, token);
  }, []);

  return <></>;
}
export default Activate;
