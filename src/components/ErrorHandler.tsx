import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorScreen } from '../views/ErrorScreen';

interface ErrorHandlerState {
  hasError: boolean;
}

class ErrorHandler extends Component {
  state: ErrorHandlerState = {
    hasError: false
  };

  static getDerivedStateFromError(error: any): ErrorHandlerState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error capturado:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorScreen />;
    }

    return (this.props as { children: ReactNode }).children;
  }
}

export default ErrorHandler;
