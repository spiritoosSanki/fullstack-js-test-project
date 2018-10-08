import React, { Component } from 'react'

class Load extends Component {

  render () {

    const isError = this.props.isError;

    return (
      <div>
        <span>{isError ? 'Something went wrong' : 'Loading...'}</span>
      </div>
    )
  }
}

export default Load