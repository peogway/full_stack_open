import { Gender } from './types/PatientType'
import * as z from 'zod'

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
})

