export interface Diagnose {
	code: string
	name: string
	latin?: string
}

export type DiagnoseWithoutLatin = Omit<Diagnose, 'latin'>

