import { Flex, Navbar, Text } from '@mantine/core'
import { useNotes } from '~/entities/context'
import { INote } from '~/entities/models/note'
import { Title } from '~/shared/ui'
import { getDate } from '~/shared/utils/getDate'

interface IProps {
	note: INote
	onClick: (path: string) => void
}

export const NavbarItem = ({ note, onClick }: IProps) => {
	const { current } = useNotes()

	return (
		<Navbar.Section
			bg={current.id === `${note.id}` ? 'var(--gray-light)' : '#fff'}
			p={10}
			style={{
				borderBottom: '1px solid var(--gray-dark)',
				cursor: 'pointer',
			}}
			onClick={() => onClick(`${note.id}`)}>
			<Flex direction='column' gap={5}>
				<Title order={6} children={note.title} truncate />
				<Flex gap={5}>
					<Text fz='xs'>{getDate(note.created)}</Text>
					<Text fz='xs' color='gray' truncate>
						{note.content}
					</Text>
				</Flex>
			</Flex>
		</Navbar.Section>
	)
}
