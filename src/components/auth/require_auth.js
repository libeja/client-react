import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  class Authentication extends Component {
    // static contextTypes = {
    //   router: React.PropTypes.object
    // }

    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.history.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.history.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  return connect(mapStateToProps)(Authentication);
}
