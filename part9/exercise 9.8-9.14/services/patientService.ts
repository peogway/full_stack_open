import patients from '../data/patients'
import { Patient, PatientWithoutSsn } from '../types/PatientType'

const getPatientsWithoutSensitiveInfo: () => PatientWithoutSsn[] = () => {
	return patients.map(({ ssn, ...rest }) => rest)
}

const addPatient = (patient: Patient) => {
	patients.push(patient)
	return patient
}

export default {
	getPatientsWithoutSensitiveInfo,
	addPatient,
}

