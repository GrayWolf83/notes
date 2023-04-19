import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '~entities/context'

interface ProtectedAuthProps {
	children: ReactNode
}

const ProtectedAuth = ({ children }: ProtectedAuthProps) => {
	const { email } = useAuth()

	if (!Boolean(email)) {
		return <Navigate to='/login' />
	}

	return <>{children}</>
}

export default ProtectedAuth
