import axios from 'axios';
import {Dispatch, SetStateAction, useEffect, useReducer, useState} from 'react';

const dataFetchReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {...state, loading: true, error: false};
    case 'FETCH_SUCCESS':
      const {data} = action.payload;
      return {...state, loading: false, error: false, data: data};
    case 'FETCH_FAILURE':
      return {...state, loading: false, error: true};
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export type StateType<T> = {
  loading: boolean;
  error: boolean;
  data: T;
};

export const useDataApi = <T>(
  promise: any,
  initialData?: Partial<T>,
  deps: any[] = [],
  shouldExecute: boolean = true,
): [StateType<T>, any, Dispatch<SetStateAction<boolean>>] => {
  const [executing, setExecuting] = useState<boolean>(shouldExecute);
  const [callback, setCallback] = useState(() => promise);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    loading: false,
    error: false,
    data: initialData,
  });

  useEffect(() => {
    let didCancel = false;
    const cancel = axios.CancelToken.source();
    const fetchData = async () => {
      dispatch({type: 'FETCH_INIT'});

      try {
        const result = await callback(cancel);

        if (didCancel === false) {
          dispatch({type: 'FETCH_SUCCESS', payload: result});
        }
      } catch (error) {
        if (didCancel === false) {
          dispatch({type: 'FETCH_FAILURE'});
        }
      }
    };

    if (executing) {
      fetchData();
    }
    return () => {
      didCancel = true;
      cancel.cancel('canceled');
    };
  }, [callback].concat(deps));

  return [state, setCallback, setExecuting];
};
