import { ReactNode, useState } from 'react'
import { useContext } from 'react'
import { createContext } from 'react'
import { useSearch } from '~entities/hooks'
import { IAlert } from '~entities/models/alert'

const searchDefaultValue: SearchProps = {
	search: '',
	throttledSearch: '',
	onChangeSearch: () => {},
}

interface SearchProps {
	search: string
	throttledSearch: string
	onChangeSearch: (e: { target: HTMLInputElement }) => void
}

const Search = createContext<SearchProps>(searchDefaultValue)

export function useSearchContext() {
	return useContext(Search)
}

interface SearchProviderProps {
	children: ReactNode
}

export function SearchProvider(props: SearchProviderProps) {
	const { search, throttledSearch, onChangeSearch } = useSearch()

	return (
		<Search.Provider
			value={{
				search,
				throttledSearch,
				onChangeSearch,
			}}>
			{props.children}
		</Search.Provider>
	)
}
