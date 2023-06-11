import React, { useState, useEffect } from 'react'

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
		return null // Or you can return a different component or message if no data is available
	}

	const { bohater, opis, czy_buff } = championChanges

	return (
		<div>
			<h2>Champion Changes</h2>
			<p>Champion: {bohater}</p>
			<p>Description: {opis}</p>
			<p>Is Buff: {czy_buff ? 'Yes' : 'No'}</p>
		</div>
	)
}

export default ChampionChanges
