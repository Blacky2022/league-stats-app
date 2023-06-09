import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './loginform.css'
import { useNavigate } from 'react-router-dom'
export const RegisterPage = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const navigate = useNavigate()
	// Add event handlers to update the state variables when the input values change

	const handleUsernameChange = event => {
		setUsername(event.target.value)
	}

	const handlePasswordChange = event => {
		setPassword(event.target.value)
	}

	const handleConfirmPasswordChange = event => {
		setConfirmPassword(event.target.value)
	}

	// Add a function to handle the registration form submission

	const handleRegister = () => {
		if (password !== confirmPassword) {
			alert('Passwords do not match')
			return
		}

		fetch('http://localhost:3001/user/signup', {
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
			.then(data => {
				// Handle successful registration
				console.log(data) // You can customize this based on your server response
				navigate('/user')
			})
			.catch(error => {
				// Handle registration error
				console.error(error)
			})
	}

	return (
		<div className='cover'>
			<h1>Register</h1>
			<input type='text' placeholder='username' value={username} onChange={handleUsernameChange} />
			<input type='password' placeholder='password' value={password} onChange={handlePasswordChange} />
			<input
				type='password'
				placeholder='confirm password'
				value={confirmPassword}
				onChange={handleConfirmPasswordChange}
			/>
			<div>
				<button onClick={handleRegister}>Register</button>
			</div>
			<div>
				<button>
					<Link to='/user' className='button-link'>
						Back to Login
					</Link>
				</button>
			</div>
		</div>
	)
}
