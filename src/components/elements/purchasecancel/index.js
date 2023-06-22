import Button from "@components/ui/button";
import Price from "@components/particles/price";
// import Amount from "@components/particles/amount";
/*  */
import "./purchasecancel.scss";

function PurchaseCancel({
	amount,
	price,
	currency,
	buttonIcon = "cross",
	purchaseCancelHandler,
}) {
	const displayAmount = () => {
		if (amount > 1) {
			return (
				<div className="purchasecancel__amount">
					<b>{amount}</b> x{" "}
				</div>
			);
		}
	};
	return (
		<div className="purchasecancel">
			{displayAmount()}
			<div className="purchasecancel__cost">
				<Price value={price} currency={currency} />
			</div>
			<div className="purchasecancel__ctrl">
				<Button
					icon={buttonIcon}
					figure="circle"
					size="small"
					appearance="shopcart"
					clickHandler={purchaseCancelHandler}
				/>
			</div>
		</div>
	);
}

export default PurchaseCancel;
