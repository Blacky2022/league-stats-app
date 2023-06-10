import React from 'react'
import './Main.css'
import { Route, Routes } from 'react-router'
import { LoginPage } from '../User/LoginPage'
import { ChampionsPerformance } from '../ChampionsPerformance/ChampionsPerformance'
import { UpdatePerformance } from '../UpdatePerformance/UpdatePerformance'
import { WorldsPerformance } from '../WorldsPerformance/WorldsPerformance'
import { Navbar } from '../../components/Navbar/Navbar'
import { RegisterPage } from '../User/RegisterPage'
import { AuthProvider } from '../../AuthContext'
import { Navigate } from 'react-router-dom'
import { ChampionStats } from '../ChampionsPerformance/ChampionStats'

export function Main() {
	return (
		<>
			<AuthProvider>
				<Navbar />
				<Routes>
					<Route exact path='/' element={<Navigate to='/user' />} />
					<Route exact path='/user' Component={LoginPage} />
					<Route exact path='/user/register' Component={RegisterPage} />
					<Route exact path='/performance/:name' element={<ChampionStats />} />
					<Route exact path='/performance' Component={ChampionsPerformance} />
					<Route exact path='/UpdatePerformance' Component={UpdatePerformance} />
					<Route exact path='/WorldsPerformance' Component={WorldsPerformance} />
				</Routes>
			</AuthProvider>
		</>
	)
}
