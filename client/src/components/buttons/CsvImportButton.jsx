import React, { useState } from 'react'
import './button.css' 
const token = localStorage.getItem('token')
export function CsvImportButton() {
	const [importStatus, setImportStatus] = useState('')
	const [buttonVisible, setButtonVisible] = useState(true)

	const handleImportData = () => {
		fetch('http://localhost:3001/performance/importCSV', {
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
			{buttonVisible && <button className='function-button' onClick={handleImportData}>IMPORT CSV</button>}
			<p className='information'>{importStatus}</p>
		</div>
	)
}
