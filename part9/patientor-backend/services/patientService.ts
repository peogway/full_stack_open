import patients from '../data/patients'
import { NewPatient, Patient, PatientWithoutSsn } from '../types/PatientType'
import { v1 as uuid } from 'uuid'

const getPatientsWithoutSensitiveInfo: () => PatientWithoutSsn[] = () => {
	return patients.map(({ ssn, ...rest }) => rest as PatientWithoutSsn)
}

const addPatient = (newPatient: NewPatient) => {
	const patient: Patient = {
		id: uuid(),
		...newPatient,
	}

	patients.push(patient)
	return patient
}

const getPatientById = (id: string): PatientWithoutSsn | null => {
	const patient = patients.find((p) => p.id === id)
	if (!patient) return null
	const { ssn, ...rest } = patient
	return rest as PatientWithoutSsn
}

export default {
	getPatientsWithoutSensitiveInfo,
	addPatient,
	getPatientById,
}

