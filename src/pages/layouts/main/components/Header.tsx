import { Header, Flex, Box } from '@mantine/core'
import { LogoIcon } from '~shared/icons'
import { Title } from '~shared/ui'
import { ChangeNoteWidget } from '~widgets/changeNoteWidget'
import { SearchWidget } from '~widgets/searchWidget'
import { UserInfoWidget } from '~widgets/userInfoWidget'

const AppHeader = () => {
	return (
		<Header height={60} p='xs' bg='var(--gray-dark)'>
			<Flex align='center' justify='space-between'>
				<Flex align='center' gap={5}>
					<LogoIcon width='22' height='22' />
					<Title order={2} children='Notes' />
				</Flex>
				<Flex ml={10}>
					<ChangeNoteWidget />
				</Flex>
				<Flex gap={5} ml={5}>
					<SearchWidget />
					<UserInfoWidget />
				</Flex>
			</Flex>
		</Header>
	)
}

export default AppHeader
