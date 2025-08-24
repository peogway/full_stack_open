export interface Diagnosis {
	code: string
	name: string
	latin?: string
}

export type DiagnosisWithoutLatin = Omit<Diagnosis, 'latin'>
export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other',
}

export interface BaseEntry {
	id: string
	description: string
	date: string
	specialist: string
	diagnosisCodes?: Diagnosis['code'][]
}

export enum HealthCheckRating {
	'Healthy' = 0,
	'LowRisk' = 1,
	'HighRisk' = 2,
	'CriticalRisk' = 3,
}

export interface HospitalEntry extends BaseEntry {
	type: 'Hospital'
	discharge: {
		date: string
		criteria: string
	}
}

export interface OccupationalHealthcareEntry extends BaseEntry {
	type: 'OccupationalHealthcare'
	employerName: string
	sickLeave?: {
		startDate: string
		endDate: string
	}
}

export interface HealthCheckEntry extends BaseEntry {
	type: 'HealthCheck'
	healthCheckRating: HealthCheckRating
}

export type Entry =
	| HospitalEntry
	| OccupationalHealthcareEntry
	| HealthCheckEntry

export interface Patient {
	id: string
	name: string
	occupation: string
	gender: Gender
	ssn?: string
	dateOfBirth?: string
	entries: Entry[]
}

export type PatientFormValues = Omit<Patient, 'id' | 'entries'>

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
	? Omit<T, K>
	: never
// Define Entry without the 'id' property
export type NewEntry =
	| UnionOmit<HospitalEntry, 'id'>
	| UnionOmit<OccupationalHealthcareEntry, 'id'>
	| UnionOmit<HealthCheckEntry, 'id'>
