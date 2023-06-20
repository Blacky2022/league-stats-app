import { useState } from 'react'
import { config } from '../../config'
import './button.css'
const token = localStorage.getItem('token')
export function XmlImportButton() {
	const [importStatus, setImportStatus] = useState('')
	const [buttonVisibleon, setButtonVisibleon] = useState(true)
	const baseUrl = config.BASE_URL
	
	const handleImportData = () => {
		fetch(`${baseUrl}/worlds/importXML`, {
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
			{buttonVisibleon && (
				<button className='function-button' onClick={handleImportData}>
					IMPORT XML
				</button>
			)}
			<p className='information'>{importStatus}</p>
		</div>
	)
}
