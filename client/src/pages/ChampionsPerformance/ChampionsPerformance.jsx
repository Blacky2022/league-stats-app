import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './ChampionsPerformance.css'
export function ChampionsPerformance() {
	const [championSummary, setChampionSummary] = useState(null)

	useEffect(() => {
		async function fetchChampionSummary() {
			try {
				const response = await fetch(
					'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json'
				)
				const data = await response.json()
				setChampionSummary(data)
			} catch (error) {
				console.log('Error fetching champion summary:', error)
			}
		}

		fetchChampionSummary()
	}, [])

	if (!championSummary) {
		return <div>Loading champion summary...</div>
	}

	return (
		<div className='container'>
			{championSummary.slice(1).map(champion => (
				<Link to={`/performance/${champion.name}`} className='champion' key={champion.id}>
					<img
						className='avatar'
						src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${champion.id}.png`}
						alt={champion.name}
					/>
					<span className='name'>{champion.name}</span>
				</Link>
			))}
		</div>
	)
}
