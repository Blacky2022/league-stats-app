import React, { useState, useEffect, useCallback } from 'react'
import './PatchSelect.css'
import WinRateChart from './WinRateChart'
import PickBanRateChart from './PickBanRateChart'
import SelectedChampionTable from './SelectedChampTable'
import ComparedChampionTable from './CompareTable'
import { config } from '../../config'

const baseUrl = config.BASE_URL

export function PatchSelect() {
	const [selectedStartPatch, setSelectedStartPatch] = useState(1)
	const [selectedEndPatch, setSelectedEndPatch] = useState(23)
	const [championData, setChampionData] = useState({})
	const [compareChampion, setCompareChampion] = useState('')
	const [filteredChampions, setFilteredChampions] = useState([])
	const [patchData, setPatchData] = useState({})
	const championName = window.location.pathname.split('/').pop()

	const handleCompareChampionChange = event => {
		setCompareChampion(event.target.value)
	}

	const handleStartPatchChange = event => {
		setSelectedStartPatch(parseInt(event.target.value))
	}

	const handleEndPatchChange = event => {
		setSelectedEndPatch(parseInt(event.target.value))
	}
	const fetchPatchData = useCallback(async () => {
		try {
			const start = Math.min(selectedStartPatch, selectedEndPatch)
			const end = Math.max(selectedStartPatch, selectedEndPatch)

			const response = await fetch(
				`${baseUrl}/performance/${championName}/comparedwith/${compareChampion}/patches/${start}/to/${end}`
			)

			if (response.ok) {
				const data = await response.json()
				const { patchNotes, comparedPatchNotes } = data
				setPatchData({ patchNotes, comparedPatchNotes })
				console.table('patchNotes:', patchNotes)
				console.table('comparedPatchNotes:', comparedPatchNotes)
			} else {
				console.error('Error fetching patch notes:', response.statusText)
			}
		} catch (error) {
			console.error('Error fetching patch notes:', error)
		}
	}, [selectedStartPatch, selectedEndPatch, championName, compareChampion])

	const fetchChampionData = useCallback(async () => {
		try {
			const start = Math.min(selectedStartPatch, selectedEndPatch)
			const end = Math.max(selectedStartPatch, selectedEndPatch)
			const fetchedData = await Promise.all(
				Array.from({ length: end - start + 1 }, (_, index) =>
					fetch(`${baseUrl}/performance/${championName}/stats/${start + index}`).then(response => response.json())
				)
			)
			const newData = {}
			fetchedData.forEach((data, index) => {
				const patchNumber = start + index
				const patchName = `Patch ${patchNumber}`
				newData[patchName] = data
			})

			if (compareChampion) {
				const compareData = await Promise.all(
					Array.from({ length: end - start + 1 }, (_, index) =>
						fetch(`${baseUrl}/performance/${compareChampion}/stats/${start + index}`).then(response => response.json())
					)
				)

				compareData.forEach((data, index) => {
					const patchNumber = start + index
					const patchName = `Patch ${patchNumber} - Compare`
					newData[patchName] = data
				})
			}

			setChampionData(newData)
		} catch (error) {
			console.error(error)
		}
	}, [championName, selectedStartPatch, selectedEndPatch, compareChampion])

	useEffect(() => {
		async function fetchChampionSummary() {
			try {
				const response = await fetch(
					'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json'
				)
				const data = await response.json()
				setFilteredChampions(data.slice(1))
			} catch (error) {
				console.log('Error fetching champion summary:', error)
			}
		}
		fetchChampionSummary()
		fetchChampionData()
		fetchPatchData()
	}, [fetchChampionData, compareChampion, fetchChampionData])

	const SelectedChampionChart = () => {
		return (
			<div className='chart-wrapper'>
				{' '}
				{/* Added wrapper div */}
				<div className='chart-container'>
					<div className='chart-row'>
						<h2>Win Rate</h2>
						<div className='Win-chart'>
							<WinRateChart championData={championData} compareChampion={compareChampion} />
						</div>
					</div>
					<div className='chart-row'>
						<h2>Pick and Ban Rates</h2>
						<PickBanRateChart championData={championData} compareChampion={compareChampion} />
					</div>
				</div>
			</div>
		)
	}

	return (
		<div>
			<div className='container-stats'>
				<h1>Champion Performance</h1>

				<label htmlFor='startPatch'>Start Patch:</label>
				<input
					id='startPatch'
					type='range'
					min='1'
					max='23'
					value={selectedStartPatch}
					onChange={handleStartPatchChange}
				/>

				<label htmlFor='endPatch'>End Patch:</label>
				<input id='endPatch' type='range' min='1' max='23' value={selectedEndPatch} onChange={handleEndPatchChange} />

				<div>Selected Start Patch: {selectedStartPatch}</div>

				<div>Selected End Patch: {selectedEndPatch}</div>
				<div>
					Compare with:
					<select value={compareChampion} onChange={handleCompareChampionChange}>
						{filteredChampions.map(champion => (
							<option key={champion.name} value={champion.name}>
								{champion.name}
							</option>
						))}
					</select>
				</div>
			</div>
			<SelectedChampionChart />

			<div className='table-container'>
				{' '}
				<SelectedChampionTable championData={championData} />
			</div>
			<div className='table-container'>
				{' '}
				<ComparedChampionTable championData={championData} />
			</div>
			{Object.keys(championData).map(patch => (
				<img key={patch} className='patch-image' src={`/aktualizacje/patch_${patch.split(' ')[1]}.jpg`} alt={patch} />
			))}
		</div>
	)
}
