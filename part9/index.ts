import express from 'express'

const app = express()

app.use(express.json())

app.get('/bmi', (req, res) => {
	const { weight, height } = req.query
	const weightNum = Number(weight)
	const heightNum = Number(height)
	if (isNaN(weightNum) || isNaN(heightNum)) {
		return res.status(400).json({ error: 'malformatted parameters' })
	}
	const bmi = weightNum / (heightNum / 100) ** 2
	let bmiMessage = ''
	if (bmi < 18.5) {
		bmiMessage = 'Underweight'
	} else if (bmi < 25) {
		bmiMessage = 'Normal range'
	} else if (bmi < 30) {
		bmiMessage = 'Overweight'
	} else {
		bmiMessage = 'Obese'
	}

	return res.json({
		weight: 72,
		height: 180,
		bmi: bmiMessage,
	})
})

const PORT = 3003

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

