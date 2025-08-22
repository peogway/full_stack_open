import { z } from 'zod'

export const DiagnosisSchema = z.object({
	code: z.string(),
	name: z.string(),
	latin: z.string().optional(),
})

export type Diagnosis = z.infer<typeof DiagnosisSchema>

export type DiagnosisWithoutLatin = Omit<Diagnosis, 'latin'>

