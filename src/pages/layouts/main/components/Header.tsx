import { Header, Box, Flex } from '@mantine/core'
import { LogoIcon } from '~shared/icons'
import { Title } from '~shared/ui'
import { ChangeNoteWidget } from '~widgets/changeNoteWidget'

const AppHeader = () => {
	return (
		<Header height={60} p='xs' bg='var(--gray-dark)'>
			<Flex align='center'>
				<Flex align='center' gap={5}>
					<LogoIcon width='22' height='22' />
					<Title order={2} children='Notes' />
				</Flex>
				<Box ml='auto'>
					<ChangeNoteWidget />
				</Box>
			</Flex>
		</Header>
	)
}

export default AppHeader
