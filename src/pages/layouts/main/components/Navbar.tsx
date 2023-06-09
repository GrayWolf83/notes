import { Navbar } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { useNotes, useSearchContext } from '~entities/context'
import { Loader } from '~shared/ui'
import { NavbarItem } from './NavbarItem'

const AppNavbar = () => {
	const navigate = useNavigate()
	const { notes, loading } = useNotes()
	const { throttledSearch } = useSearchContext()

	const handleClick = (path: string) => {
		navigate(path)
	}

	const searchedNotes = notes
		.slice(1)
		.filter((note) =>
			note.content.toLocaleLowerCase().includes(throttledSearch),
		)

	return (
		<Navbar
			width={{ base: 130, sm: 250 }}
			p='xs'
			style={{ padding: 0, overflow: 'auto' }}>
			<NavbarItem note={notes[0]} onClick={handleClick} />

			{loading && (
				<Navbar.Section p={10}>
					<Loader pt={10} pb={10} />
				</Navbar.Section>
			)}

			{Boolean(searchedNotes.length) &&
				searchedNotes.map((note) => (
					<NavbarItem
						key={note.id}
						note={note}
						onClick={handleClick}
					/>
				))}
		</Navbar>
	)
}

export default AppNavbar
