import { ReactNode } from 'react'
import { AlertProvider } from './Alert'
import { AuthProvider } from './Auth'
import { NotesProvider } from './Notes'
import { SearchProvider } from './Search'

interface IProps {
	children: ReactNode
}

export const RootContextProvider = ({ children }: IProps) => {
	return (
		<AlertProvider>
			<AuthProvider>
				<SearchProvider>
					<NotesProvider>{children}</NotesProvider>
				</SearchProvider>
			</AuthProvider>
		</AlertProvider>
	)
}
