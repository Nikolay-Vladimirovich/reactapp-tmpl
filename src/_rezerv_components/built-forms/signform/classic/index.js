import { useEffect, useRef } from "react";
import { useNavigate /* , useLocation */ } from "react-router-dom";
/*  */
import { useAuth } from "@hooks/useAuth";
// import "./signform.scss";
import { FldTXT, FldCB, BtnSubmit } from "@components/ui/form-controls/theme-classic";
import { FormGrid } from "@components/layouts/forms/classic";
import { FldsGrid } from "@components/layouts/fieldsets/classic";
import { ControlsGrid } from "@components/layouts/controls/classic";
/*  */
import LocalUserRegistration from "@js/classes/LocalUserRegistration";
import LocalUserAuth from "@js/classes/LocalUserAuth";
import FormValidate from "@js/classes/FormValidate";
/*  */
const SignForm = ({
	id,
	children,
	ctrls,
	ctrlsAlign = "center",
	submitCaption = "Отправить",
	validateType,
	layoutPrefix,
	modificator,
}) => {
	const cname = "signform";
	const layoutPrefixPrepared = layoutPrefix ? ` ${layoutPrefix}__${cname}` : "";
	// const positionPrepared = position ? ` ${cname}--${position}` : "";
	const modificatorPrepared = modificator ? ` ${cname}--${modificator}` : "";
	/*  */
	const navigate = useNavigate();
	const { signin } = useAuth();
	// const location = useLocation(); // * Если после успешной авторизации хотим переходить на страницу, адрес
	// const fromPage = location.state?.from?.pathname || "/"; // * которой ввели в строке браузера до редиректа.
	const fromPage = "/"; // * Всегда после успешной авторизации переходим на указанную страницу.
	/*  */
	const formRef = useRef(null);
	const formValidateRef = useRef(null);
	const formSubmitterRef = useRef(null);
	const handlerSubmitRef = useRef(null);
	/*  */
	useEffect(() => {
		switch (validateType) {
			case "reg":
				formValidateRef.current = new FormValidate(formRef.current);
				formSubmitterRef.current = new LocalUserRegistration(formRef.current, {
					validateReference: formValidateRef.current,
				});
				break;
			case "auth":
			default:
				formValidateRef.current = new FormValidate(formRef.current, {
					actionType: "auth",
				});
				formSubmitterRef.current = new LocalUserAuth(formRef.current, {
					validateReference: formValidateRef.current,
				});
		}
	}, [validateType]);

	switch (validateType) {
		case "reg":
			handlerSubmitRef.current = (e) => {
				e.preventDefault();
				formValidateRef.current.validateForm();
				if (formValidateRef.current.isValid()) {
					formSubmitterRef.current.formSubmit(e);
				}
			};
			break;
		case "auth":
		default:
			handlerSubmitRef.current = (e) => {
				e.preventDefault();
				const isSuccessAuth = formSubmitterRef.current.checkUserData();
				formValidateRef.current.validateForm(isSuccessAuth);
				if (formValidateRef.current.isValid(isSuccessAuth)) {
					formSubmitterRef.current.formSubmit(e);
					const authUser = formSubmitterRef.current.getCurrentAuthUser();
					signin(authUser, () => navigate(fromPage, { replace: true }));
				}
			};
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
					layoutPrefix: "sign",
					modificator: "classic",
				}}
				placeFootbar={
					<ControlsGrid position={ctrlsAlign}>
						{ctrls ? ctrls : <BtnSubmit caption={submitCaption} />}
					</ControlsGrid>
				}
			>
				{children ? (
					children
				) : (
					<FldsGrid>
						<FldTXT
							type={"email"}
							validType={"email"}
							labelText={"Email"}
							id={"reg-email"}
							name={"email"}
							required={true}
							placeholder={"Введите email"}
						/>
						<FldTXT
							type={"password"}
							validType={"password"}
							labelText={"Пароль"}
							id={"reg-password"}
							name={"password"}
							required={true}
							placeholder={"Введите пароль"}
						/>
						<FldCB
							labelText={"Я согласен получать обновления на почту"}
							id={"reg-agreement"}
							name={"agreement"}
							required={true}
							placeholder={"Введите пароль"}
						/>
					</FldsGrid>
				)}
			</FormGrid>
		</form>
	);
};

export { SignForm };
