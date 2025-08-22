import { Patient } from '../../types'
import { useEffect, useState } from 'react'
import axios from 'axios'
import patientService from '../../services/patients'
import { apiBaseUrl } from '../../constants'
import { useParams } from 'react-router-dom'

const SelectedPatient = () => {
	const { id } = useParams<{ id: string }>()
	const [patient, setPatient] = useState<Patient | null>(null)

	useEffect(() => {
		void axios.get<void>(`${apiBaseUrl}/ping`)

		const fetchPatient = async () => {
			if (id) {
				const patient = await patientService.getOne(id)
				setPatient(patient)
				console.log(patient)
			}
		}
		void fetchPatient()
	}, [id])
	return (
		<div>
			{patient && (
				<>
					<p>Name: {patient.name}</p>
					<p>Gender: {patient.gender}</p>
					{patient.ssn && <p>SSN: {patient.ssn}</p>}
					<p>Date of Birth: {patient.dateOfBirth}</p>
					<p>Occupation: {patient.occupation}</p>
				</>
			)}
		</div>
	)
}

export default SelectedPatient

