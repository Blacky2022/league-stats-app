import React from 'react'
import './Main.css'
import { Route, Routes } from 'react-router'
import { LoginPageView } from '../User/LoginPage'
import { ChampionsPerformance } from '../ChampionsPerformance/ChampionsPerformance'
import { UpdatePerformance } from '../UpdatePerformance/UpdatePerformance'
import { WorldsPerformance } from '../WorldsPerformance/WorldsPerformance'
import { RegisterPageView } from '../User/RegisterPage'
import { Navigate } from 'react-router-dom'
import { ChampionStats } from '../ChampionsPerformance/ChampionStats'

export function Main() {
	return (
		<>
			<Routes>
				<Route exact path='/' element={<Navigate to='/user' />} />
				<Route exact path='/user' Component={LoginPageView} />
				<Route exact path='/register' Component={RegisterPageView} />
				<Route exact path='/performance/:name' Component={ChampionStats} />
				<Route exact path='/performance' Component={ChampionsPerformance} />
				<Route exact path='/UpdatePerformance' Component={UpdatePerformance} />
				<Route exact path='/WorldsPerformance' Component={WorldsPerformance} />
			</Routes>
		</>
	)
}
