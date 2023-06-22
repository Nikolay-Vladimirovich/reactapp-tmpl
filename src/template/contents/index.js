// import ShopCartBox from "../components/boxes/shopcartbox";
import "./contents.scss";

const HeaderContent = ({ placeStart, placeTitle, titleText, placeEnd, children, modificator }) => {
	const cname = "headercontent";
	const modificatorPrepared = modificator ? ` ${cname}--${modificator}` : "";
	return (
		<div className={`${cname}${modificatorPrepared}`}>
			{placeStart ? (
				<div className={`${cname}__place ${cname}__place--start`}>{placeStart}</div>
			) : (
				""
			)}

			<div className={`${cname}__place ${cname}__place--title`}>
				{placeTitle ? placeTitle : titleText ? <h1 className="title">{titleText}</h1> : ""}
			</div>

			{children ? (
				<div className={`${cname}__place ${cname}__place--children`}>
					{/* <ShopCartBox /> */}
					{children}
				</div>
			) : (
				""
			)}
			{placeEnd ? <div className={`${cname}__place ${cname}__place--end`}>{placeEnd}</div> : ""}
		</div>
	);
};

const MainContent = ({ children, modificator }) => {
	const cname = "maincontent";
	const modificatorPrepared = modificator ? ` ${cname}--${modificator}` : "";
	return <div className={`${cname}${modificatorPrepared}`}>{children}</div>;
};

const FooterContent = ({ placeSummary, placeCtrls, children, modificator }) => {
	const cname = "footercontent";
	const modificatorPrepared = modificator ? ` ${cname}--${modificator}` : "";
	return (
		<div className={`${cname}${modificatorPrepared}`}>
			<div className={`${cname}__place ${cname}__place--summary`}>
				{placeSummary}
			</div>
			<div className={`${cname}__place ${cname}__place--ctrls`}>
				{placeCtrls}
			</div>
		</div>
	);
};

export { HeaderContent, MainContent, FooterContent };
