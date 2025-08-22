import patients from '../data/patients'
import { NewPatient, Patient, NonSensitivePatient } from '../types/PatientType'
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

const getPatientById = (id: string): NonSensitivePatient | null => {
	const patient = patients.find((p) => p.id === id)
	if (!patient) return null
	const { ssn, ...rest } = patient
	return rest as NonSensitivePatient
}

export default {
	getPatientsWithoutSensitiveInfo,
	addPatient,
	getPatientById,
}

