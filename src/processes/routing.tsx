import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { MainLayout } from '~pages/layouts'
import { Loader } from '~shared/ui'

const Note = lazy(() => import('~pages/note'))
const Login = lazy(() => import('~pages/login'))

export const Routing = () => {
	return (
		<Suspense fallback={<Loader />}>
			<Routes>
				<Route path='/' element={<MainLayout />}>
					<Route path=':noteId' element={<Note />} />
				</Route>
				<Route path='login' element={<Login />} />
				<Route path='*' element={<Navigate to={'/'} />} />
			</Routes>
		</Suspense>
	)
}
