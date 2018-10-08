import React, { Component } from 'react'
import Header from './Header'

class Reports extends Component {

  render () {

    return (
      <div>
      	<Header logout={this.props.logout} />
        Reports !!!
      </div>
    )
  }
}

export default Reports