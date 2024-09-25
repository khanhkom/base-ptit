import React from 'react';

import FallBack from './FallBack';
type Props = {
  children: React.ReactNode;
  name: string;
};

type State = {
  hasError: boolean;
  error: string;
  errorInfo: string;
};

class ErrorBoundary extends React.Component<Props, State> {
  name: string;

  constructor(props: Props) {
    super(props);
    this.name = props.name;

    this.state = { hasError: false, error: '', errorInfo: '' };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      hasError: true,
      error: error.toString() || '',
      errorInfo: errorInfo?.componentStack || '',
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <FallBack
          resetError={() => {
            this.setState({ hasError: false });
          }}
          error={this.state.error}
          errorInfo={this.state.errorInfo}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
