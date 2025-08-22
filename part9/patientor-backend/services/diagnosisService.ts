import diagnoses from '../data/diagnoses'
import { Diagnosis, DiagnosisWithoutLatin } from '../types/DianoseType'

const getDiagnosesWithoutLatin: () => DiagnosisWithoutLatin[] = () => {
	return diagnoses.map(({ latin, ...rest }) => rest)
}

const addDiagnosis = (diagnosis: Diagnosis) => {
	diagnoses.push(diagnosis)
	return diagnosis
}

export default {
	getDiagnosesWithoutLatin,
	addDiagnosis,
}

