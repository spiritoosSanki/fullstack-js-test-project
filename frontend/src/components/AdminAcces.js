import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Header from './Header'
import Errors from './Errors'
import { addUser, updateUser, deleteUser, fetchUsers } from '../actions/users';
import { getConnectedUser } from '../stores/security'


const User = ({ user, id, onDelete, onUpdate }) => {

	const connectedUser = getConnectedUser();

	let delLink = null;
	if(connectedUser.type === 'TYPE_ADMIN' && user.type === 'TYPE_USER') {
		delLink = <React.Fragment> - <a href='/adminAccess/delete' onClick={onDelete}>Delete</a></React.Fragment>;
	}
	///
	let updateLink = null;
	if(connectedUser.type === 'TYPE_ADMIN' || (connectedUser.id === user.id)) {
		updateLink = <React.Fragment> - <a href='/adminAccess/update' onClick={onUpdate}>Update</a></React.Fragment>;
	}
	///

	return (
		<li>
			<span>{user.username}</span> -&nbsp;
			<span>last connection</span> -&nbsp;
			<Link to={'/adminAcces/history/' + id}>History</Link>
			{updateLink}
			{delLink}
		</li>
	)
}
///

class AdminAcces extends Component {

	state = { 
		id: null,
		login: '',
		password: ''
	}

	addOrSaveUser(event) { //and save
	    event.preventDefault();

	    const {id, login, password} = this.state;
	    const user = {
	    	id:id,
			username:login,
	      	password:password
		}
	    if(id) {
	    	this.props.updateUser({user: user});
	    } else {
	    	this.props.addUser({user: user});
	    }
	    
	    this.setState({ 
	    	id: null,
			login: '',
			password: ''
		});
	}


	handleUpdate(event, user) {
		event.preventDefault();

		this.setState({ 
	    	id: user.id,
			login: user.username,
			password: user.password
		});
	}

	handleDelete(event, id) {
		event.preventDefault();
		this.props.deleteUser(id)
	}

	componentDidMount() {
    	this.props.fetchUsers();
	}

	render () {
		let { id, login, password } = this.state
		const { users, isLoading, isSaving, error, logout } = this.props

	    return (
	      <div>
	      	<Header logout={logout} />
	      	<h2>Admin access</h2>
	      	<Errors errors={error} />
	        <form onSubmit={this.addOrSaveUser.bind(this)}>
	        	<input type="text"
					 value={login}
					 placeholder="User name"
					 onChange={(e) => this.setState({ login: e.target.value })}/>
	        	<input type="password"
					 value={password}
					 placeholder="User password"
					 onChange={(e) => this.setState({ password: e.target.value })}/>
				<button disabled={isLoading || isSaving}>{id?'Update':'Create'}</button>
	        </form>
	        <ul>
	        	{
	        		users && users.length 
	        			? users.map((user) => 
		        			<User 
		        				key={user.id}
								id={user.id}
								user={user}
								onDelete={(event) => this.handleDelete(event, user.id)}
								onUpdate={(event) => this.handleUpdate(event, user)}/>)
	        			: <li>No user created</li>

				}
	        </ul>
	      </div>
	    )
	}
}

///

const mapStateToProps = (state) => {
	return {
		users: state.users.users,
		isLoading: state.users.loading,
		isSaving: state.users.saving,
		error: state.users.error
	}
}
 
 const mapDispatchToProps = {
	 addUser,
	 updateUser,
	 deleteUser,
	 fetchUsers
 }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminAcces))