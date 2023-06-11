import React, { useEffect, useState } from 'react'
import { XmlImportButton } from '../../components/buttons/XmlImportButton'
import './Worldsperfomance.css'
import { CsvImportButton } from '../../components/buttons/CsvImportButton'
import { ClearDataButton } from '../../components/buttons/ClearDataButton'

export function WorldsPerformance() {
	const [champions, setChampions] = useState([])
	const [sortColumn, setSortColumn] = useState('')
	const [sortDirection, setSortDirection] = useState('asc')
	const token = localStorage.getItem('token')

	useEffect(() => {
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

	const handleSort = column => {
		if (sortColumn === column) {
			// If the same column is clicked again, reverse the sort direction
			setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
		} else {
			// Sort by the selected column in ascending order
			setSortColumn(column)
			setSortDirection('asc')
		}
	}

	const sortedChampions = [...champions].sort((a, b) => {
		if (sortColumn === 'champion') {
			return sortDirection === 'asc' ? a.champion.localeCompare(b.champion) : b.champion.localeCompare(a.champion)
		} else {
			const aValue = a[sortColumn]
			const bValue = b[sortColumn]
			return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
		}
	})

	return (
		<div>
			<h1>Postacie Worlds - Ilość rozegranych gier: {totalGames}</h1>
			<XmlImportButton />
			<CsvImportButton />
			<ClearDataButton />
			<div className='table_container'>
				{champions.length === 0 ? (
					<p>No data available.</p>
				) : (
					<table className='champions-table'>
						<thead>
							<tr>
								<th onClick={() => handleSort('champion')}>
									Champion
									{sortColumn === 'champion' && <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>}
								</th>
								<th onClick={() => handleSort('sum_total')}>
									Sum Total
									{sortColumn === 'sum_total' && <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>}
								</th>
								<th onClick={() => handleSort('win_total')}>
									Win Total
									{sortColumn === 'win_total' && <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>}
								</th>
								<th onClick={() => handleSort('sum_bans')}>
									Sum Bans
									{sortColumn === 'sum_bans' && <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>}
								</th>
								<th onClick={() => handleSort('sum_pick_ban')}>
									Sum Pick Ban
									{sortColumn === 'sum_pick_ban' && <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>}
								</th>
								<th>Win Rate</th>
								<th>Pick Rate</th>
								<th>Ban Rate</th>
								<th>Pick Ban Rate</th>
							</tr>
						</thead>
						<tbody>
							{sortedChampions.map(champion => (
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
				)}
			</div>
		</div>
	)
}
