import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './loginform.css'
import { AuthContext } from '../../AuthContext'

export const LoginPage = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()
	const { setLoggedIn } = useContext(AuthContext)

	const handleUsernameChange = event => {
		setUsername(event.target.value)
	}

	const handlePasswordChange = event => {
		setPassword(event.target.value)
	}

	const handleLogin = () => {
		let data

		fetch('http://localhost:3001/user/signin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: username,
				password: password,
			}),
		})
			.then(response => response.json())
			.then(responseData => {
				data = responseData
				console.log(data)
				// Handle successful login
				localStorage.setItem('token', data.token)
				setLoggedIn(true)
				navigate('/')
			})
			.catch(error => {
				console.error(error)
				setLoggedIn(false)
				// Handle login error
			})
	}

	return (
		<div className='cover'>
			<h1>Login</h1>
			<input type='text' placeholder='username' value={username} onChange={handleUsernameChange} />
			<input type='password' placeholder='password' value={password} onChange={handlePasswordChange} />
			<div>
				<button onClick={handleLogin}>Login</button>
			</div>
			<div>
				<button>
					<Link to='/user/register' className='button-link'>
						Register
					</Link>
				</button>
			</div>
		</div>
	)
}
