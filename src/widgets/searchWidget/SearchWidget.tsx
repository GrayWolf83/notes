import { TextInput } from '@mantine/core'
import { useSearchContext } from '~entities/context'

export const SearchWidget = () => {
	const { search, onChangeSearch } = useSearchContext()

	return (
		<TextInput
			value={search}
			onChange={onChangeSearch}
			placeholder='Search'
		/>
	)
}
