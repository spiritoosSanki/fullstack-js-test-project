import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { checkSession, logingOut } from '../actions/loading';
import { Route, Redirect, Switch } from 'react-router';
import Login from './Login'
import Load from './Load'
import Reports from './Reports'
import AdminAcces from './AdminAcces'


class Loading extends Component {

  from = null

  constructor(props) {
    super(props);
    this.from = this.props.location.pathname;
  }

  componentDidMount() {
    this.props.checkSession();
  }

  render () {

    const {isInvalid, isError, showLoading, logingOut} = this.props;

    let redirect = null;
    if(showLoading) {
      redirect = <Redirect push to="/load" />
    } else if(isInvalid) {
      redirect = <Redirect push to="/login" />
    } else if(this.from) {
      redirect = <Redirect push to={this.from} />
      this.from = null;
    }
    
    return (
      <div>
        <h1>MFDE Admin</h1>
        {redirect}
        <Switch>
          <Route path="/load" render={(props) => <Load isError={isError} {...props} /> } />
          <Route path="/login" component={Login} />
          <Route path="/reports" render={(props) => <Reports logout={logingOut} {...props} /> } />
          <Route path="/adminAcces" render={(props) => <AdminAcces logout={logingOut} {...props} /> } />
          <Route render={(props) => <Redirect push to="/reports" />} />
        </Switch>
      </div>
    )
  }
}

///

const mapStateToProps = (state) => {
  return {
    showLoading: state.loading.showLoading,
    isInvalid: state.loading.invalid, //no session or invalid session
    isError: state.loading.error // server error
  }
}

const mapDispatchToProps = {
  checkSession, logingOut
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Loading))