import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Route, Redirect } from 'react-router';
import { submitLogin } from '../actions/security';
import Expired from './Expired';
 
class Login extends Component {

  state = {
    login: "",
    password: ""
  }

  signIn(event) {
    event.preventDefault();

    const {login, password} = this.state;
    this.props.submitLogin({
      login:login,
      password:password
    });
  }

  render () {
    const { isLoading, isValidLogin, error } = this.props;
    if(isValidLogin) {
      return (<Redirect push to="/" />)
    }

    return (
      <div>
        <h2>Login</h2>
        <Route path="/login/expired" component={Expired} />
        <form onSubmit={this.signIn.bind(this)}>
          <div><input id="login" type="text" placeholder="Login" onChange={(e) => this.setState({ login: e.target.value })} /></div>
          <div><input id="password" type="password" placeholder="Password" onChange={(e) => this.setState({ password: e.target.value })} /></div>
          <div>{error}</div>
          <div><input id="signin" type="submit" value="Sign in" disabled={isLoading} /></div>
        </form>
      </div>
    )
  }
}

//

const mapStateToProps = (state) => {
  return {
    isLoading: state.security.loading,
    isValidLogin: state.security.validLogin,
    error: state.security.error
  }
}

const mapDispatchToProps = {
  submitLogin
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))