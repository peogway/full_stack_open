import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import * as z from 'zod'

import patientRouter from './controllers/patients'

import diagnoseService from './services/diagnoseService'
// import { Diagnose, DiagnoseWithoutLatin } from './types'

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

app.use('/api/patients', patientRouter)

app.use(errorMiddleware)

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
