import React, { useState, useEffect} from 'react'
import { Navbar } from '../../components/Navbar/Navbar'
import { UpdatePatchTable } from './UpdatePatchTable'




export const UpdatePatchNotes = () => {
	const [selectedCharacter, setSelectedCharacter] = useState('')
	const [selectedPatch, setSelectedPatch] = useState('')
	const [filteredChampions, setFilteredChampions] = useState([])

	const handleCharacterSelect = character => {
		setSelectedCharacter(character)
	}

	const handlePatchSelect = patch => {
		setSelectedPatch(patch)
	}

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
	})
	return (
		<div>
			<Navbar />
			<h1>Update Performance</h1>
			<div>
				<label>Character:</label>

				<select value={selectedCharacter} onChange={e => handleCharacterSelect(e.target.value)}>
					<option value=''>Select Character</option>
					{filteredChampions.map(champion => (
						<option key={champion.name} value={champion.name}>
							{champion.name}
						</option>
					))}
				</select>
			</div>
			<div>
				<label>Patch:</label>

				<select value={selectedPatch} onChange={e => handlePatchSelect(e.target.value)}>
					<option value=''>Select Patch</option>
					{Array.from({ length: 23 }, (_, index) => (
						<option key={index + 1} value={index + 1}>
							{index + 1}
						</option>
					))}
				</select>
			</div>
			{selectedCharacter && selectedPatch && (
				<>
					<h3>
						Changes for {selectedCharacter} in Patch {selectedPatch}
					</h3>
					<UpdatePatchTable character={selectedCharacter} patch={selectedPatch}  />
				</>
			)}
		</div>
	)
}
