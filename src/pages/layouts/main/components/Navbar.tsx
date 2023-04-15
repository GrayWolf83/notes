import { Navbar, Flex, Text } from '@mantine/core'
import { useLocation, useNavigate } from 'react-router-dom'
import { Note } from '~entities/models/note'
import { Title } from '~shared/ui'

const newNote: Note = {
	id: 'new',
	title: 'Новая заметка',
	content: 'Нет записи',
	created: '12.17',
}

const AppNavbar = () => {
	const location = useLocation()
	const navigate = useNavigate()

	const handleClick = (path: string) => {
		navigate(path)
	}

	return (
		<Navbar width={{ base: 130, sm: 250 }} p='xs' style={{ padding: 0 }}>
			<Navbar.Section
				bg={
					location.pathname === `/${newNote.id}`
						? 'var(--gray-light)'
						: '#fff'
				}
				p={10}
				style={{
					borderBottom: '1px solid var(--gray-dark)',
					cursor: 'pointer',
				}}
				onClick={() => handleClick(`/${newNote.id}`)}>
				<Flex direction='column' gap={5}>
					<Title order={6} children={newNote.title} truncate />
					<Flex gap={5}>
						<Text fz='xs'>{newNote.created}</Text>
						<Text fz='xs' color='gray' truncate>
							{newNote.content}
						</Text>
					</Flex>
				</Flex>
			</Navbar.Section>
		</Navbar>
	)
}

export default AppNavbar
