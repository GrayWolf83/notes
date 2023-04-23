import { Text, Modal, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useNotes } from '~/entities/context'
import { DeleteIcon } from '~/shared/icons'
import { Button } from '~/shared/ui'

const DeleteNoteFeature = () => {
	const { current, removeNote } = useNotes()
	const [opened, { open, close }] = useDisclosure(false)

	const handleClick = () => {
		removeNote()
		close()
	}

	return (
		<>
			<Modal
				opened={opened}
				onClose={close}
				title={
					<Text fz='xl' fw='bold'>
						Удаление записи
					</Text>
				}>
				<Text>Подтвердите удаление записи</Text>
				<Group mt={20} position='right'>
					<Button onClick={close} color='gray'>
						Отмена
					</Button>
					<Button onClick={handleClick} color='red'>
						Удалить
					</Button>
				</Group>
			</Modal>
			<Button
				variant='default'
				radius='md'
				onClick={open}
				children={<DeleteIcon width={14} height={14} />}
				disabled={current?.id === 'new'}
			/>
		</>
	)
}

export default DeleteNoteFeature
