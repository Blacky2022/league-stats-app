import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PatchSelect } from '../../components/PatchSelect/PatchSelect'


export function ChampionStats() {
	const { name } = useParams()
	const [championData, setChampionData] = useState(null)

	useEffect(() => {
		async function fetchChampionInfo() {
			try {
				const response = await fetch(
					'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json'
				)
				const data = await response.json()

				// Znajdź bohatera o podanej nazwie
				const champion = data.find(champion => champion.name === name)
				setChampionData(champion)
			} catch (error) {
				console.log('Error fetching champion info:', error)
			}
		}

		fetchChampionInfo()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div>
			{championData && (
				<div>
					<h1>{championData.name}</h1>
					<img
						className='avatar'
						src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${championData.id}.png`}
						alt={championData.name}
					/>
					<PatchSelect />
				</div>
			)}
		</div>
	)
}
