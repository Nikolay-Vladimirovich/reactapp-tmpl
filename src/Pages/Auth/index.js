import { Template } from "@template/template";
import { SignModal } from "@components/built-modals/signmodal/modern";
import { SignForm } from "@components/built-forms/signform/modern";

const AuthPage = ({ title }) => {
	document.title = title + (global.siteName ? " | " + global.siteName : "");

	return (
		<Template modificator="sign">
			<SignModal titleText="Вход" upperLinkText="Зарегистрироваться" upperLinkTo="/reg">
				<SignForm submitCaption="Войти" id="auth-form" validateType="auth" />
			</SignModal>
		</Template>
	);
};

export default AuthPage;
