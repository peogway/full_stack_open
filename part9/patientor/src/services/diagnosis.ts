import axios from 'axios'
import { Diagnosis } from '../types'

import { apiBaseUrl } from '../constants'

const getAll = async () => {
	const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`)

	return data
}

const create = async (object: Diagnosis) => {
	const { data } = await axios.post<Diagnosis>(
		`${apiBaseUrl}/diagnoses`,
		object
	)

	return data
}

const getOne = async (id: string) => {
	const { data } = await axios.get<Diagnosis>(`${apiBaseUrl}/diagnoses/${id}`)

	return data
}

export default {
	getAll,
	create,
	getOne,
}

