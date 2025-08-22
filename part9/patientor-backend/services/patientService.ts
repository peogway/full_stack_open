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

export default {
	getPatientsWithoutSensitiveInfo,
	addPatient,
}

