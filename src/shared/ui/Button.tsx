import { Button, ButtonProps } from '@mantine/core'

const AppButton = (props: ButtonProps & { onClick: () => void }) => {
	return <Button {...props} />
}

export default AppButton
