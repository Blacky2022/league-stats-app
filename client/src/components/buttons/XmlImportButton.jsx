import React, { useState } from 'react'

const token = localStorage.getItem('token')
export function XmlImportButton() {
	const [importStatus, setImportStatus] = useState('')
	const [buttonVisibleon, setButtonVisibleon] = useState(true)

	const handleImportData = () => {
		fetch('http://localhost:3001/worlds/importXML', {
			method: 'POST',
			headers: {
				authorization: `Bearer ${token}`,
			},
		})
			.then(response => {
				if (response.ok) {
					setImportStatus('Dane zostały zaimportowane do bazy danych.')
					setButtonVisibleon(false)
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
			{buttonVisibleon && <button onClick={handleImportData}>IMPORT XML</button>}
			<p>{importStatus}</p>
		</div>
	)
}
