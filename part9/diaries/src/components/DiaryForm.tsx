import { createDiary } from '../services/diaryService'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Diary } from '../types'

const DiaryForm = ({
	setNewDiary,
}: {
	setNewDiary: Dispatch<SetStateAction<Diary | null>>
}) => {
	const [date, setDate] = useState<string>('')
	const [visibility, setVisibility] = useState<string>('')
	const [weather, setWeather] = useState<string>('')
	const [comment, setComment] = useState<string>('')
	const [error, setError] = useState<string | null>(null)

	const handleChangeVisibility = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setVisibility(event.target.value)
	}

	const handleChangeWeather = (event: React.ChangeEvent<HTMLInputElement>) => {
		setWeather(event.target.value)
	}

	const handleCreateDiary = async () => {
		if (!date || !visibility || !weather) {
			setError('All fields except comment are required')
			return
		}

		const newDiary: Diary = {
			date,
			visibility,
			weather,
			comment,
		}
		const createdDiary = await createDiary(newDiary)
		setNewDiary(createdDiary)
	}

	return (
		<div>
			<h1>Add new entry</h1>

			{error && <p style={{ color: 'red' }}>{error}</p>}

			<div className=''>
				<label htmlFor=''>date </label>
				<input
					type='date'
					value={date}
					onChange={(e) => setDate(e.target.value)}
				/>
			</div>

			<div style={{ display: 'flex', gap: '1rem' }}>
				<label htmlFor='visibility'>visibility </label>
				<div className=''>
					<input
						type='radio'
						id='great'
						name='visibility'
						value='great'
						checked={visibility === 'great'}
						onChange={handleChangeVisibility}
					/>
					<label htmlFor='great'>great</label>
				</div>
				<div className=''>
					<input
						type='radio'
						id='good'
						name='visibility'
						value='good'
						checked={visibility === 'good'}
						onChange={handleChangeVisibility}
					/>
					<label htmlFor='good'>good</label>
				</div>
				<div className=''>
					<input
						type='radio'
						id='ok'
						name='visibility'
						value='ok'
						checked={visibility === 'ok'}
						onChange={handleChangeVisibility}
					/>
					<label htmlFor='ok'>ok</label>
				</div>
				<div className=''>
					<input
						type='radio'
						id='poor'
						name='visibility'
						value='poor'
						checked={visibility === 'poor'}
						onChange={handleChangeVisibility}
					/>
					<label htmlFor='poor'>poor</label>
				</div>
			</div>

			<div style={{ display: 'flex', gap: '1rem' }}>
				<label htmlFor='weather'>weather </label>
				<div className=''>
					<input
						type='radio'
						id='sunny'
						name='weather'
						value='sunny'
						checked={weather === 'sunny'}
						onChange={handleChangeWeather}
					/>
					<label htmlFor='sunny'>sunny</label>
				</div>

				<div className=''>
					<input
						type='radio'
						id='rainy'
						name='weather'
						value='rainy'
						checked={weather === 'rainy'}
						onChange={handleChangeWeather}
					/>
					<label htmlFor='rainy'>rainy</label>
				</div>

				<div className=''>
					<input
						type='radio'
						id='cloudy'
						name='weather'
						value='cloudy'
						checked={weather === 'cloudy'}
						onChange={handleChangeWeather}
					/>
					<label htmlFor='cloudy'>cloudy</label>
				</div>
				<div className=''>
					<input
						type='radio'
						id='stormy'
						name='weather'
						value='stormy'
						checked={weather === 'stormy'}
						onChange={handleChangeWeather}
					/>
					<label htmlFor='stormy'>stormy</label>
				</div>
				<div className=''>
					<input
						type='radio'
						id='windy'
						name='weather'
						value='windy'
						checked={weather === 'windy'}
						onChange={handleChangeWeather}
					/>
					<label htmlFor='windy'>windy</label>
				</div>
			</div>

			<div className=''>
				<label htmlFor=''>comment </label>
				<input
					type='text'
					value={comment}
					onChange={(e) => setComment(e.target.value)}
				/>
			</div>

			<button onClick={handleCreateDiary}>add</button>
		</div>
	)
}

export default DiaryForm

