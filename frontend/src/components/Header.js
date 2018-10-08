import React, { Component } from 'react'
import Menu from './Menu';

class Header extends Component {
	state = {
		disconnected: false
	}

	logingOut(event) {
		event.preventDefault();
		this.props.logout();
	}

	render () {
	    return (
	      <header>
	        <Menu/>
	        <a href="/logout" onClick={this.logingOut.bind(this)}>Logout</a>
	      </header>
	    )
	}
}

export default Header