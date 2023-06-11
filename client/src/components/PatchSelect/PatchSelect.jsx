import React, { useState, useEffect, useCallback } from 'react'
import './PatchSelect.css'
import ChampionChanges from '../ChampionChanges/ChampionChanges'
export function PatchSelect() {
	const [selectedPatch, setSelectedPatch] = useState('')
	const [championData, setChampionData] = useState(null)
	const championName = window.location.pathname.split('/').pop()

	const handlePatchChange = event => {
		setSelectedPatch(event.target.value)
	}

	const fetchChampionData = useCallback(() => {
		fetch(`http://localhost:3001/performance/${championName}/stats/${selectedPatch}`)
			.then(response => response.json())
			.then(data => setChampionData(data))
			.then(data => console.log(data))
			.catch(error => console.error(error))
	}, [championName, selectedPatch])

	useEffect(() => {
		if (selectedPatch) {
			fetchChampionData()
		}
	}, [selectedPatch, fetchChampionData])

	return (
		<div>
			<h1>Champion Performance</h1>

			{/* Patch selection dropdown */}
			<label htmlFor='patchSelect'>Select patch:</label>
			<select id='patchSelect' value={selectedPatch} onChange={handlePatchChange}>
				<option value=''>All patches</option>
				{[...Array(23).keys()].map(patch => (
					<option key={patch + 1} value={patch + 1}>
						Patch {patch + 1}
					</option>
				))}
			</select>

			{/* Display champion data */}
			{championData && (
				<div>
					<table className='champions-table'>
						<thead>
							<tr>
								<th>Role</th>
								<th>Tier</th>
								<th>Score</th>
								<th>Trend</th>
								<th>Win</th>
								<th>Pick</th>
								<th>Ban</th>
								<th>KDA</th>
							</tr>
						</thead>
						<tbody>
							{Object.entries(championData).map(([role, stats]) => (
								<tr key={role}>
									<td>{role}</td>
									<td>{stats.Tier}</td>
									<td>{stats.Score}</td>
									<td>{stats.Trend}</td>
									<td>{stats.Win}</td>
									<td>{stats.Pick}</td>
									<td>{stats.Ban}</td>
									<td>{stats.KDA}</td>
								</tr>
							))}
						</tbody>
					</table>
					{selectedPatch && <ChampionChanges selectedPatch={selectedPatch} />}
					<img
						className='patch-image'
						src={`/aktualizacje/patch_${selectedPatch}.jpg`}
						alt={`Patch ${selectedPatch}`}
					/>
				</div>
			)}
		</div>
	)
}
