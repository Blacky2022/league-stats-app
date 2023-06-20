import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { config } from '../config'

const ForbiddenContext = createContext(false)

export const ForbiddenProvider = ({ children }) => {
	const [forbidden, setForbidden] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		async function checkForbidden() {
			try {
				const res = await fetch(`${config.BASE_URL}/user/protected-endpoint`, {
					method: 'POST',
					credentials: 'include',
					mode: 'cors',
					headers: {
						'Content-Type': 'application/json',
					},
				})

				if (res.status === 403) {
					setForbidden(true)
				} else {
					setForbidden(false)
				}
			} catch (error) {
				setForbidden(true)
			}
		}

		checkForbidden()
	}, [navigate])

	return <>{forbidden ? <></> : <ForbiddenContext.Provider value={forbidden}>{children}</ForbiddenContext.Provider>}</>
}
