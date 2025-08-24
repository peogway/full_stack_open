import patients from '../data/patients'
import {
	NewPatient,
	Patient,
	NonSensitivePatient,
	NewEntry,
} from '../types/PatientType'
import { v1 as uuid } from 'uuid'

const getPatientsWithoutSensitiveInfo: () => NonSensitivePatient[] = () => {
	return patients.map(({ ssn, ...rest }) => rest as NonSensitivePatient)
}

const addPatient = (newPatient: NewPatient) => {
	const patient: Patient = {
		id: uuid(),
		...newPatient,
	}

	patients.push(patient)
	return patient
}

const getPatientById = (id: string): Patient | null => {
	const patient = patients.find((p) => p.id === id)
	if (!patient) return null
	return patient as Patient
}

const addEntry = (patientId: string, newEntry: NewEntry) => {
	const entry = {
		id: uuid(),
		...newEntry,
	}

	patients.find((p) => p.id === patientId)?.entries.push(entry)
	return entry
}

export default {
	getPatientsWithoutSensitiveInfo,
	addPatient,
	getPatientById,
	addEntry,
}

