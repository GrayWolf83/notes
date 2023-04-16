import { Flex, Text } from '@mantine/core'
import { useAuth } from '~entities/context'
import { SignoutIcon } from '~shared/icons'
import { Button } from '~shared/ui'

const UserInfoWidget = () => {
	const { email, signout } = useAuth()

	const handleSignout = () => {
		if (signout) {
			signout()
		}
	}

	return (
		<Flex gap={10} align='center'>
			{email && <Text>{email}</Text>}
			<Button variant='default' radius='md' onClick={handleSignout}>
				<SignoutIcon />
			</Button>
		</Flex>
	)
}

export default UserInfoWidget
