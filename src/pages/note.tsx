import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { TextInput, Textarea } from '@mantine/core'
import { useNotes } from '~entities/context'

const Note = () => {
	const { noteId } = useParams()
	const {
		notes,
		isDisabled,
		editNote,
		setCurrent,
		handleChangeCurrent,
		current,
	} = useNotes()

	useEffect(() => {
		if (noteId) {
			const currentNote = notes.find((note) => note.id === noteId)

			if (currentNote) {
				setCurrent(currentNote)
				editNote(true)
			}
		}
	}, [noteId])

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
