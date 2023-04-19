import { Navbar, Flex, Text } from '@mantine/core'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useNotes } from '~entities/context'
import { Loader, Title } from '~shared/ui'
import { getDate } from '~shared/utils/getDate'

const AppNavbar = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const { notes, loading } = useNotes()

	const handleClick = (path: string) => {
		navigate(path)
	}

	return (
		<Navbar
			width={{ base: 130, sm: 250 }}
			p='xs'
			style={{ padding: 0, overflow: 'auto' }}>
			{Boolean(notes.length) &&
				notes.map((note, index) => (
					<React.Fragment key={note.id}>
						<Navbar.Section
							bg={
								location.pathname === `/${note.id}`
									? 'var(--gray-light)'
									: '#fff'
							}
							p={10}
							style={{
								borderBottom: '1px solid var(--gray-dark)',
								cursor: 'pointer',
							}}
							onClick={() => handleClick(`/${note.id}`)}>
							<Flex direction='column' gap={5}>
								<Title
									order={6}
									children={note.title}
									truncate
								/>
								<Flex gap={5}>
									<Text fz='xs'>{getDate(note.created)}</Text>
									<Text fz='xs' color='gray' truncate>
										{note.content}
									</Text>
								</Flex>
							</Flex>
						</Navbar.Section>

						{index === 0 && loading && (
							<Navbar.Section p={10}>
								<Loader pt={10} pb={10} />
							</Navbar.Section>
						)}
					</React.Fragment>
				))}
		</Navbar>
	)
}

export default AppNavbar
