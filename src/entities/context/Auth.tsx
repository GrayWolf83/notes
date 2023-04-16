import { ReactNode, useState } from 'react'
import { useContext } from 'react'
import { createContext } from 'react'
import authService from '~entities/api/auth.service'
import localStorageService from '~entities/api/localStorage.service'
import { AuthPayload } from '~entities/models/auth'

const authDefaultValue = {
	email: '',
	loading: false,
	error: null,
}

interface Error {
	code: string
	message: string
}

interface AuthProps {
	email: string
	loading: boolean
	error: Error | null
	signin?: (values: AuthPayload, callback: () => void) => void
	signup?: (values: AuthPayload, callback: () => void) => void
	signout?: () => void
	removeError?: () => void
}

const Auth = createContext<AuthProps>(authDefaultValue)

export function useAuth() {
	return useContext(Auth)
}

interface AuthProviderProps {
	children: ReactNode
}

export function AuthProvider(props: AuthProviderProps) {
	const [email, setEmail] = useState(localStorageService.getUserEmail() || '')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	async function signin(values: AuthPayload, callback: () => void) {
		setLoading(true)
		try {
			const data = await authService.login(values)
			localStorageService.setTokens(data)
			setEmail(data.email)
			callback()
		} catch (error: any) {
			setError(error)
		} finally {
			setLoading(false)
		}
	}

	async function signup(values: AuthPayload, callback: () => void) {
		setLoading(true)
		try {
			const data = await authService.register(values)
			localStorageService.setTokens(data)
			setEmail(data.email)
			callback()
		} catch (error: any) {
			setError(error)
		} finally {
			setLoading(false)
		}
	}

	function signout() {
		localStorageService.removeAuthData()
		setEmail('')
	}

	function removeError() {
		setError(null)
	}

	return (
		<Auth.Provider
			value={{
				email,
				loading,
				error,
				signin,
				signup,
				signout,
				removeError,
			}}>
			{props.children}
		</Auth.Provider>
	)
}
