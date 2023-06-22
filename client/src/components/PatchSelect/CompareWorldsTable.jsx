import React from 'react'

const CompareWorldsTable = ({ worldsData, comparedChampion, championName }) => {
	const { firstChampion, compareChampion } = worldsData
	const total = 127
	const calculateWinRate = (wins, total) => (total !== 0 ? ((wins / total) * 100).toFixed(2) : 0)
	const calculatePickRate = (pickBan, bans, total) => (total !== 0 ? (((pickBan - bans) / total) * 100).toFixed(2) : 0)
	const calculateBanRate = (bans, total) => (total !== 0 ? ((bans / total) * 100).toFixed(2) : 0)

	return (
		<div className='compare-container'>
			<h2>Worlds performance data</h2>
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
					</tr>
				</thead>
				<tbody>
					{firstChampion ? (
						<tr>
							<td>{championName}</td>
							<td>{firstChampion.sum_total}</td>
							<td>{firstChampion.win_total}</td>
							<td>{firstChampion.sum_bans}</td>
							<td>{firstChampion.sum_pick_ban}</td>
							<td>{calculateWinRate(firstChampion.win_total, firstChampion.sum_total)}</td>
							<td>{calculatePickRate(firstChampion.sum_pick_ban, firstChampion.sum_bans, total)}</td>
							<td>{calculateBanRate(firstChampion.sum_bans, total)}</td>
						</tr>
					) : (
						<tr>
							<td>{championName}</td>
							<td colSpan='7'>This champion was not played in the Worlds Championship.</td>
						</tr>
					)}
					{compareChampion ? (
						<tr>
							<td>{comparedChampion}</td>
							<td>{compareChampion.sum_total}</td>
							<td>{compareChampion.win_total}</td>
							<td>{compareChampion.sum_bans}</td>
							<td>{compareChampion.sum_pick_ban}</td>
							<td>{calculateWinRate(compareChampion.win_total, total)}</td>
							<td>{calculatePickRate(compareChampion.sum_pick_ban, compareChampion.sum_bans, total)}</td>
							<td>{calculateBanRate(compareChampion.sum_bans, total)}</td>
						</tr>
					) : (
						<tr>
							<td>{comparedChampion}</td>
							<td colSpan='7'>This champion was not played in the Worlds Championship.</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}
export default CompareWorldsTable;