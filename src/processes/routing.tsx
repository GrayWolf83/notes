import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Alert, ProtectedAuth } from '~entities/components'
import { AuthProvider } from '~entities/context'
import { MainLayout } from '~pages/layouts'
import { Loader } from '~shared/ui'

const Note = lazy(() => import('~pages/note'))
const Login = lazy(() => import('~pages/login'))

export const Routing = () => {
	return (
		<Suspense fallback={<Loader />}>
			<AuthProvider>
				<Routes>
					<Route
						path='/'
						element={
							<ProtectedAuth>
								<MainLayout />
							</ProtectedAuth>
						}>
						<Route path=':noteId' element={<Note />} />
					</Route>
					<Route path='login' element={<Login />} />
					<Route path='*' element={<Navigate to={'/'} />} />
				</Routes>
				<Alert />
			</AuthProvider>
		</Suspense>
	)
}
