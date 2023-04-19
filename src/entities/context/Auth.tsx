import { ReactNode, useState } from 'react'
import { useContext } from 'react'
import { createContext } from 'react'
import authService from '~entities/api/auth.service'
import localStorageService from '~entities/api/localStorage.service'
import { AuthPayload } from '~entities/models/auth'
import { useAlert } from './Alert'

interface AuthProps {
	email: string
	loading: boolean
	signin: (values: AuthPayload, callback: () => void) => void
	signup: (values: AuthPayload, callback: () => void) => void
	signout: () => void
}

const authDefaultValue = {
	email: '',
	loading: false,
	signin: () => {},
	signup: () => {},
	signout: () => {},
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
	const { setAlert } = useAlert()

	async function signin(values: AuthPayload, callback: () => void) {
		setLoading(true)
		try {
			const data = await authService.login(values)
			localStorageService.setTokens(data)
			setEmail(data.email)
			callback()
		} catch (error: any) {
			setAlert({
				title: error?.code,
				message: error?.message,
				color: 'red',
			})
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
			setAlert({
				title: error?.code,
				message: error?.message,
				color: 'red',
			})
		} finally {
			setLoading(false)
		}
	}

	function signout() {
		localStorageService.removeAuthData()
		setEmail('')
	}

	return (
		<Auth.Provider
			value={{
				email,
				loading,
				signin,
				signup,
				signout,
			}}>
			{props.children}
		</Auth.Provider>
	)
}
