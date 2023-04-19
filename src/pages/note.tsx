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
			if (editNote && setCurrent) {
				setCurrent(currentNote)
				editNote(true)
			}
		}
	}, [noteId])

	const handleChange = (e: any) => {
		if (handleChangeCurrent) {
			handleChangeCurrent(e)
		}
	}

	return (
		<>
			<TextInput
				mb={20}
				name='title'
				value={current?.title || ''}
				onChange={handleChange}
				size='lg'
				disabled={isDisabled}
			/>
			<Textarea
				mb={20}
				name='content'
				size='lg'
				minRows={15}
				value={current?.content || ''}
				onChange={handleChange}
				disabled={isDisabled}
			/>
		</>
	)
}

export default Note
