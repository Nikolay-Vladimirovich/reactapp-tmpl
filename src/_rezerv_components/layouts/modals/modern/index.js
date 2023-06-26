import "./_init.scss";
import { ControlsGrid } from "@components/layouts/controls/modern";

function ModalGrid({
	placeUpperbar,
	placeHeadbar,
	upperbarAlign = "end",
	children,
	titleText = "Заголовок по-умолчанию",
	// layoutPrefix,
	bem = {},
}) {
	const cname = "modalgrid";
	const layoutPrefixPrepared = bem?.layoutPrefix ? ` ${bem?.layoutPrefix}__${cname}` : "";
	const modificatorPrepared = bem?.modificator ? ` ${cname}--${bem?.modificator}` : "";

	return (
		<div className={`${cname}${layoutPrefixPrepared}${modificatorPrepared}`}>
			<div className={`${cname}__helper`}>
				<div className={`upperbar ${cname}__upperbar`}>
					<ControlsGrid position={upperbarAlign}>{placeUpperbar}</ControlsGrid>
				</div>
				<div className={`${cname}__headbar`}>
					{placeHeadbar ? placeHeadbar : <h3 className="title">{titleText}</h3>}
				</div>
				<div className={`${cname}__mainbar`}>{children}</div>
			</div>
		</div>
	);
}

export { ModalGrid };
