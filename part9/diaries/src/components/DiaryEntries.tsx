import DiaryEntry from './DiaryEntry'
import { Diary } from '../types'

const DiaryEntries = ({ diaries }: { diaries: Diary[] }) => {
	return (
		<div>
			<h1>Diary entries</h1>
			{diaries.map((diary, index) => (
				<DiaryEntry
					key={`${index}${diary.date}${diary.visibility}${diary.weather}${diary.comment}`}
					diary={diary}
				/>
			))}
		</div>
	)
}

export default DiaryEntries

