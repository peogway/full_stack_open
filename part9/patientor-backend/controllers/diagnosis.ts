import { Router } from 'express'
// import { NextFunction, Request, Response } from 'express'
import diagnosisService from '../services/diagnosisService'

const diagnosisRouter = Router()

// const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
// 	try {
// 		NewPatientSchema.parse(req.body)
// 		next()
// 	} catch (error: unknown) {
// 		next(error)
// 	}
// }

diagnosisRouter.get('/', (_req, res) => {
	console.log('someone requested patients')
	res.json(diagnosisService.getDiagnosesWithoutLatin())
})

// diagnosisRouter.get('/:id', (req, res) => {
// 	const patient = patientService.getPatientById(req.params.id)
// 	res.json(patient)
// })

// diagnosisRouter.post(
// 	'/',
// 	newPatientParser,
// 	(
// 		req: Request<unknown, unknown, NewPatient>,
// 		res: Response<Patient | null>
// 	) => {
// 		const addedEntry = patientService.addPatient(req.body)
// 		res.json(addedEntry)
// 	}
// )

export default diagnosisRouter

