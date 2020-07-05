import {get, isPlainObject} from 'lodash';
import React from 'react';
import {IntlProvider} from 'react-intl';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {RouteProps} from 'react-router';
import {Redirect, Route, Switch} from 'react-router-dom';
import {EUserLanguage} from 'enums/base.enum';
import {CoreProvider} from 'libs/contexts/CoreContext';
import {getNavigatorLanguage} from 'libs/utils';
import {RootState} from 'modules';
import Login from 'components/user/Login';
import Signup from 'components/user/Signup';
import About from 'components/landing/About';
import ItemInfo from 'components/landing/ItemInfo';
import messages from 'translations/messages';
import Core from 'components/base/Core';
import {HeaderBeforeLogin} from 'components/base/Header';
import ErrorBoundary from 'components/base/error/ErrorBoundary';
import NoMatch from 'components/base/error/NoMatch';
import {TUser, setUserInfo} from 'modules/user';
import {main} from 'libs/api/user';

const data = main();

const App = () => {
  const dispatch = useDispatch();
  const language = getNavigatorLanguage(EUserLanguage.Korean);
  const currentUser = useSelector((state: RootState) => state.user.current_user, shallowEqual);
  if (currentUser === undefined) {
    const response: TUser = data.read();

    if (isPlainObject(response)) {
      dispatch(setUserInfo(response));
    }
  }

  const redirectMainPage = (Component: React.ComponentElement<any, any>) => {
    return currentUser ? <Redirect to="/main"/> : Component;
  };

  return (
    <IntlProvider
      locale={get(messages, `${language}.lang`, EUserLanguage.Korean)}
      messages={get(messages, `${language}`, get(messages, EUserLanguage.Korean))}
    >
      <CoreProvider>
        <ErrorBoundary>
          <Switch>
            <Route exact path={['/', '/en']}>
              <HeaderBeforeLogin><About/></HeaderBeforeLogin>
            </Route>
            <Route exact path="/login">
              {redirectMainPage(<HeaderBeforeLogin><Login/></HeaderBeforeLogin>)}
            </Route>
            <Route exact path="/signup">
              {redirectMainPage(<HeaderBeforeLogin><Signup/></HeaderBeforeLogin>)}
            </Route>
            <Route exact path="/about">
              <HeaderBeforeLogin><About/></HeaderBeforeLogin>
            </Route>
            <Route exact path="/item">
              <HeaderBeforeLogin><ItemInfo/></HeaderBeforeLogin>
            </Route>
            <PrivateRoute exact path="/main">
              <span>After login</span>
            </PrivateRoute>
            <Route path="*" component={NoMatch}/>
          </Switch>
        </ErrorBoundary>
        <Core/>
      </CoreProvider>
    </IntlProvider>
  );
};

type TPrivateRoute = RouteProps & {
  children?: React.ReactNode;
  checkAuth?: boolean;
};

const PrivateRoute = ({children, checkAuth, ...rest}: TPrivateRoute) => {
  const user = useSelector((state: RootState) => state.user.current_user);

  return (
    <Route
      {...rest}
      render={({location}) =>
        user ? (
          children
        ) : (
          <Redirect to={`/login?next=${location.pathname}`}/>
        )
      }
    />
  );
};

export default App;
