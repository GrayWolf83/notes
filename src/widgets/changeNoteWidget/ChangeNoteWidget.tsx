import { Flex } from '@mantine/core'
import { DeleteNoteFeature } from '~features/deleteNoteFeature'
import { EditNoteFeature } from '~features/editNoteFeature'
import { SaveNoteFeature } from '~features/saveNoteFeature'

const ChangeNoteWidget = () => {
	return (
		<Flex align='center' gap={5}>
			<EditNoteFeature />
			<SaveNoteFeature />
			<DeleteNoteFeature />
		</Flex>
	)
}

export default ChangeNoteWidget
