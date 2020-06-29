import * as Sentry from '@sentry/browser';
import React from 'react';
import Configs from 'config';
import {EProjectType} from 'enums/configs.enum';
import CrashErrorScreen from 'components/base/error/CrashErrorScreen';
import NoMatch from 'components/base/error/NoMatch';

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    chunkError: false,
  };

  static getDerivedStateFromError(error: Error) {
    if (error.name === 'ChunkLoadError') {
      return {chunkError: true};
    }
    return {hasError: true};
  }

  componentDidCatch(error: Error, errorInfo: any) {
    if (Configs.ENV === EProjectType.PRODUCTION) {
      Sentry.captureException(error);
    }
  }

  handleResolveError = () => {
    this.setState({
      hasError: false,
    });
  };

  render() {
    //TODO chunk 에러 화면 추가해야함 / offline, online 체크가 가능하고 / 업데이트 된 경우 알려주는 로직도 넣어줄 수 있음
    // if (this.state.chunkError) {
    //   return <ChunkErrorScreen />;
    // }
    if (this.state.hasError) {
      return <CrashErrorScreen onResolve={this.handleResolveError}/>;
    }
    return (
      <ErrorBoundaryWrapper hasError={this.state.hasError}>
        {this.props.children}
      </ErrorBoundaryWrapper>
    );
  }
}

type ErrorBoundaryWrapperProps = {
  children: React.ReactNode;
  hasError: boolean;
};

function ErrorBoundaryWrapper(props: ErrorBoundaryWrapperProps) {
  if (props.hasError === true) {
    return <NoMatch/>;
  }

  return <>{props.children}</>;
}

export default ErrorBoundary;
