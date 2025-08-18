interface DailyExercise {
	hours: number[]
	target: number
}

const parseDailyExercise = (args: string[]): DailyExercise => {
	if (args.length < 4) throw new Error('Not enough arguments')
	const hours: number[] = []
	const target = Number(args[2])
	if (isNaN(target)) throw new Error('Provided target was not a number!')

	for (let i = 3; i < args.length; i++) {
		const value = Number(args[i])
		if (isNaN(value)) {
			throw new Error('Provided values were not numbers!')
		}
		hours.push(value)
	}
	return { hours, target }
}

interface ExerciseResult {
	periodLength: number
	trainingDays: number
	success: boolean
	rating: number
	ratingDescription: string
	target: number
	average: number
}

const calculateExercises = (
	dailyExerciseHours: number[],
	target: number
): ExerciseResult => {
	const periodLength = dailyExerciseHours.length
	const trainingDays = dailyExerciseHours.filter((hours) => hours > 0).length
	const average = dailyExerciseHours.reduce((a, b) => a + b, 0) / periodLength
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

	return {
		periodLength,
		trainingDays,
		success,
		rating,
		ratingDescription,
		target,
		average,
	}
}

try {
	const { hours, target } = parseDailyExercise(process.argv)
	console.log(calculateExercises(hours, target))
} catch (error: unknown) {
	let errorMessage = 'Something bad happened.'
	if (error instanceof Error) {
		errorMessage += ' Error: ' + error.message
	}
	console.error(errorMessage)
}

