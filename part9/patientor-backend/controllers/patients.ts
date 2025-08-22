import { NextFunction, Router, Request, Response } from 'express'
import patientService from '../services/patientService'
import { Patient, NewPatient, NewPatientSchema } from '../types/PatientType'

const patientRouter = Router()

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
	try {
		NewPatientSchema.parse(req.body)
		next()
	} catch (error: unknown) {
		next(error)
	}
}

patientRouter.get('/', (_req, res) => {
	console.log('someone requested patients')
	res.send(patientService.getPatientsWithoutSensitiveInfo())
})

patientRouter.get('/:id', (req, res) => {
	const patient = patientService.getPatientById(req.params.id)
	res.json(patient)
})

patientRouter.post(
	'/',
	newPatientParser,
	(
		req: Request<unknown, unknown, NewPatient>,
		res: Response<Patient | null>
	) => {
		const addedEntry = patientService.addPatient(req.body)
		res.json(addedEntry)
	}
)

export default patientRouter

