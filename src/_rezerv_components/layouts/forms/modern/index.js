import "./_init.scss";
const FormGrid = ({
	children,
	placeFootbar,
	// layoutPrefix,
	// modificator,
	bem = {}
}) => {
	const cname = "formgrid";
	// const layoutPrefixPrepared = layoutPrefix ? ` ${layoutPrefix}__${cname}` : "";
	// const modificatorPrepared = modificator ? ` ${cname}--${modificator}` : "";

	const layoutPrefixPrepared = bem?.layoutPrefix ? ` ${bem?.layoutPrefix}__${cname}` : "";
	const modificatorPrepared = bem?.modificator ? ` ${cname}--${bem?.modificator}` : "";

	return (
		<div className={`${cname}${layoutPrefixPrepared}${modificatorPrepared}`}>
			<div className={`${cname}__mainbar`}>
				{children}
			</div>
			<div className={`${cname}__footbar`}>{placeFootbar}</div>
		</div>
	);
};

export { FormGrid };
