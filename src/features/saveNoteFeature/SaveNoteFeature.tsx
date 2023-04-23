import { useNotes } from '~/entities/context'
import { SaveIcon } from '~/shared/icons'
import { Button } from '~/shared/ui'

const SaveNoteFeature = () => {
	const { saveNote, isDisabled } = useNotes()

	return (
		<Button
			variant='default'
			radius='md'
			onClick={saveNote}
			children={<SaveIcon width={14} height={14} />}
			disabled={isDisabled}
		/>
	)
}

export default SaveNoteFeature
