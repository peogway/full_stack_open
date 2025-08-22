import { Diary } from '../types'
const DiaryEntry = ({ diary }: { diary: Diary }) => {
	return (
		<div className=''>
			<h2>{diary.date}</h2>
			<p>visibility: {diary.visibility}</p>
			<p>weather: {diary.weather}</p>
		</div>
	)
}

export default DiaryEntry

