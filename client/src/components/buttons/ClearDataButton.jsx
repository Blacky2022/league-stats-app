import React, { useState } from 'react'
import './button.css'
import { config } from '../../config'

const token = localStorage.getItem('token')
export function ClearDataButton() {
	const [clearStatus, setClearStatus] = useState('')
	const [buttonVisible, setButtonVisible] = useState(true)
	const baseUrl = config.BASE_URL
	
	const handleClearDataButton = () => {
		fetch(`${baseUrl}/cleardata`, {
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
			{buttonVisible && (
				<button className='function-button' onClick={handleClearDataButton}>
					CLEAR DATABASE
				</button>
			)}
			<p className='information'>{clearStatus}</p>
		</div>
	)
}
