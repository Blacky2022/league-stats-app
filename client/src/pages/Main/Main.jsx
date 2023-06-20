import React from 'react'
import './Main.css'
import { Route, Routes } from 'react-router'
import { LoginPageView } from '../User/LoginPage'
import { ChampionsPerformance } from '../ChampionsPerformance/ChampionsPerformance'
import { WorldsPerformance } from '../WorldsPerformance/WorldsPerformance'
import { RegisterPageView } from '../User/RegisterPage'
import { Navigate } from 'react-router-dom'
import { ChampionStats } from '../ChampionsPerformance/ChampionStats'
import { DataImportView} from '../DataView/DataView'
import { UpdatePatchNotes } from '../UpdatePatchNotes/UpdatePatchNotes'
export function Main() {
	return (
		<>
			<Routes>
				<Route exact path='/' element={<Navigate to='/user' />} />
				<Route exact path='/user' Component={LoginPageView} />
				<Route exact path='/data' Component={DataImportView} />
				<Route exact path='/register' Component={RegisterPageView} />
				<Route exact path='/performance/:name' Component={ChampionStats} />
				<Route exact path='/performance' Component={ChampionsPerformance} />
				<Route exact path='/UpdatePatchNotes' Component={UpdatePatchNotes} />
				<Route exact path='/WorldsPerformance' Component={WorldsPerformance} />
			</Routes>
		</>
	)
}
