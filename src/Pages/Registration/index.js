import { Template } from "@template/template";
import { SignModal } from "@components/built-modals/signmodal/modern";
import { SignForm } from "@components/built-forms/signform/modern";

const RegPage = ({ title }) => {
	document.title = title + (global.siteName ? " | " + global.siteName : "");
	return (
		<Template modificator="sign">
			<SignModal titleText="Регистрация" upperLinkText="Авторизоваться" upperLinkTo="/auth">
				<SignForm submitCaption="Регистрация" id="reg-form" validateType="reg" />
			</SignModal>
		</Template>
	);
};

export default RegPage;
