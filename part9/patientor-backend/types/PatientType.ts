import { z } from 'zod'
import { DiagnosisSchema } from './DianoseType'

export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other',
}

// BaseEntry schema with diagnosisCodes

const BaseEntrySchema = z.object({
	id: z.string(),
	description: z.string(),
	date: z.string(),
	specialist: z.string(),
	diagnosisCodes: z.array(DiagnosisSchema.shape.code).optional(), // array of codes
})

const HospitalEntrySchema = BaseEntrySchema.extend({
	type: z.literal('Hospital'),
	discharge: z.object({
		date: z.string(),
		criteria: z.string(),
	}),
})

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
	type: z.literal('OccupationalHealthcare'),
	employerName: z.string(),
	sickLeave: z
		.object({
			startDate: z.string(),
			endDate: z.string(),
		})
		.optional(),
})

const HealthCheckEntrySchema = BaseEntrySchema.extend({
	type: z.literal('HealthCheck'),
	healthCheckRating: z.number().int().min(0).max(3),
})

export const EntrySchema = z.discriminatedUnion('type', [
	HospitalEntrySchema,
	OccupationalHealthcareEntrySchema,
	HealthCheckEntrySchema,
])

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

export type Entry = z.infer<typeof EntrySchema>

