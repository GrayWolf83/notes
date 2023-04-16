import { notifications } from '@mantine/notifications'
import { useEffect } from 'react'
import { useAuth } from '~entities/context'

const AppAlert = () => {
	const { error, removeError } = useAuth()

	useEffect(() => {
		if (error) {
			notifications.show({
				title: 'Error',
				color: 'red',
				message: error?.message,
				autoClose: 2000,
			})

			if (removeError) {
				removeError()
			}
		}
	}, [error])

	return <></>
}

export default AppAlert
