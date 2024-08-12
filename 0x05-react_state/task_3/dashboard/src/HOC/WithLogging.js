import React, { Component } from 'react';

const WithLogging = (WrappedComponent) => {
  const name =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

  WithLogging.displayName = `WithLogging(${name})`;

  return class extends Component {
    componentDidMount() {
      console.log(`Component ${name} is mounted`);
    }

    componentWillUnmount() {
      console.log(`Component ${name} is going to unmount`);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default WithLogging;
