import {TablePaginationConfig} from 'antd/lib/table/interface';
import {isEqual} from 'lodash';
import queryString from 'query-string';
import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {TPagination} from 'modules/types';

export function usePagination<T>(): [TablePaginationConfig & TPagination, any, any] {
  const location = useLocation();
  const query = {
    current: 1,
    pageSize: 20,
    q: '',
    ...queryString.parse(location.search),
  };
  const [pagination, setPagination] = useState<TPagination>({
    ...query,
  });

  useEffect(() => {
    if (isEqual(query, pagination) === false) {
      setPagination({
        ...query,
        ...queryString.parse(location.search),
      });
    }
  }, [location]);

  const reloadPage = (page?: Partial<TPagination>) => {
    setPagination({
      ...pagination,
      ...page,
    });
  };

  return [pagination, setPagination, reloadPage];
}
