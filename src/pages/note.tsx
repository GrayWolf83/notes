import { TextInput, Textarea } from '@mantine/core'
import { useNotes } from '~/entities/context'

const Note = () => {
	const { isDisabled, handleChangeCurrent, current } = useNotes()

	return (
		<>
			<TextInput
				mb={20}
				name='title'
				value={current?.title || ''}
				onChange={handleChangeCurrent}
				size='lg'
				disabled={isDisabled}
			/>
			<Textarea
				mb={20}
				name='content'
				size='lg'
				minRows={15}
				value={current?.content || ''}
				onChange={handleChangeCurrent}
				disabled={isDisabled}
			/>
		</>
	)
}

export default Note
