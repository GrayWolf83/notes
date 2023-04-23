import { Outlet } from 'react-router-dom'
import { AppShell, Box } from '@mantine/core'
import { Header, Navbar } from './components'

const MainLayout = () => {
	return (
		<AppShell padding='md' navbar={<Navbar />} header={<Header />}>
			<Box
				style={{
					height: 'calc(100vh - 100px)',
					overflow: 'auto',
				}}>
				<Outlet />
			</Box>
		</AppShell>
	)
}

export default MainLayout
