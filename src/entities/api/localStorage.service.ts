const TOKEN_KEY = 'jwt-token'
const REFRESH_KEY = 'jwt-refresh-token'
const EXPIRES_KEY = 'jwt-expires'
const USERID_KEY = 'user-local-id'
const USER_EMAIL = 'user-email'

interface SetTokenProps {
	refreshToken: string
	email?: string
	idToken: string
	localId: string
	expiresIn?: number
}

export function setTokens({
	refreshToken,
	idToken,
	email = String(localStorage.getItem(USER_EMAIL)),
	localId,
	expiresIn = 3600,
}: SetTokenProps) {
	const expiresDate = new Date().getTime() + expiresIn * 1000
	localStorage.setItem(USERID_KEY, localId)
	localStorage.setItem(TOKEN_KEY, idToken)
	localStorage.setItem(REFRESH_KEY, refreshToken)
	localStorage.setItem(EXPIRES_KEY, String(expiresDate))
	localStorage.setItem(USER_EMAIL, email)
}
export function getAccessToken() {
	return localStorage.getItem(TOKEN_KEY)
}
export function getRefreshToken() {
	return localStorage.getItem(REFRESH_KEY)
}
export function removeAuthData() {
	localStorage.removeItem(USERID_KEY)
	localStorage.removeItem(TOKEN_KEY)
	localStorage.removeItem(REFRESH_KEY)
	localStorage.removeItem(EXPIRES_KEY)
	localStorage.removeItem(USER_EMAIL)
}

export function getTokenExpiresDate() {
	return localStorage.getItem(EXPIRES_KEY)
}
export function getUserId() {
	return localStorage.getItem(USERID_KEY)
}
export function getUserEmail() {
	return localStorage.getItem(USER_EMAIL)
}

const localStorageService = {
	setTokens,
	getAccessToken,
	getRefreshToken,
	getTokenExpiresDate,
	getUserId,
	removeAuthData,
	getUserEmail,
}
export default localStorageService
