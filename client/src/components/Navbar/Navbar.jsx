import React, {useContext } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import './Navbar.css'
import { AuthContext } from '../../AuthContext'
import MenuIcon from '@mui/icons-material/Menu';
export const Navbar = () => {
	const { loggedIn, setLoggedIn } = useContext(AuthContext)
	const navigate = useNavigate()
	const handleLogout = () => {
		localStorage.removeItem('token')
		setLoggedIn(false)
		navigate('/user')
	}
	return (
		<body className='bd'>
			<header>
				{loggedIn && (
				<div className='navbar'>
					<div className='logo'><a href='#'>IntegracjaSys</a></div>
					<ul className='links'>
						<li>
							<Link to='/performance'>ChampionPerformance</Link>
						</li>
						<li>
							<Link to='/UpdatePerformance'>UpdatePerformance</Link>
						</li>
						<li>
							<Link to='/WorldsPerformance'>WorldsPerformance</Link>
						</li>
					</ul>
					<a><button className='action_btn' onClick={handleLogout}>Logout</button></a>
					<MenuIcon className='toggle_btn'/>
					<div className='dropdown_menu'>
						<li>
							<Link to='/performance'>ChampionPerformance</Link>
						</li>
						<li>
							<Link to='/UpdatePerformance'>UpdatePerformance</Link>
						</li>
						<li>
							<Link to='/WorldsPerformance'>WorldsPerformance</Link>
						</li>
						<li>
							<a><button className='action_btn' onClick={handleLogout}>Logout</button></a>
						</li>
					</div>
				</div>
				)}
			</header>
		</body>
	)
}
