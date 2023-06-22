import React, { useState, useEffect, useCallback } from 'react'
import './PatchSelect.css'
import WinRateChart from './WinRateChart'
import PickBanRateChart from './PickBanRateChart'
import SelectedChampionTable from './SelectedChampTable'
import ComparedChampionTable from './CompareTable'
import { config } from '../../config'
import ComparePatchTable from './ComparePatchTable'
import { Select, MenuItem } from '@mui/material'
import Button from '@mui/material/Button'
import CompareWorldsTable from './CompareWorldsTable'
const baseUrl = config.BASE_URL
export function PatchSelect() {
	const [selectedStartPatch, setSelectedStartPatch] = useState(1)
	const [selectedEndPatch, setSelectedEndPatch] = useState(23)
	const [championData, setChampionData] = useState({})
	const [compareChampion, setCompareChampion] = useState('')
	const [filteredChampions, setFilteredChampions] = useState([])
	const [patchData, setPatchData] = useState({})
	const [worldsData, setWorldsData] = useState({})
	const [isButtonClicked, setIsButtonClicked] = useState(false)
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

	const handleCompareButtonClick = () => {
		setIsButtonClicked(true)
		fetchChampionData()
		fetchPatchData()
		fetchWorldsData()
	}
	const fetchWorldsData = useCallback(async () => {
		try {
			const response = await fetch(`${baseUrl}/worlds/compare/${championName}/with/${compareChampion}`)

			if (response.ok) {
				const data = await response.json()
				const { firstChampion, compareChampion } = data
				setWorldsData({ firstChampion, compareChampion })
			} else {
				console.error('Error fetching worlds notes:', response.statusText)
			}
		} catch (error) {
			console.error('Error fetching worlds notes:', error)
		}
	}, [championName, compareChampion])

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
	}, [])

	const SelectedChampionChart = () => {
		return (
			<div className='chart-wrapper'>
				{' '}
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
					<Select
						value={compareChampion}
						onChange={handleCompareChampionChange}
						label='Compare Champion'
						variant='outlined'
						autoWidth
						inputProps={{ style: { color: 'white' } }}
						sx={{
							color: 'white',
							'& .MuiOutlinedInput-notchedOutline': {
								borderColor: '#1eff00', // Change outline color to white
							},
						}}>
						{filteredChampions.map(champion => (
							<MenuItem key={champion.name} value={champion.name}>
								{champion.name}
							</MenuItem>
						))}
					</Select>
					<Button variant='contained' onClick={handleCompareButtonClick}>
						CONFIRM
					</Button>
				</div>
			</div>
			{isButtonClicked && (
				<>
					<div className='table-container'>
						<ComparePatchTable patchData={patchData} championName={championName} comparedChampion={compareChampion} />
					</div>
		
					<SelectedChampionChart />
          
          <div className='table-container'>
						<CompareWorldsTable
							worldsData={worldsData}
							championName={championName}
							comparedChampion={compareChampion}
						/>
					</div>
					<div className='table-container'>
						<SelectedChampionTable championData={championData} />
					</div>
					<div className='table-container'>
						<ComparedChampionTable championData={championData} />
					</div>
					<div className='table-container'>
						<div className='image-container'>
							{Object.keys(championData).map((patch, index) => (
								<React.Fragment key={patch}>
									<img className='patch-image' src={`/aktualizacje/patch_${patch.split(' ')[1]}.jpg`} alt={patch} />
									{(index + 1) % 3 === 0 && <br />} {/* Add a line break after every third image */}
								</React.Fragment>
							))}
						</div>
					</div>
				</>
			)}
		</div>
	)
}
