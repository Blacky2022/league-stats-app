import React, { useState } from 'react'

export  function DataImportButton() {
	const [importStatus, setImportStatus] = useState('')
	const [buttonVisible, setButtonVisible] = useState(true)

	const handleImportData = () => {
		fetch('http://localhost:3001/importData', {
			method: 'POST',
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
			{buttonVisible && <button onClick={handleImportData}>Importuj dane do bazy danych</button>}
			<p>{importStatus}</p>
		</div>
	)
}


