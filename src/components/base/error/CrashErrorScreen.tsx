import {Button, Result} from 'antd';
import React from 'react';
import {useHistory} from 'react-router-dom';

export type CrashErrorScreenProps = {
  onResolve: () => void;
};

function CrashErrorScreen({onResolve}: CrashErrorScreenProps) {
  const history = useHistory();
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Button type="primary" key="console" onClick={() => {
          onResolve();
          history.push('/');
        }}>
          Go to (https://quotabook.com)
        </Button>
      }
    />
  );
}

export default CrashErrorScreen;
