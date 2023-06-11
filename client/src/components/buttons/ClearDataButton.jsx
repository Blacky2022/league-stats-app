import React, { useState } from 'react'

const token = localStorage.getItem('token')
export function ClearDataButton() {
	const [clearStatus, setClearStatus] = useState('')
	const [buttonVisible, setButtonVisible] = useState(true)

	const handleClearDataButton = () => {
		fetch('http://localhost:3001/cleardata', {
			method: 'GET',
			headers: {
				authorization: `Bearer ${token}`,
			},
		})
			.then(response => {
				if (response.ok) {
					setClearStatus('Baza danych została wyczyszczona.')
					setButtonVisible(false)
				} else {
					setClearStatus('Błąd podczas czyszczenia bazy danych.')
				}
			})
			.catch(error => {
				setClearStatus('Wystąpił błąd podczas komunikacji z serwerem.')
				console.error(error)
			})
	}

	return (
		<div>
			{buttonVisible && <button onClick={handleClearDataButton}>CLEAR DATABASE</button>}
			<p>{clearStatus}</p>
		</div>
	)
}
