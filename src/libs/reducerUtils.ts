import {AnyAction} from 'redux';
import {AsyncActionCreatorBuilder, getType} from 'typesafe-actions';

export type AsyncState<T, E = any> = {
  data: T | undefined;
  loading: boolean;
  error: E | undefined;
};

export const asyncState = {
  initial: <T, E = any>(initialData?: T): AsyncState<T, E> => ({
    loading: false,
    data: initialData || undefined,
    error: undefined,
  }),
  load: <T, E = any>(data?: T): AsyncState<T, E> => ({
    loading: true,
    data: data || undefined,
    error: undefined,
  }),
  success: <T, E = any>(data: T): AsyncState<T, E> => ({
    loading: false,
    data,
    error: undefined,
  }),
  error: <T, E>(error: E): AsyncState<T, E> => ({
    loading: false,
    data: undefined,
    error: error,
  }),
};

type AnyAsyncActionCreator = AsyncActionCreatorBuilder<any, any, any>;
export function createAsyncReducer<S, AC extends AnyAsyncActionCreator, K extends keyof S>(
  asyncActionCreator: AC,
  key: K,
) {
  return (state: S, action: AnyAction) => {
    const [request, success, failure] = [
      asyncActionCreator.request,
      asyncActionCreator.success,
      asyncActionCreator.failure,
    ].map(getType);

    switch (action.type) {
      case request:
        return {
          ...state,
          [key]: asyncState.load(action.payload),
        };
      case success:
        return {
          ...state,
          [key]: asyncState.success(action.payload),
        };
      case failure:
        return {
          ...state,
          [key]: asyncState.error(action.payload),
        };
      default:
        return state;
    }
  };
}

export function transformToArray<AC extends AnyAsyncActionCreator>(asyncActionCreator: AC) {
  const {request, success, failure} = asyncActionCreator;

  return [request, success, failure];
}
