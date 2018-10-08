import React, { Component } from 'react'


class Errors extends Component {

	render () {
		const { errors } = this.props

	    return (
	      	<div className="errors">
	      		{errors && errors.length?
	      			errors.map(err => <p>{err}</p>)
	      			:''
	      		}
	      	</div>
	    )
	}
}

///


export default Errors