import { Loader, Flex, FlexProps } from '@mantine/core'

const AppLoader = (props: FlexProps) => {
	return (
		<Flex justify='center' align='center' {...props}>
			<Loader variant='bars' color='gray' />
		</Flex>
	)
}

export default AppLoader
