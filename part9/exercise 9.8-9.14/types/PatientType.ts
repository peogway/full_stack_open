import { z } from 'zod'
import { NewPatientSchema } from '../utils'

export type PatientWithoutSsn = Omit<Patient, 'ssn'>

export type NewPatient = z.infer<typeof NewPatientSchema>

export interface Patient extends NewPatient {
	id: string
}

export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other',
}

