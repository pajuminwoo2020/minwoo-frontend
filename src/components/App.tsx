import {get, isPlainObject} from 'lodash';
import React from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {RouteProps} from 'react-router';
import {Redirect, Route, Switch} from 'react-router-dom';
import {IntlProvider} from 'react-intl';
import {CoreProvider} from 'libs/contexts/CoreContext';
import {getNavigatorLanguage} from 'libs/utils';
import {RootState} from 'modules';
import {ERoute} from 'enums/route.enum';
import Main from 'components/base/Main';
import Login from 'components/user/Login';
import Signup from 'components/user/Signup';
import Edit from 'components/user/Edit';
import PasswordReset from 'components/user/PasswordReset';
import IntroAbout from 'components/intro/About' ;
import People from 'components/intro/People';
import History from 'components/intro/History';
import Settlement, {SettlementDetail} from 'components/intro/Settlement';
import Location from 'components/intro/Location';
import Notice from 'components/activity/Notice';
import Action from 'components/activity/Action';
import Press from 'components/activity/Press';
import AffiliateAbout from 'components/affiliate/About';
import AffiliateActivity from 'components/affiliate/Activity';
import MemberAbout from 'components/member/SocietyAbout';
import MemberActivity from 'components/member/SocietyActivity';
import MemberLocal from 'components/member/Local';
import MemberDonation from 'components/member/Donation';
import MemberBand from 'components/member/Band';
import BulletinNewsLetter from 'components/bulletin/NewsLetter';
import BulletinGallery from 'components/bulletin/Gallery';
import Core from 'components/base/Core';
import {BaseTemplate} from 'components/base/BaseTemplate';
import ErrorBoundary from 'components/base/error/ErrorBoundary';
import NoMatch from 'components/base/error/NoMatch';
import {TUser, setUserInfo} from 'modules/user';
import {main} from 'libs/api/user';
import Activate from 'components/user/Activate';

const data = main();

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.current_user, shallowEqual);
  if (currentUser === undefined) {
    const response: TUser = data.read();

    if (isPlainObject(response)) {
      dispatch(setUserInfo(response));
    }
  }

  return (
	<IntlProvider locale={'ko'}>
      <CoreProvider>
        <ErrorBoundary>
          <Switch>
            <Route exact path={['/', '/en']}>
              <BaseTemplate><Main/></BaseTemplate>
            </Route>
            <Route exact path={ERoute.UserLogin}>
              <BaseTemplate><Login/></BaseTemplate>
            </Route>
            <Route exact path={ERoute.UserSignup}>
              <BaseTemplate><Signup/></BaseTemplate>
            </Route>
            <Route exact path='/user/activate/:uidb64/:token'>
              <BaseTemplate><Activate/></BaseTemplate>
            </Route>
            <Route exact path={ERoute.UserEdit}>
              <BaseTemplate><Edit/></BaseTemplate>
            </Route>
            <Route exact path={ERoute.UserPasswordReset}>
              <BaseTemplate><PasswordReset/></BaseTemplate>
            </Route>
            <Route exact path={ERoute.IntroAbout}>
              <BaseTemplate><IntroAbout/></BaseTemplate>
            </Route>
            <Route exact path={ERoute.IntroPeople}>
              <BaseTemplate><People/></BaseTemplate>
            </Route>
            <Route exact path={ERoute.IntroHistory}>
              <BaseTemplate><History/></BaseTemplate>
            </Route>
            <Route exact path={ERoute.IntroSettlement}>
              <BaseTemplate><Settlement/></BaseTemplate>
            </Route>
            <Route path={`${ERoute.IntroSettlement}/:operation`}>
              <BaseTemplate><SettlementDetail/></BaseTemplate>
            </Route>
            <Route exact path={ERoute.IntroLocation}>
              <BaseTemplate><Location/></BaseTemplate>
            </Route>
            <Route exact path={ERoute.ActivityNotice}>
              <BaseTemplate><Notice/></BaseTemplate>
            </Route>
            <Route exact path={ERoute.ActivityAction}>
              <BaseTemplate><Action/></BaseTemplate>
            </Route>
            <Route exact path={ERoute.ActivityPress}>
              <BaseTemplate><Press/></BaseTemplate>
            </Route>
            <Route exact path={ERoute.AffiliateAbout}>
              <BaseTemplate><AffiliateAbout/></BaseTemplate>
            </Route>
            <Route exact path={ERoute.AffiliateActivity}>
              <BaseTemplate><AffiliateActivity/></BaseTemplate>
            </Route>
            <Route exact path={ERoute.MemberSocietyAbout}>
              <BaseTemplate><MemberAbout/></BaseTemplate>
            </Route>
            <Route exact path={ERoute.MemberSocietyActivity}>
              <BaseTemplate><MemberActivity/></BaseTemplate>
            </Route>
            <Route exact path={ERoute.MemberLocal}>
              <BaseTemplate><MemberLocal/></BaseTemplate>
            </Route>
            <Route exact path={ERoute.MemberDonation}>
              <BaseTemplate><MemberDonation/></BaseTemplate>
            </Route>
            <Route exact path={ERoute.MemberBand}>
              <BaseTemplate><MemberBand/></BaseTemplate>
            </Route>
            <Route exact path={ERoute.BulletinNewsletter}>
              <BaseTemplate><BulletinNewsLetter/></BaseTemplate>
            </Route>
            <Route exact path={ERoute.BulletinGallery}>
              <BaseTemplate><BulletinGallery/></BaseTemplate>
            </Route>
            <Route path="*" component={NoMatch}/>
          </Switch>
        </ErrorBoundary>
        <Core/>
      </CoreProvider>
    </IntlProvider>
  );
};

export default App;
