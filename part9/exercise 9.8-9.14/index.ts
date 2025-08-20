import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())
const PORT = 3001

app.get('/api/ping', (_req, res) => {
	console.log('someone pinged here')
	res.send('pong')
})

app.get('/api/patients', (_req, res) => {
	console.log('someone requested patients')
	res.send('patients')
})

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

