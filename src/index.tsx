import React from 'react';
import {render} from 'react-dom';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import {HelmetProvider} from 'react-helmet-async';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import * as Sentry from '@sentry/browser';
import {Integrations as ApmIntegrations} from '@sentry/apm';
import * as serviceWorker from 'serviceWorker';
import {LoadingOutlined} from '@ant-design/icons';
import {Spin} from 'antd';
import styled from 'styled-components';
import configureStore, {customHistory} from 'stores/configureStore';
import Configs from 'config';
import {EProjectType} from 'enums/configs.enum';

Configs.SENTRY && Sentry.init({
  dsn: Configs.SENTRY,
  environment: Configs.PROJECT,
  integrations: [
    new ApmIntegrations.Tracing(),
  ],
  tracesSampleRate: 0.25,
});

const Root: React.FC = () => {
  const App = React.lazy(() => import('components/App'));
  const store = configureStore({});
  const loadingIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;
  const SpinWrapper = styled(Spin)`
    position: fixed;
    top: 400px;
    left: 0;
    width: 100%;
    height: 100%;
  `;

  return (
    <Router history={customHistory}>
      <HelmetProvider>
        <Provider store={store}>
          <React.Suspense fallback={<SpinWrapper indicator={loadingIcon}/>}>
            <App/>
          </React.Suspense>
        </Provider>
      </HelmetProvider>
    </Router>
  );
};

const renderApp = () => render(<Root />, document.getElementById('root'));

// @ts-ignore
if (process.env.NODE_ENV !== EProjectType.PRODUCTION && module.hot) {
  // @ts-ignore
  module.hot.accept('components/App', renderApp);
}

renderApp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
