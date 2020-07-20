import {get, isPlainObject} from 'lodash';
import React, {useEffect} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {RouteProps} from 'react-router';
import {Redirect, Route, Switch, useLocation} from 'react-router-dom';
import {IntlProvider} from 'react-intl';
import {CoreProvider} from 'libs/contexts/CoreContext';
import {getNavigatorLanguage} from 'libs/utils';
import {RootState} from 'modules';
import {ERoute} from 'enums/route.enum';
import Main from 'components/base/Main';
import Agreement from 'components/base/Agreement';
import Privacy from 'components/base/Privacy';
import Login from 'components/user/Login';
import Signup from 'components/user/Signup';
import Edit from 'components/user/Edit';
import PasswordReset from 'components/user/PasswordReset';
import IntroAbout from 'components/intro/About' ;
import People from 'components/intro/People';
import History from 'components/intro/History';
import Settlement, {SettlementDetail} from 'components/intro/Settlement';
import Location from 'components/intro/Location';
import Notice, {NoticeDetail} from 'components/activity/Notice';
import Action, {ActionDetail} from 'components/activity/Action';
import Donation from 'components/activity/Donation';
import DonationStep from 'components/activity/DonationStep';
import ActivityMember, {ActivityMemberDetail} from 'components/activity/ActivityMember';
import Calendar from 'components/activity/Calendar';
import Press, {PressDetail} from 'components/activity/Press';
import AffiliateAbout from 'components/affiliate/About';
import AffiliateActivity from 'components/affiliate/Activity';
import SocietyAbout from 'components/member/SocietyAbout';
import SocietyActivity, {SocietyActivityDetail} from 'components/member/SocietyActivity';
import MemberSpace, {MemberSpaceDetail} from 'components/member/Space';
import NewsLetter, {NewsLetterDetail} from 'components/bulletin/NewsLetter';
import Gallery, {GalleryDetail} from 'components/bulletin/Gallery';
import Drive, {DriveDetail} from 'components/bulletin/Drive';
import Core from 'components/base/Core';
import {BaseTemplate} from 'components/base/BaseTemplate';
import ErrorBoundary from 'components/base/error/ErrorBoundary';
import NoMatch from 'components/base/error/NoMatch';
import {TUser, setUserInfo} from 'modules/user';
import {main} from 'libs/api/user';

const data = main();

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.current_user, shallowEqual);
  if (currentUser === undefined) {
    const response: TUser = data.read();

    if (isPlainObject(response)) {
      dispatch(setUserInfo(response));
    }
  }

  useEffect(() => {
	window.scrollTo(0,0);
  }, [location]);

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
            <Route path={`${ERoute.ActivityNotice}/:operation`}>
              <BaseTemplate><NoticeDetail/></BaseTemplate>
            </Route>
            <Route exact path={ERoute.ActivityAction}>
              <BaseTemplate><Action/></BaseTemplate>
            </Route>
            <Route path={`${ERoute.ActivityAction}/:operation`}>
              <BaseTemplate><ActionDetail/></BaseTemplate>
            </Route>
            <Route exact path={ERoute.ActivityMember}>
              <BaseTemplate><ActivityMember/></BaseTemplate>
            </Route>
            <Route path={`${ERoute.ActivityMember}/:operation`}>
              <BaseTemplate><ActivityMemberDetail/></BaseTemplate>
            </Route>
            <Route exact path={ERoute.ActivityPress}>
              <BaseTemplate><Press/></BaseTemplate>
            </Route>
            <Route path={`${ERoute.ActivityPress}/:operation`}>
              <BaseTemplate><PressDetail/></BaseTemplate>
            </Route>
            <Route exact path={ERoute.ActivityDonation}>
              <BaseTemplate><Donation/></BaseTemplate>
            </Route>
            <Route exact path={ERoute.ActivityDonationStep}>
              <BaseTemplate><DonationStep/></BaseTemplate>
            </Route>
            <Route exact path={ERoute.ActivityCalendar}>
              <BaseTemplate><Calendar/></BaseTemplate>
            </Route>
            <Route exact path={ERoute.AffiliateAbout}>
              <BaseTemplate><AffiliateAbout/></BaseTemplate>
            </Route>
            <Route exact path={ERoute.AffiliateActivity}>
              <BaseTemplate><AffiliateActivity/></BaseTemplate>
            </Route>
            <Route exact path={ERoute.MemberSocietyAbout}>
              <BaseTemplate><SocietyAbout/></BaseTemplate>
            </Route>
            <Route exact path={ERoute.MemberSocietyActivity}>
              <BaseTemplate><SocietyActivity/></BaseTemplate>
            </Route>
            <Route path={`${ERoute.MemberSocietyActivity}/:operation`}>
              <BaseTemplate><SocietyActivityDetail/></BaseTemplate>
            </Route>
            <Route exact path={ERoute.MemberSpace}>
              <BaseTemplate><MemberSpace/></BaseTemplate>
            </Route>
            <Route path={`${ERoute.MemberSpace}/:operation`}>
              <BaseTemplate><MemberSpaceDetail/></BaseTemplate>
            </Route>
            <Route exact path={ERoute.BulletinNewsletter}>
              <BaseTemplate><NewsLetter/></BaseTemplate>
            </Route>
            <Route path={`${ERoute.BulletinNewsletter}/:operation`}>
              <BaseTemplate><NewsLetterDetail/></BaseTemplate>
            </Route>
            <Route exact path={ERoute.BulletinGallery}>
              <BaseTemplate><Gallery/></BaseTemplate>
            </Route>
            <Route path={`${ERoute.BulletinGallery}/:operation`}>
              <BaseTemplate><GalleryDetail/></BaseTemplate>
            </Route>
            <Route exact path={ERoute.BulletinDrive}>
              <BaseTemplate><Drive/></BaseTemplate>
            </Route>
            <Route path={`${ERoute.BulletinDrive}/:operation`}>
              <BaseTemplate><DriveDetail/></BaseTemplate>
            </Route>
            <Route exact path={ERoute.Privacy}>
              <BaseTemplate><Privacy/></BaseTemplate>
            </Route>
            <Route exact path={ERoute.Agreement}>
              <BaseTemplate><Agreement/></BaseTemplate>
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
