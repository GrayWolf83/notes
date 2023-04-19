import { useNotes } from '~entities/context'
import { EditIcon } from '~shared/icons'
import { Button } from '~shared/ui'

const EditNoteFeature = () => {
	const { editNote } = useNotes()

	return (
		<Button
			variant='default'
			radius='md'
			onClick={editNote}
			children={<EditIcon width={14} height={14} />}
		/>
	)
}

export default EditNoteFeature
