import { useState } from 'react'
import { useThrottle } from './useThrottle'

export const useSearch = () => {
	const [search, setSearch] = useState<string>('')
	const throttledSearch = useThrottle({ value: search })

	const handleChange = (e: { target: HTMLInputElement }) => {
		setSearch(e.target.value)
	}

	return { search, throttledSearch, onChangeSearch: handleChange }
}
