import { useRef, useState, useEffect } from 'react'
interface IProps {
	value: string
	interval?: number
}

export const useThrottle = ({ value, interval = 500 }: IProps) => {
	const [throttledValue, setThrottledValue] = useState<string>('')
	const lastExecuted = useRef(Date.now())

	useEffect(() => {
		if (Date.now() >= lastExecuted.current + interval) {
			lastExecuted.current = Date.now()
			setThrottledValue(value)
		} else {
			const timer = setTimeout(() => {
				lastExecuted.current = Date.now()
				setThrottledValue(value)
			}, interval)

			return () => clearTimeout(timer)
		}
	}, [value, interval])

	return throttledValue.toLocaleLowerCase()
}
