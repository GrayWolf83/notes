import { Flex } from '@mantine/core'
import { DeleteNoteFeature, SaveNoteFeature, EditNoteFeature } from '~/features'

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
