import React from 'react'
import { JsonImportButton } from '../../components/buttons/JsonImportButton'
import { XmlImportButton } from '../../components/buttons/XmlImportButton'
import { ClearDataButton } from '../../components/buttons/ClearDataButton'
import { CsvImportButton } from '../../components/buttons/CsvImportButton'
import { Navbar } from '../../components/Navbar/Navbar'
export function UpdatePerformance() {
	return (
		<div>
			<Navbar />
			<h1>Update Performance</h1>
			<CsvImportButton />
			<JsonImportButton />
			<XmlImportButton />
			<ClearDataButton />
		</div>
	)
}
