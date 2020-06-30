import {History} from 'history';
import {ThunkAction} from 'redux-thunk';
import {RootState} from './modules';

declare module '*.mdx';

declare type ThunkResult<R, U> = ThunkAction<R, RootState, {history: History}, U>;
