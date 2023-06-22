import "./_init.scss";

const ControlsGrid = ({ children, layoutPrefix, modificator, position }) => {
	const cname = "ctrlsgrid";
	const layoutPrefixPrepared = layoutPrefix ? ` ${layoutPrefix}__${cname}` : "";
	const positionPrepared = position ? ` ${cname}--${position}` : "";
	const modificatorPrepared = modificator ? ` ${cname}--${modificator}` : "";
	return (
		<div className={`${cname}${layoutPrefixPrepared}${positionPrepared}${modificatorPrepared}`}>
			<div className="ctrlslot">{children}</div>
		</div>
	);
};

export { ControlsGrid };
