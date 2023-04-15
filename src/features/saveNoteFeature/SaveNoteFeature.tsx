import { SaveIcon } from '~shared/icons'
import { Button } from '~shared/ui'

const SaveNoteFeature = () => {
	const handleClick = () => {
		console.log('save note feature')
	}

	return (
		<Button
			variant='default'
			radius='md'
			onClick={handleClick}
			children={<SaveIcon />}
		/>
	)
}

export default SaveNoteFeature
