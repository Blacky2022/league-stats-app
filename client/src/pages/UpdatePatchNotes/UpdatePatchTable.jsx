import React, { useState, useEffect } from 'react'
import { UpdateRow } from './UpdateRow'
import { config } from '../../config'
export const UpdatePatchTable = ({ character, patch }) => {
	const [changes, setChanges] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)
	const baseUrl = config.BASE_URL

	useEffect(() => {
		const fetchChanges = async () => {
			setIsLoading(true)
			setError(null)

			try {
				const response = await fetch(`${baseUrl}/performance/${character}/patch/${patch}`)

				if (!response.ok) {
					throw new Error('No changes')
				}

				const data = await response.json()
				setChanges(data)
                
			} catch (error) {
				setError(error.message)
			} finally {
				setIsLoading(false)
			}
		}
		fetchChanges()
	}, [character, patch])

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>{error}</div>
	}

	if (!changes) {
		return <p className='information'>Postać nie była zmieniana w tym patchu</p>
	}
	return (
		<table>
			<thead>
				<tr>
					<th>Description</th>
					<th>Is Buff?</th>
					<th>Edit</th>
				</tr>
			</thead>
			<tbody>
					<UpdateRow changes={changes} patch={patch} character={character} />
			</tbody>
		</table>
	)
}
