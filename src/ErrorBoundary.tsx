import React, { ReactNode } from 'react';

type PropsInterface = {
  children: ReactNode;
};
type StateInterface = {
  hasError: boolean;
  error?: Error | null;
  info?: object;
};

export class ErrorBoundary extends React.Component<PropsInterface, StateInterface> {
  constructor(props: PropsInterface) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    // You can also log the error to an error reporting  eg BugSnag
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
