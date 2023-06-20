import React, { useState } from 'react'
import './button.css' 
import { config } from '../../config'
const token = localStorage.getItem('token')
export function JsonImportButton() {
	const [importStatus, setImportStatus] = useState('')
	const [buttonVisible, setButtonVisible] = useState(true)
	const baseUrl = config.BASE_URL
	
	const handleImportData = () => {
		fetch(`${baseUrl}/importJSON`, {
			method: 'POST',
			headers: {
				authorization: `Bearer ${token}`,
			},
		})
			.then(response => {
				if (response.ok) {
					setImportStatus('Dane zostały zaimportowane do bazy danych.')
					setButtonVisible(false)
				} else {
					setImportStatus('Błąd podczas importowania danych do bazy danych.')
				}
			})
			.catch(error => {
				setImportStatus('Wystąpił błąd podczas komunikacji z serwerem.')
				console.error(error)
			})
	}

	return (
		<div>
			{buttonVisible && <button className='function-button' onClick={handleImportData}>IMPORT JSON</button>}
			<p className='information'>{importStatus}</p>
		</div>
	)
}
