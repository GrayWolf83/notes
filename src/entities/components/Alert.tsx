import { notifications } from '@mantine/notifications'
import { useEffect } from 'react'
import { useAlert } from '~entities/context'

const AppAlert = () => {
	const { alerts, clearAlerts } = useAlert()

	useEffect(() => {
		if (alerts.length) {
			alerts.forEach((alert) => {
				notifications.show({
					title: alert.title,
					color: alert.color,
					message: alert.message,
					autoClose: 2500,
				})
			})

			clearAlerts()
		}
	}, [alerts])

	return <></>
}

export default AppAlert
