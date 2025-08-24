import { z } from 'zod'

export const DiagnosisSchema = z.object({
	code: z.string(),
	name: z.string(),
	latin: z.string().optional(),
})

export type Diagnosis = z.infer<typeof DiagnosisSchema>

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
	? Omit<T, K>
	: never
// Define Entry without the 'id' property

export type DiagnosisWithoutLatin = UnionOmit<Diagnosis, 'latin'>

