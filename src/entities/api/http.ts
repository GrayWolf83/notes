import axios from 'axios'
import authService from './auth.service'
import localStorageService from './localStorage.service'

const http = axios.create({
	baseURL: '',
})

http.interceptors.request.use(
	async function (config) {
		if (config?.url) {
			config.url =
				(config.url.slice(-1) === '/'
					? config.url.slice(0, -1)
					: config.url) + '.json'
		}

		const expiresDate = localStorageService.getTokenExpiresDate()
		const refreshToken = localStorageService.getRefreshToken()
		if (refreshToken && Number(expiresDate) < Date.now()) {
			const data = await authService.refresh()

			localStorageService.setTokens(data)
		}
		const accessToken = localStorageService.getAccessToken()
		if (accessToken) {
			config.params = { ...config.params, auth: accessToken }
		}
		return config
	},
	function (error) {
		return Promise.reject(error)
	},
)

const httpService = {
	get: http.get,
	post: http.post,
	put: http.put,
	delete: http.delete,
	patch: http.patch,
}
export default httpService
