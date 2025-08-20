import express from 'express'
import cors from 'cors'

import diagnoseService from './services/diagnoseService'
import patientService from './services/patientService'
import toNewPatient from './utils'
// import { Diagnose, DiagnoseWithoutLatin } from './types'

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
app.post('/api/patients', (req, res) => {
	try {
		const newPatient = toNewPatient(req.body)

		const addedEntry = patientService.addPatient(newPatient)
		res.json(addedEntry)
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.'
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message
		}
		res.status(400).send(errorMessage)
	}
})

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
