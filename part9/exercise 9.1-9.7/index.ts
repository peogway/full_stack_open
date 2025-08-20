import express from 'express'

interface ExerciseAndTarget {
	daily_exercises: number[]
	target: number
}

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

app.get('/exercises', (req, res) => {
	const { daily_exercises, target } = req.body
	if (!daily_exercises || !target) {
		return res.status(400).json({ error: 'parameters missing' })
	}
	if (!Array.isArray(daily_exercises) || typeof target !== 'number') {
		return res.status(400).json({ error: 'malformatted parameters' })
	}

	const periodLength = daily_exercises.length
	const trainingDays = daily_exercises.filter((hours) => hours > 0).length
	const average = daily_exercises.reduce((a, b) => a + b, 0) / periodLength
	const success = average >= target
	let rating: number
	let ratingDescription: string
	if (success) {
		rating = 3
		ratingDescription = 'Good job!'
	} else if (average >= target * 0.8) {
		rating = 2
		ratingDescription = "Not bad, but there's room for improvement."
	} else {
		rating = 1
		ratingDescription = 'You can do better!'
	}

	return res.json({
		periodLength,
		trainingDays,
		success,
		rating,
		ratingDescription,
		target,
		average,
	})
})

const PORT = 3003

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

