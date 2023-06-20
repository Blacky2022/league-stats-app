import React, { useState } from 'react'
import { config } from '../../config'

export const UpdateRow = ({ changes, character, patch }) => {
	const { _id, opis, czy_buff } = changes
	const [description, setDescription] = useState(opis)
	const [isBuff, setIsBuff] = useState(czy_buff)
	const [isUpdated, setIsUpdated] = useState(false)
	const baseUrl = config.BASE_URL

	const handleSave = async () => {
		try {
			const response = await fetch(`${baseUrl}/season/changes/edit`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					description: description,
					isBuff: isBuff,
					name: character,
					selectedPatch: patch,
				}),
			})

			if (!response.ok) {
				throw new Error('Wystąpił błąd podczas zapisywania zmian.')
			}

			const updatedChanges = await response.json()
			console.log('Zapisano zmiany:', updatedChanges)
			setIsUpdated(true) // Ustawienie stanu isUpdated na true po pomyślnym zapisaniu zmian
		} catch (error) {
			console.error('Błąd podczas zapisywania zmian:', error)
		}
	}

	return (
		<tr>
			<td>
				<textarea value={description} onChange={e => setDescription(e.target.value)} />
			</td>
			<td>
				<input type='checkbox' checked={isBuff} onChange={e => setIsBuff(e.target.checked)} />
			</td>
			<td>
				<button onClick={handleSave}>Save</button>
				{isUpdated && <span>UPDATED!</span>}
			</td>
		</tr>
	)
}
