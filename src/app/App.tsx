import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { Routing } from '~/processes/routing'
import './App.css'

export function App() {
	return (
		<MantineProvider withGlobalStyles withNormalizeCSS>
			<Routing />
			<Notifications />
		</MantineProvider>
	)
}
