import { z } from 'zod'

export const EntrySchema = z.object({
	id: z.string(),
	description: z.string(),
})

export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other',
}

export type Entry = z.infer<typeof EntrySchema>

export const NewPatientSchema = z.object({
	name: z
		.string()
		.min(3, 'Name is required with a minimum length of 3 characters'),
	dateOfBirth: z.string().date(),
	ssn: z
		.string()
		.min(11, 'SSN is required with a minimum length of 11 characters'),
	gender: z.nativeEnum(Gender),
	occupation: z
		.string()
		.min(3, 'Occupation is required with a minimum length of 3 characters'),
	entries: z.array(EntrySchema).default([]),
})

export type NewPatient = z.infer<typeof NewPatientSchema>

export interface Patient extends NewPatient {
	id: string
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>

