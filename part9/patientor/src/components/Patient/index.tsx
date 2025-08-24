import { Diagnosis, Entry, Patient } from '../../types'
import { useEffect, useState } from 'react'

import EntryDetail from '../EntryDetails'
import EntryForm from '../EntryForm'

import patientService from '../../services/patients'
import diagnosisService from '../../services/diagnosis'

import { useParams } from 'react-router-dom'
import FemaleIcon from '@mui/icons-material/Female'
import MaleIcon from '@mui/icons-material/Male'
import { Button } from '@mui/material'

const SelectedPatient = () => {
	const { id } = useParams<{ id: string }>()
	const [patient, setPatient] = useState<Patient | null>(null)
	const [showEntryForm, setShowEntryForm] = useState(false)
	const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([])
	const [addedEntry, setAddedEntry] = useState<Entry | null>(null)

	useEffect(() => {
		const fetchDiagnosis = async () => {
			const diagnosisData = await diagnosisService.getAll()
			setDiagnosis(diagnosisData)
		}
		const fetchPatient = async () => {
			if (id) {
				const patient = await patientService.getOne(id)
				setPatient(patient)
			}
		}
		void fetchPatient()
		void fetchDiagnosis()
	}, [])

	useEffect(() => {
		if (addedEntry) {
			setPatient((prev) => {
				if (!prev) return null
				return {
					...prev,
					entries: [...prev.entries, addedEntry],
				}
			})
		}
	}, [addedEntry])

	return (
		<div>
			{patient && (
				<>
					<h2>
						{patient.name} |{' '}
						{patient.gender === 'female' ? (
							<FemaleIcon
								fontSize='large'
								style={{ transform: 'translateY(9px)' }}
							/>
						) : patient.gender === 'male' ? (
							<MaleIcon
								fontSize='large'
								style={{ transform: 'translateY(9px)' }}
							/>
						) : (
							<>Other</>
						)}
					</h2>
					{patient.ssn && <p>SSN: {patient.ssn}</p>}
					<p>Date of Birth: {patient.dateOfBirth}</p>
					<p>Occupation: {patient.occupation}</p>
					<br />
					{showEntryForm && (
						<EntryForm
							onClose={() => setShowEntryForm(false)}
							diagnosis={diagnosis}
							patientId={patient.id}
							setAddedEntry={setAddedEntry}
						/>
					)}
					<h3>Entries</h3>
					{patient.entries.length > 0 ? (
						<>
							{patient.entries.map((entry) => (
								<EntryDetail key={entry.id} entry={entry} />
							))}
						</>
					) : (
						<p>No entries found.</p>
					)}
					<Button
						onClick={() => {
							setShowEntryForm(true)
						}}
						variant='contained'
						color='primary'
					>
						ADD NEW ENTRY
					</Button>
				</>
			)}
		</div>
	)
}

export default SelectedPatient

