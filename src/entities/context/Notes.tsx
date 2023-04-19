import {
	ReactNode,
	useEffect,
	useState,
	useContext,
	Dispatch,
	SetStateAction,
} from 'react'
import { createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import { notesService } from '~entities/api'
import { useDisableEditNote } from '~entities/hooks'
import { INote } from '~entities/models/note'
import { useAuth } from './Auth'

interface Error {
	code: string
	message: string
}

interface NotesProps {
	notes: any[]
	loading: boolean
	error: Error | null
	isDisabled: boolean
	current?: INote
	setCurrent?: Dispatch<SetStateAction<INote>>
	handleChangeCurrent?: Dispatch<SetStateAction<Event>>
	saveNote?: () => void
	editNote?: (val?: boolean) => void
	removeNote?: () => void
	removeError?: () => void
}

const notesDefaultValue: NotesProps = {
	notes: [],
	loading: false,
	error: null,
	isDisabled: true,
}

const newNote = {
	id: 'new',
	title: 'Новая заметка',
	content: '',
	created: String(Date.now()),
}

const Notes = createContext<NotesProps>(notesDefaultValue)

export function useNotes() {
	return useContext(Notes)
}

interface NotesProviderProps {
	children: ReactNode
}

export function NotesProvider(props: NotesProviderProps) {
	const [notes, setNotes] = useState<any[]>([newNote])
	const [current, setCurrent] = useState<INote>(newNote)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const { isDisabled, editNote } = useDisableEditNote()
	const { email } = useAuth()
	const navigate = useNavigate()

	const handleChangeCurrent = (e: any) => {
		setCurrent((prev: any) => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	}

	async function getNotes() {
		setLoading(true)
		try {
			const data = await notesService.getList()

			setNotes([newNote, ...data])
		} catch (error) {
		} finally {
			setLoading(false)
		}
	}

	async function saveNote() {
		setLoading(true)

		const id = current?.id === 'new' ? uuid() : current.id

		const note: INote = {
			title: current?.title,
			content: current?.content,
			created: String(Date.now()),
		}
		try {
			if (id) {
				const data = await notesService.create(id, note)

				setNotes((prev) => {
					const hasNote = prev.find((item) => item.id === data.id)
					return hasNote
						? [
								{ ...newNote, created: String(Date.now()) },
								data,
								...prev
									.slice(1)
									.filter((item) => item.id !== data.id),
						  ]
						: [
								{ ...newNote, created: String(Date.now()) },
								data,
								...prev.slice(1),
						  ]
				})
				setCurrent({ ...newNote, created: String(Date.now()) })
				editNote(true)
				navigate('/new')
			}
		} catch (error: any) {
			setError(error)
		} finally {
			setLoading(false)
		}
	}

	async function removeNote() {
		setLoading(true)

		const id = current.id
		try {
			if (id) {
				await notesService.remove(id)
				setNotes((prev) => prev.filter((item) => item.id !== id))
				setCurrent({ ...newNote, created: String(Date.now()) })
				navigate('/new')
			}
		} catch (error) {
		} finally {
			setLoading(false)
		}
	}

	function removeError() {
		setError(null)
	}

	useEffect(() => {
		if (email) {
			getNotes()
		} else {
			setNotes([newNote])
		}
	}, [email])

	return (
		<Notes.Provider
			value={{
				notes,
				loading,
				error,
				isDisabled,
				current,
				setCurrent,
				handleChangeCurrent,
				editNote,
				removeNote,
				saveNote,
				removeError,
			}}>
			{props.children}
		</Notes.Provider>
	)
}
