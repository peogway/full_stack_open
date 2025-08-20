import { NewPatient, Gender } from './types/PatientType'

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String
}

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date))
}

const parseName = (name: unknown): string => {
	if (!name || !isString(name)) throw new Error('Invalid name')
	return name
}

const parseDate = (date: unknown): string => {
	if (!date || !isString(date) || !isDate(date)) throw new Error('Invalid date')
	return date
}

const parseSsn = (ssn: unknown): string => {
	if (!ssn || !isString(ssn)) throw new Error('Invalid ssn')
	return ssn
}

const parseOccupation = (occupation: unknown): string => {
	if (!occupation || !isString(occupation))
		throw new Error('Invalid occupation')
	return occupation
}

const isGender = (param: string): param is Gender => {
	return Object.values(Gender)
		.map((v) => v.toString())
		.includes(param)
}

const parseGender = (gender: unknown): Gender => {
	if (!gender || !isString(gender) || !isGender(gender)) {
		throw new Error('Incorrect or missing gender: ' + gender)
	}
	return gender
}

const toNewPatient = (object: unknown): NewPatient => {
	if (!object || typeof object !== 'object') {
		throw new Error('Incorrect or missing data')
	}
	if (
		'name' in object &&
		'dateOfBirth' in object &&
		'ssn' in object &&
		'gender' in object &&
		'occupation' in object
	) {
		const newPatient: NewPatient = {
			name: parseName(object.name),
			dateOfBirth: parseDate(object.dateOfBirth),
			ssn: parseSsn(object.ssn),
			gender: parseGender(object.gender),
			occupation: parseOccupation(object.occupation),
		}

		return newPatient
	}

	throw new Error('Incorrect data: some fields are missing')
}

export default toNewPatient

