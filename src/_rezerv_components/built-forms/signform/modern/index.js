import FormValidate from '@js/classes/FormValidate'
import LocalUserAuth from '@js/classes/LocalUserAuth'

/*  */
import LocalUserRegistration from '@js/classes/LocalUserRegistration'
import { useEffect, useRef } from 'react'
import {
	useNavigate
	/* , useLocation */
} from 'react-router-dom'

/*  */
import { useAuth } from '@hooks/useAuth'

import { ControlsGrid } from '@components/layouts/controls/modern'
import { FldsGrid } from '@components/layouts/fieldsets/modern'
import { FormGrid } from '@components/layouts/forms/modern'
import { BtnSubmit, FldCB, FldTXT } from '@components/ui/form-controls/theme-modern'

import './signform.scss'

/*  */

const SignForm = ({
	id,
	children,
	ctrls,
	ctrlsAlign = 'center',
	submitCaption = 'Отправить',
	validateType,
	layoutPrefix,
	modificator
}) => {
	const cname = 'signform'
	const layoutPrefixPrepared = layoutPrefix ? ` ${layoutPrefix}__${cname}` : ''
	// const positionPrepared = position ? ` ${cname}--${position}` : "";
	const modificatorPrepared = modificator ? ` ${cname}--${modificator}` : ''
	/*  */
	const navigate = useNavigate()
	const { signin } = useAuth()
	// const location = useLocation(); // * Если после успешной авторизации хотим переходить на страницу, адрес
	// const fromPage = location.state?.from?.pathname || "/"; // * которой ввели в строке браузера до редиректа.
	const fromPage = '/' // * Всегда после успешной авторизации переходим на указанную страницу.
	/*  */
	const formRef = useRef(null)
	const formValidateRef = useRef(null)
	const formSubmitterRef = useRef(null)
	const handlerSubmitRef = useRef(null)
	const specialOutputRef = useRef(null)
	// console.log(specialOutputRef.current);
	/*  */
	useEffect(() => {
		// console.log(specialOutputRef.current);
		switch (validateType) {
			case 'reg':
				formValidateRef.current = new FormValidate(formRef.current)
				formSubmitterRef.current = new LocalUserRegistration(formRef.current, {
					validateReference: formValidateRef.current,
					uniqueFld: 'login'
				})
				break
			case 'auth':
			default:
				formValidateRef.current = new FormValidate(formRef.current, {
					actionType: 'auth',
					specialOutputObj: specialOutputRef.current
				})
				formSubmitterRef.current = new LocalUserAuth(formRef.current, {
					validateReference: formValidateRef.current,
					uniqueFld: 'login'
				})
		}
	}, [validateType])

	switch (validateType) {
		case 'reg':
			handlerSubmitRef.current = e => {
				e.preventDefault()
				formValidateRef.current.validateForm()
				if (formValidateRef.current.isValid()) {
					formSubmitterRef.current.formSubmit(e)
				}
			}
			break
		case 'auth':
		default:
			handlerSubmitRef.current = e => {
				e.preventDefault()
				const isSuccessAuth = formSubmitterRef.current.checkUserData()
				formValidateRef.current.validateForm(isSuccessAuth)
				if (formValidateRef.current.isValid(isSuccessAuth)) {
					formSubmitterRef.current.formSubmit(e)
					const authUser = formSubmitterRef.current.getCurrentAuthUser()
					signin(authUser, () => navigate(fromPage, { replace: true }))
				}
			}
	}

	return (
		<form
			className={`${cname}${layoutPrefixPrepared}${modificatorPrepared}`}
			id={id}
			ref={formRef}
			onSubmit={handlerSubmitRef.current}
		>
			<FormGrid
				bem={{
					layoutPrefix: 'sign',
					modificator: 'modern'
				}}
				placeFootbar={
					<>
						<div ref={specialOutputRef} className={`summary-msg ${cname}__summary-msg`}></div>
						<ControlsGrid position={ctrlsAlign}>
							{ctrls ? ctrls : <BtnSubmit caption={submitCaption} />}
						</ControlsGrid>
					</>
				}
			>
				{children ? (
					children
				) : (
					<FldsGrid>
						<FldTXT
							type={'text'}
							validType={'login'}
							// labelText={"Логин"}
							id={'reg-login'}
							name={'login'}
							required={true}
							placeholder={'Логин'}
						/>
						<FldTXT
							type={'password'}
							validType={'password'}
							// labelText={"Пароль"}
							id={'reg-password'}
							name={'password'}
							required={true}
							placeholder={'Пароль'}
						/>
						<FldCB
							labelText={'Я согласен получать обновления на почту'}
							id={'reg-subscribe'}
							name={'subscribe'}
							// required={true}
						/>
					</FldsGrid>
				)}
			</FormGrid>
		</form>
	)
}

export { SignForm }
