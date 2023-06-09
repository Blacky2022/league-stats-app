import React, { useEffect, useState } from 'react'

function Home() {
	const [message, setMessage] = useState('')

	useEffect(() => {
		fetch('http://localhost:3001/')
			.then(response => response.json())
			.then(data => setMessage(data.message))
			.catch(error => console.error(error))
	}, [])

	return (
		<div>
			<h1>Witaj na stronie głównej</h1>
			<p>{message}</p>
		</div>
	)
}

export default Home
