import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import * as z from 'zod'

import diagnoseService from './services/diagnoseService'
import patientService from './services/patientService'
import { NewPatientSchema } from './utils'
import { Patient, NewPatient } from './types/PatientType'
// import { Diagnose, DiagnoseWithoutLatin } from './types'

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
	try {
		NewPatientSchema.parse(req.body)
		next()
	} catch (error: unknown) {
		next(error)
	}
}
const errorMiddleware = (
	error: unknown,
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	if (error instanceof z.ZodError) {
		res.status(400).send({ error: error.issues })
	} else {
		next(error)
	}
}

const app = express()
app.use(cors())
app.use(express.json())
const PORT = 3001

app.get('/api/ping', (_req, res) => {
	console.log('someone pinged here')
	res.send('pong')
})

app.get('/api/diagnose', (_req, res) => {
	res.send(diagnoseService.getDiagnosesWithoutLatin())
})

app.get('/api/patients', (_req, res) => {
	console.log('someone requested patients')
	res.send(patientService.getPatientsWithoutSensitiveInfo())
})

app.post(
	'/api/patients',
	newPatientParser,
	(req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
		const addedEntry = patientService.addPatient(req.body)
		res.json(addedEntry)
	}
)

app.use(errorMiddleware)

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
