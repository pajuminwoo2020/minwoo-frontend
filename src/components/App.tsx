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
import messages from 'translations/messages';
import Core from 'components/base/Core';
import ErrorBoundary from 'components/base/error/ErrorBoundary';
import NoMatch from 'components/base/error/NoMatch';

const App = () => {
  const dispatch = useDispatch();
  const language = getNavigatorLanguage(EUserLanguage.Korean);

  return (
    <IntlProvider
      locale={get(messages, `${language}.lang`, EUserLanguage.Korean)}
      messages={get(messages, `${language}`, get(messages, EUserLanguage.Korean))}
    >
      <CoreProvider>
        <ErrorBoundary>
          <Switch>
            <Route exact path={['/', '/en']}>
              <Login/>
            </Route>
            <Route exact path="/login">
              <Login/>
            </Route>
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
  return (
    <Route
      {...rest}
      render={({location}) =>
        false ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {from: location.pathname},
            }}
          />
        )
      }
    />
  );
};

export default App;
