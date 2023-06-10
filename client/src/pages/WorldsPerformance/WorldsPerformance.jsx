import React, { useEffect, useState } from 'react'
import { XmlImportButton } from '../../components/buttons/XmlImportButton'
import './Worldsperfomance.css'

export function WorldsPerformance() {
	const [champions, setChampions] = useState([])
	const token = localStorage.getItem('token') // Zdefiniuj token

	useEffect(() => {
		// Wywołaj ścieżkę w celu pobrania postaci z serwera
		fetch('http://localhost:3001/worlds/champions', {
			method: 'GET',
			headers: {
				authorization: `Bearer ${token}`,
			},
		})
			.then(response => response.json())
			.then(data => setChampions(data))
			.catch(error => console.error('Błąd pobierania postaci:', error))
	}, [token])

	const totalGames = 127 // Ilość rozegranych gier na mistrzostwach

	const calculateWinRate = (winTotal, sumTotal) => {
		const winRate = (winTotal / sumTotal) * 100
		return winRate.toFixed(2)
	}

	const calculatePickRate = (sumPickBan, sumBans) => {
		const pickRate = ((sumPickBan - sumBans) / totalGames) * 100
		return pickRate.toFixed(2)
	}

	const calculateBanRate = sumBans => {
		const banRate = (sumBans / totalGames) * 100
		return banRate.toFixed(2)
	}

	const calculatePickBanRate = sumPickBan => {
		const pickBanRate = (sumPickBan / totalGames) * 100
		return pickBanRate.toFixed(2)
	}

	return (
		<div>
			<h1>Rozgrywki Worlds - Ilość rozegranych gier: {totalGames}</h1>
			<XmlImportButton />
			<div className='table_container'>
				<table className='champions-table'>
					<thead>
						<tr>
							<th>Champion</th>
							<th>Sum Total</th>
							<th>Win Total</th>
							<th>Sum Bans</th>
							<th>Sum Pick Ban</th>
							<th>Win Rate</th>
							<th>Pick Rate</th>
							<th>Ban Rate</th>
							<th>Pick Ban Rate</th>
						</tr>
					</thead>
					<tbody>
						{champions.map(champion => (
							<tr key={champion._id}>
								<td>{champion.champion}</td>
								<td>{champion.sum_total}</td>
								<td>{champion.win_total}</td>
								<td>{champion.sum_bans}</td>
								<td>{champion.sum_pick_ban}</td>
								<td>{calculateWinRate(champion.win_total, champion.sum_total)}%</td>
								<td>{calculatePickRate(champion.sum_pick_ban, champion.sum_bans)}%</td>
								<td>{calculateBanRate(champion.sum_bans)}%</td>
								<td>{calculatePickBanRate(champion.sum_pick_ban)}%</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
