import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {ENotificationType} from 'enums/base.enum';
import {userActivate} from 'libs/api/user';
import {ERoute, EMessageID} from 'enums/route.enum';

const Activate = () => {
  let {uidb64 = '', token = ''} = useParams();

  const handleAction = async (uidb64: string, token: string) => {
    try {
      await userActivate(uidb64, token);

	  window.location.href = `${ERoute.UserLogin}?messageID=${EMessageID.ActivateSuccess}`;
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
