import {get, isPlainObject} from 'lodash';
import React from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {RouteProps} from 'react-router';
import {Redirect, Route, Switch} from 'react-router-dom';
import {CoreProvider} from 'libs/contexts/CoreContext';
import {getNavigatorLanguage} from 'libs/utils';
import {RootState} from 'modules';
import Main from 'components/base/Main';
import Login from 'components/user/Login';
import Signup from 'components/user/Signup';
import Edit from 'components/user/Edit';
import PasswordReset from 'components/user/PasswordReset';
import IntroAbout from 'components/intro/About' ;
import People from 'components/intro/People';
import History from 'components/intro/History';
import Settlement from 'components/intro/Settlement';
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
import BoardNewsLetter from 'components/board/NewsLetter';
import BoardGallery from 'components/board/Gallery';
import Core from 'components/base/Core';
import {HeaderTemplate} from 'components/base/HeaderTemplate';
import ErrorBoundary from 'components/base/error/ErrorBoundary';
import NoMatch from 'components/base/error/NoMatch';
import {TUser, setUserInfo} from 'modules/user';
import {main} from 'libs/api/user';

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
	<CoreProvider>
	  <ErrorBoundary>
		<Switch>
		  <Route exact path={['/', '/en']}>
			<HeaderTemplate><Main/></HeaderTemplate>
		  </Route>
		  <Route exact path="/user/login">
			<HeaderTemplate><Login/></HeaderTemplate>
		  </Route>
		  <Route exact path="/user/signup">
			<HeaderTemplate><Signup/></HeaderTemplate>
		  </Route>
		  <Route exact path="/user/edit">
			<HeaderTemplate><Edit/></HeaderTemplate>
		  </Route>
          <Route exact path="/user/password/reset">
			<HeaderTemplate><PasswordReset/></HeaderTemplate>
		  </Route>
          <Route exact path="/intro/about">
			<HeaderTemplate><IntroAbout/></HeaderTemplate>
          </Route>
          <Route exact path="/intro/people">
			<HeaderTemplate><People/></HeaderTemplate>
          </Route>
          <Route exact path="/intro/history">
			<HeaderTemplate><History/></HeaderTemplate>
          </Route>
          <Route exact path="/intro/settlement">
			<HeaderTemplate><Settlement/></HeaderTemplate>
          </Route>
          <Route exact path="/intro/location">
			<HeaderTemplate><Location/></HeaderTemplate>
          </Route>
          <Route exact path="/activity/notice">
			<HeaderTemplate><Notice/></HeaderTemplate>
          </Route>
          <Route exact path="/activity/action">
			<HeaderTemplate><Action/></HeaderTemplate>
          </Route>
          <Route exact path="/activity/press">
			<HeaderTemplate><Press/></HeaderTemplate>
          </Route>
          <Route exact path="/affiliate/about">
			<HeaderTemplate><AffiliateAbout/></HeaderTemplate>
          </Route>
          <Route exact path="/affiliate/activity">
			<HeaderTemplate><AffiliateActivity/></HeaderTemplate>
          </Route>
          <Route exact path="/member/society_about">
			<HeaderTemplate><MemberAbout/></HeaderTemplate>
          </Route>
          <Route exact path="/member/society_activity">
			<HeaderTemplate><MemberActivity/></HeaderTemplate>
          </Route>
          <Route exact path="/member/local">
			<HeaderTemplate><MemberLocal/></HeaderTemplate>
          </Route>
          <Route exact path="/member/donation">
			<HeaderTemplate><MemberDonation/></HeaderTemplate>
          </Route>
          <Route exact path="/member/band">
			<HeaderTemplate><MemberBand/></HeaderTemplate>
          </Route>
          <Route exact path="/board/newsletter">
			<HeaderTemplate><BoardNewsLetter/></HeaderTemplate>
          </Route>
          <Route exact path="/board/gallery">
			<HeaderTemplate><BoardGallery/></HeaderTemplate>
          </Route>
		  <Route path="*" component={NoMatch}/>
		</Switch>
	  </ErrorBoundary>
	  <Core/>
	</CoreProvider>
  );
};

export default App;
