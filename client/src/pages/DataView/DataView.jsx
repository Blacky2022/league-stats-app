import React from 'react'
import { JsonImportButton } from '../../components/buttons/JsonImportButton'
import { XmlImportButton } from '../../components/buttons/XmlImportButton'
import { ClearDataButton } from '../../components/buttons/ClearDataButton'
import { CsvImportButton } from '../../components/buttons/CsvImportButton'
import { Navbar } from '../../components/Navbar/Navbar'
import { AuthProvider } from '../../components/AuthContext'
import './DataImportView.css'
export function DataImportView() {
	return (
		<AuthProvider>
			<div>
				<Navbar />
				<div className='container-data'>
					<h1>Import data</h1>
					<div className='center-data'>
						<CsvImportButton />
						<JsonImportButton />
						<XmlImportButton />
						<ClearDataButton />
					</div>
				</div>
			</div>
		</AuthProvider>
	)
}
