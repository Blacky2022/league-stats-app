import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { redirect } from 'react-router-dom'
import logo from '../../images/logo.png'
import './Navbar.css'
import { AuthContext } from '../../AuthContext'

export const Navbar = () => {
	const { loggedIn, setLoggedIn } = useContext(AuthContext)
	const navigate = useNavigate()
	const handleLogout = () => {
		localStorage.removeItem('token')
		setLoggedIn(false)
		navigate('/user')
	}

	return (
		<header>
			<img className='logo' src={logo} alt='projekt' />
			{loggedIn && (
				<nav>
					<ul className='nav_links'>
						<li>
							<Link to='/ChampionStats'>ChampionStats</Link>
						</li>
						<li>
							<Link to='/UpdatePerformance'>UpdatePerformance</Link>
						</li>
						<li>
							<Link to='/WorldsPerformance'>WorldsPerformance</Link>
						</li>
					</ul>
				</nav>
			)}
			{loggedIn && (
				<button className='cta' onClick={handleLogout}>
					Logout
				</button>
			)}
		</header>
	)
}
