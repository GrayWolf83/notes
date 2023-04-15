import { useParams } from 'react-router-dom'
import { Title } from '~shared/ui'

const Note = () => {
	const { noteId } = useParams()

	return (
		<>
			<Title order={3} children={'Новая заметка'} />
		</>
	)
}

export default Note
