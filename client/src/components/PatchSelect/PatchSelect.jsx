import React, { useState } from 'react'

export function PatchSelect() {
	const [selectedPatch, setSelectedPatch] = useState('') // Wybrany patch

	const handlePatchChange = event => {
		setSelectedPatch(event.target.value)
	}

	return (
		<div>
			<h1>Champions Performance</h1>

			{/* Formularz wyboru patcha */}
			<label htmlFor='patchSelect'>Wybierz patch:</label>
			<select id='patchSelect' value={selectedPatch} onChange={handlePatchChange}>
				<option value=''>Wszystkie patche</option>
				{[...Array(23).keys()].map(patch => (
					<option key={patch + 1} value={patch + 1}>
						Patch {patch + 1}
					</option>
				))}
			</select>

			{/* Wyświetlanie danych */}
			{/* ... */}
		</div>
	)
}
