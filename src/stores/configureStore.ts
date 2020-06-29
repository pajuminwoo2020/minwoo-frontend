import {createBrowserHistory} from 'history';
import {applyMiddleware, createStore, Middleware, StoreEnhancer} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import Configs from 'config';
import rootReducer from 'modules';
import {EProjectType} from 'enums/configs.enum'
import monitorReducersEnhancer from 'stores/enhancers/monitorReducer';

export const customHistory = createBrowserHistory();

export default function configureStore(preloadState: Object) {
  const middlewares: Middleware[] = [ReduxThunk.withExtraArgument({history: customHistory})];

  if (Configs.DEBUG === true) {
    middlewares.push(logger);
  }

  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer, monitorReducersEnhancer] as StoreEnhancer[];
  const composedEnhancers = composeWithDevTools(...enhancers);
  const store = createStore(rootReducer, preloadState, composedEnhancers);

  // @ts-ignore
  if (process.env.NODE_ENV !== EProjectType.PRODUCTION && module.hot) {
    // @ts-ignore
    module.hot.accept('modules', () => store.replaceReducer(rootReducer));
  }
  return store;
}
