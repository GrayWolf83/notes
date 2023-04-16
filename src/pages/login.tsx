import { useState } from 'react'
import { SigninWidget } from '~widgets/signinWidget'
import { SignupWidget } from '~widgets/signupWidget'

const Login = () => {
	const [isLogin, setIsLogin] = useState(true)

	return (
		<>
			{isLogin ? (
				<SigninWidget setIsLogin={setIsLogin} />
			) : (
				<SignupWidget setIsLogin={setIsLogin} />
			)}
		</>
	)
}

export default Login
