import React, { useState, useEffect } from 'react'
import './ChampionChanges.css'
const ChampionChanges = ({ selectedPatch }) => {
	const [championChanges, setChampionChanges] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)
	const championName = window.location.pathname.split('/').pop()

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			setError(null)

			try {
				const response = await fetch(`http://localhost:3001/performance/${championName}/patch/${selectedPatch}`)

				if (!response.ok) {
					throw new Error('Champion not found')
				}

				const data = await response.json()
				setChampionChanges(data)
			} catch (error) {
				setError(error.message)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [championName, selectedPatch])

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error: {error}</div>
	}

	if (!championChanges) {
		return <p className='information'>Postać nie była zmieniana w tym patchu</p>
	}

	const { opis, czy_buff } = championChanges

	return (
		<div className='championChanges'>
			<div className={czy_buff ? 'Buff' : 'Nerf'}>
				<h2>Przeprowadzone zmiany</h2>
				<p>{opis}</p>
				<p>{czy_buff ? 'Buff' : 'Nerf'}</p>
			</div>
		</div>
	)
}

export default ChampionChanges
