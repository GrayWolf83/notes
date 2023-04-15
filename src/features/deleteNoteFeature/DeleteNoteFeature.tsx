import { DeleteIcon } from '~shared/icons'
import { Button } from '~shared/ui'

const DeleteNoteFeature = () => {
	const handleClick = () => {
		console.log('delete note feature')
	}

	return (
		<Button
			variant='default'
			radius='md'
			onClick={handleClick}
			children={<DeleteIcon />}
		/>
	)
}

export default DeleteNoteFeature
