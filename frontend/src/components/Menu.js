import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Menu extends Component {

  render () {

    return (
      <ul>
        <li><Link to="/reports">Reports</Link></li>
        <li><Link to="/adminAcces">Admin Access</Link></li>
      </ul>
    )
  }
}
///

export default Menu