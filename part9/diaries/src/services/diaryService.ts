import axios from 'axios'
import { Diary } from '../types'

const API_URL = 'http://localhost:3000/api/diaries'

export const getDiaries = async () => {
	const response = await axios.get(API_URL)
	return response.data
}

export const createDiary = async (diary: Diary) => {
	const response = await axios.post(API_URL, diary)
	return response.data
}

export const getDiaryById = async (id: string) => {
	const response = await axios.get(`${API_URL}/${id}`)
	return response.data
}

// export const updateDiary = async (id: string, diary: any) => {
// 	const response = await axios.put(`${API_URL}/${id}`, diary)
// 	return response.data
// }

// export const deleteDiary = async (id: string) => {
// 	const response = await axios.delete(`${API_URL}/${id}`)
// 	return response.data
// }

