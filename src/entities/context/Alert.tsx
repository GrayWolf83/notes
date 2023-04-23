import { ReactNode, useState } from 'react'
import { useContext } from 'react'
import { createContext } from 'react'
import { IAlert } from '~/entities/models/alert'

const alertDefaultValue = {
	alerts: [],
	setAlert: () => {},
	clearAlerts: () => {},
}

interface AlertProps {
	alerts: IAlert[]
	setAlert: (alert: IAlert) => void
	clearAlerts: () => void
}

const Alert = createContext<AlertProps>(alertDefaultValue)

export function useAlert() {
	return useContext(Alert)
}

interface AlertProviderProps {
	children: ReactNode
}

export function AlertProvider(props: AlertProviderProps) {
	const [alerts, setAlerts] = useState<IAlert[]>([])

	function setAlert(alert: IAlert) {
		setAlerts((prev) => [alert, ...prev])
	}

	function clearAlerts() {
		setAlerts([])
	}

	return (
		<Alert.Provider
			value={{
				alerts,
				setAlert,
				clearAlerts,
			}}>
			{props.children}
		</Alert.Provider>
	)
}
