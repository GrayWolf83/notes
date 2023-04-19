import { INote } from '~entities/models/note'
import httpService from './http'
import localStorageService from './localStorage.service'

const endpoint = 'notes/'

const notesService = {
	create: async (id: string, payload: any) => {
		const userId = localStorageService.getUserId()
		const { data } = await httpService.put(
			endpoint + userId + '/' + id,
			payload,
		)

		return { ...data, id }
	},
	getList: async () => {
		const userId = localStorageService.getUserId()
		const { data } = await httpService.get(endpoint + userId)

		if (data) {
			return Object.keys(data)
				.map((key) => ({
					id: key,
					...data[key],
				}))
				.sort((a, b) =>
					Number(a.created) > Number(b.created) ? -1 : 1,
				)
		}

		return data
	},
	remove: async (noteId: string) => {
		const userId = localStorageService.getUserId()
		const { data } = await httpService.delete(
			endpoint + userId + '/' + noteId,
		)
		return data
	},
}
export default notesService
