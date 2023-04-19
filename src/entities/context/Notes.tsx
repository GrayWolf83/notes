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
import { useAlert } from './Alert'
import { useAuth } from './Auth'

interface NotesProps {
	notes: any[]
	loading: boolean
	isDisabled: boolean
	current: INote
	setCurrent: Dispatch<SetStateAction<INote>>
	handleChangeCurrent: (e: {
		target: HTMLInputElement | HTMLTextAreaElement
	}) => void
	saveNote: () => void
	editNote: (val?: boolean) => void
	removeNote: () => void
}

const newNote = {
	id: 'new',
	title: 'Новая заметка',
	content: '',
	created: String(Date.now()),
}

const notesDefaultValue: NotesProps = {
	notes: [],
	current: newNote,
	loading: false,
	isDisabled: true,
	setCurrent: () => {},
	handleChangeCurrent: () => {},
	saveNote: () => {},
	editNote: () => {},
	removeNote: () => {},
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
	const { isDisabled, editNote } = useDisableEditNote()
	const { email } = useAuth()
	const navigate = useNavigate()
	const { setAlert } = useAlert()

	const handleChangeCurrent = (e: {
		target: HTMLInputElement | HTMLTextAreaElement
	}) => {
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
		} catch (error: any) {
			setAlert({
				title: error?.code,
				message: error?.message,
				color: 'red',
			})
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
				if (!current.title || !current.content) {
					setAlert({
						title: 'Изменение заметки',
						message:
							'Заполните поля заголовка и содержания заметки!',
						color: 'red',
					})
					return
				}

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
				setAlert({
					title: 'Сохранение заметки',
					message: 'Заметка успешно сохранена!',
					color: 'green',
				})
				navigate('/new')
			}
		} catch (error: any) {
			setAlert({
				title: error?.code,
				message: error?.message,
				color: 'red',
			})
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
				setAlert({
					title: 'Удаление заметки',
					message: 'Заметка успешно удалена!',
					color: 'green',
				})
				navigate('/new')
			}
		} catch (error) {
		} finally {
			setLoading(false)
		}
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
				isDisabled,
				current,
				setCurrent,
				handleChangeCurrent,
				editNote,
				removeNote,
				saveNote,
			}}>
			{props.children}
		</Notes.Provider>
	)
}
