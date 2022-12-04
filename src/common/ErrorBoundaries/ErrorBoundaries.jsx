import React, { Component } from 'react';
export default class ErrorBoundaries extends Component {
  state = {
    error: false,
  };

  componentDidCatch() {
    this.setState({ error: true });
  }

  render() {
    if (this.state.false) return <h1>Error</h1>;
    return this.props.children;
  }
}
