import { TextInput, Button, Group, Box, PasswordInput } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { FormField } from '~entities/components'
import { useAuth } from '~entities/context'
import { Title } from '~shared/ui'

const initialValues = {
	email: '',
	password: '',
}

const validate = {
	email: (value: string) =>
		/^\S+@\S+$/.test(value) ? null : 'Invalid email',
	password: (value: string) => {
		if (!Boolean(value)) {
			return 'Поле обязательно для заполнения'
		}

		if (value.length < 6) {
			return 'Длина пароля не менее 6 символов'
		}

		return null
	},
}

interface SigninWidgetProps {
	setIsLogin: (value: boolean) => void
}

const SigninWidget = ({ setIsLogin }: SigninWidgetProps) => {
	const { signin, loading } = useAuth()
	const navigate = useNavigate()

	const handleLogin = (values: typeof initialValues) => {
		signin(values, () => navigate('/'))
	}

	return (
		<Box maw={300} mx='auto' pt={200}>
			<Title order={3} align='center'>
				Авторизация
			</Title>

			<FormField
				initialValues={initialValues}
				validateSchema={validate}
				loading={loading}
				btnSubmitLabel='Отправить'
				onSubmit={handleLogin}>
				<TextInput
					mb={20}
					withAsterisk
					label='Email'
					name='email'
					placeholder='your@email.com'
				/>

				<PasswordInput
					withAsterisk
					label='Password'
					name='password'
					placeholder='password'
				/>
			</FormField>

			<Group position='right' mt='md'>
				<Button
					color='gray'
					type='submit'
					variant='subtle'
					onClick={() => setIsLogin(false)}>
					Регистрация
				</Button>
			</Group>
		</Box>
	)
}

export default SigninWidget
