import diagnoses from '../data/diagnoses'
import { Diagnose, DiagnoseWithoutLatin } from '../types'

const getDiagnosesWithoutLatin: () => DiagnoseWithoutLatin[] = () => {
	return diagnoses.map(({ latin, ...rest }) => rest)
}

const addDiagnosis = (diagnosis: Diagnose) => {
	diagnoses.push(diagnosis)
	return diagnosis
}

export default {
	getDiagnosesWithoutLatin,
	addDiagnosis,
}

