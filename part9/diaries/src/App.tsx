import DiaryEntries from './components/DiaryEntries'
import DiaryForm from './components/DiaryForm'
import { useState, useEffect } from 'react'
import { getDiaries } from './services/diaryService'

import { Diary } from './types'

const App = () => {
	const [diaries, setDiaries] = useState<Diary[]>([])
	const [newDiary, setNewDiary] = useState<Diary | null>(null)

	useEffect(() => {
		const fetchDiaries = async () => {
			const allDiaries = await getDiaries()
			setDiaries(allDiaries)
		}
		fetchDiaries()
	}, [])

	useEffect(() => {
		if (newDiary) {
			setDiaries((prevDiaries) => [...prevDiaries, newDiary])
			setNewDiary(null) // Reset newDiary after adding it to the list
		}
	}, [newDiary])

	return (
		<div>
			<DiaryForm setNewDiary={setNewDiary} />
			<DiaryEntries diaries={diaries} />
		</div>
	)
}

export default App

