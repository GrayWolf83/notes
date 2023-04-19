import axios from 'axios'
import authService from './auth.service'
import localStorageService from './localStorage.service'

const http = axios.create({
	baseURL:
		'https://notes-320e6-default-rtdb.asia-southeast1.firebasedatabase.app/',
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

			localStorageService.setTokens({
				refreshToken: data.refresh_token,
				idToken: data.id_token,
				localId: data.user_id,
			})
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
