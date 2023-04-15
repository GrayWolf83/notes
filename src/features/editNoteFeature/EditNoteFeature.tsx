import { EditIcon } from '~shared/icons'
import { Button } from '~shared/ui'

const EditNoteFeature = () => {
	const handleClick = () => {
		console.log('edit note feature')
	}

	return (
		<Button
			variant='default'
			radius='md'
			onClick={handleClick}
			children={<EditIcon />}
		/>
	)
}

export default EditNoteFeature
