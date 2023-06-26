import Button from "@components/ui/button";
import Price from "@components/particles/price";
import Portion from "@components/particles/portion";
/*  */
import "./purchase.scss";

function Purchase({
	price,
	portion,
	currency,
	units,
	buttonAppearance,
	buttonSize = "small",
	buttonFigure = "circle",
	buttonIcon = "plus",
	buttonIconPosition,
	buttonCaption,
	// productId,
	purchaseHandler,
	bem={}
}) {
	const cname = "purchase";
	const layoutPrefixPrepared = bem?.layoutPrefix ? ` ${bem?.layoutPrefix}__${cname}` : "";
	const modificatorPrepared = bem?.modificator ? ` ${cname}--${bem?.modificator}` : "";

	return (
		<div className={`${cname}${layoutPrefixPrepared}${modificatorPrepared}`}>
			<div className="purchase__cost">
				<Price value={price} currency={currency} />
				<div className="purchase__separator">/</div>
				<Portion value={portion} units={units} />
			</div>
			<div className="purchase__ctrl">
				<Button
					appearance={buttonAppearance}
					icon={buttonIcon}
					iconPosition={buttonIconPosition}
					caption={buttonCaption}
					size={buttonSize}
					figure={buttonFigure}
					clickHandler={purchaseHandler}
				/>
			</div>
		</div>
	);
}

export default Purchase;
