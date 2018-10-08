import React, { Component } from 'react'
import { Redirect } from 'react-router';
 
class Expired extends Component {

  state = {
    redirect: false
  }

  componentDidMount() {
    var _this = this;
    setTimeout(function() {
      _this.setState({redirect: true})
    }, 15*1000);
  }

  render () {
    if(this.state.redirect) {
      return (<Redirect push to="/login" />)
    }

    return (
      <div>Session expired</div>
    )
  }
}

export default Expired