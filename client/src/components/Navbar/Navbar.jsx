/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import { LogoutButton } from '../buttons/LogoutButton'
export const Navbar = () => {
	const colorOfLink = ({ isActive }) => ({ color: isActive ? 'orange' : 'black' })

	return (
		<header>
			<div className='logo'>IntegracjaSys</div>
			<div className='nav-links'>
				<NavLink style={colorOfLink} to='/performance'>
					ChampionPerformance
				</NavLink>

				<NavLink style={colorOfLink} to='/UpdatePerformance'>
					UpdatePatchNotes
				</NavLink>

				<NavLink style={colorOfLink} to='/WorldsPerformance'>
					WorldsPerformance
				</NavLink>
				<LogoutButton />
			</div>
			<hr />
		</header>
	)
}
