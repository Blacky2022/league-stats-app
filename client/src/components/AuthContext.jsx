import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { config } from '../config'

const AuthContext = createContext(false)
const baseUrl = config.BASE_URL

const AuthProvider = ({ children }) => {
	const [loggedIn, setLoggedIn] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		async function checkAuth() {
			try {
				const res = await fetch(`${baseUrl}/user/auth`, {
					method: 'POST',
					credentials: 'include',
					mode: 'cors',
					headers: {
						'Content-Type': 'application/json',
					},
				})
				if (res.ok) {
					setLoggedIn(true)
				} else {
					setLoggedIn(false)
					navigate('/')
				}
			} catch (error) {
				setLoggedIn(false)
				navigate('/')
			}
		}

		checkAuth()
	}, [navigate])

	return (
		<>
			{loggedIn === false ? (
				<h1>Loading...</h1>
			) : (
				<AuthContext.Provider value={loggedIn}>{children}</AuthContext.Provider>
			)}
		</>
	)
}

export { AuthContext, AuthProvider }
