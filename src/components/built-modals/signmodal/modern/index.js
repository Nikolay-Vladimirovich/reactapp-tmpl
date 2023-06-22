// import "./signmodal.scss";
import { ModalGrid } from "@components/layouts/modals/modern";
import { Link } from "react-router-dom";

const SignModal = ({
	placeUpperbar,
	upperbarAlign = "end",
	children,
	titleText = "Заголовок по-умолчанию",
	upperLinkText = "Текст ссылки по-умолчанию",
	upperLinkTo = "/reg",
	// layoutPrefix,
	// bem = {},
}) => {
	// const cname = "sign";
	// const layoutPrefixPrepared = bem?.layoutPrefix ? ` ${bem?.layoutPrefix}__${cname}` : "";
	// const modificatorPrepared = bem?.modificator ? ` ${cname}--${bem?.modificator}` : "";

	return (
		<>
			<ModalGrid
				upperbarAlign={upperbarAlign}
				placeUpperbar={
					placeUpperbar ? (
						placeUpperbar
					) : (
						<Link className="link" to={upperLinkTo}>
							{upperLinkText}
						</Link>
					)
				}
				titleText={titleText}
				bem={{
					layoutPrefix: "template",
				}}
			>
				{children}
			</ModalGrid>
		</>
	);
};

export { SignModal };
