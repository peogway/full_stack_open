import { NextFunction, Router, Request, Response } from 'express'
import patientService from '../services/patientService'
import { Patient, NewPatient } from '../types/PatientType'
import { NewPatientSchema } from '../utils'

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
	try {
		NewPatientSchema.parse(req.body)
		next()
	} catch (error: unknown) {
		next(error)
	}
}

const patientRouter = Router()

patientRouter.get('/api/patients', (_req, res) => {
	console.log('someone requested patients')
	res.send(patientService.getPatientsWithoutSensitiveInfo())
})

patientRouter.post(
	'/api/patients',
	newPatientParser,
	(req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
		const addedEntry = patientService.addPatient(req.body)
		res.json(addedEntry)
	}
)

export default patientRouter

