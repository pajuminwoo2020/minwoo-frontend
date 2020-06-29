import {Button, Result} from 'antd';
import React from 'react';
import {Helmet} from 'react-helmet-async';
import {useHistory} from 'react-router-dom';

function NoMatch() {
  const history = useHistory();

  return (
    <>
      <Helmet>
        <title>404 - Bigstep</title>
        <meta name="robots" content="noindex"/>
      </Helmet>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" key="console" onClick={() => history.push('/')}>
            Go to (https://bigstep.com)
          </Button>
        }
      />
    </>
  );
}

export default NoMatch;
