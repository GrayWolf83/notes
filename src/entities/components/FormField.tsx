import { Button, Group, Loader } from '@mantine/core'
import { useForm } from '@mantine/form'
import React from 'react'

interface FormFieldProps {
	initialValues: object
	onSubmit: (values: any) => void
	validateSchema: object
	btnSubmitLabel: string
	children: React.ReactNode
	loading: boolean
}

const FormField: React.FC<FormFieldProps> = ({
	initialValues,
	validateSchema,
	onSubmit,
	btnSubmitLabel,
	loading,
	children,
	...rest
}) => {
	const form = useForm({
		initialValues,
		validate: validateSchema,
	})

	return (
		<form onSubmit={form.onSubmit((values) => onSubmit(values))} {...rest}>
			{React.Children.map(children, (child: any) => {
				const config = {
					...child.props,
					...form.getInputProps(child.props.name),
				}

				return React.cloneElement(child, config)
			})}

			<Group position='center' mt='md'>
				<Button
					color='gray'
					type='submit'
					disabled={loading}
					leftIcon={
						loading ? <Loader color='dark' size={16} /> : null
					}>
					{btnSubmitLabel}
				</Button>
			</Group>
		</form>
	)
}

export default FormField
