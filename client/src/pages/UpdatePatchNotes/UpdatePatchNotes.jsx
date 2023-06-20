import React from 'react'
import { Navbar } from '../../components/Navbar/Navbar'
import { useState } from 'react'

export const UpdatePatchNotes = ({ name, selectedPatch }) => {
	const [description, setDescription] = useState('')
	const [isBuff, setIsBuff] = useState(false)

	const handleUpdate = async () => {
		try {
			const response = await fetch(`/api/${name}/patch/${selectedPatch}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					description,
					isBuff,
				}),
			})

			if (response.ok) {
				const updatedChampionChanges = await response.json()
				console.log(updatedChampionChanges)
				// Handle the updated data or perform any necessary actions
			} else {
				throw new Error('Error updating champion changes')
			}
		} catch (error) {
			console.error('Error updating champion changes:', error)
			// Handle the error or display an error message to the user
		}
	}

	return (
		<div>
			<Navbar />
			<h1>Update Performance</h1>
			<textarea value={description} onChange={e => setDescription(e.target.value)} placeholder='Enter description' />
			<label>
				<input type='checkbox' checked={isBuff} onChange={e => setIsBuff(e.target.checked)} />
				Is Buff?
			</label>
			<button onClick={handleUpdate}>Update Patch Notes</button>
		</div>
	)
}

