import LocalUserAuth from '@js/classes/LocalUserAuth'
import { createContext, useRef, useState } from 'react'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
	const authControlRef = useRef(new LocalUserAuth())
	const [user, setUser] = useState(authControlRef.current.getCurrentAuthUser())

	const signin = (newUser, cb) => {
		const loadedUser = authControlRef.current.getCurrentAuthUser() ?? newUser
		setUser(loadedUser)
		if (cb) {
			cb()
		}
	}
	const signout = cb => {
		let isExit = window.confirm('Уверены, что хотите выйти?')
		if (isExit) {
			authControlRef.current.logOut()
			setUser(null)
			if (cb) {
				cb()
			}
		}
	}
	const value = { user, signin, signout }

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
