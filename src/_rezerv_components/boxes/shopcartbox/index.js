import "./shopcartbox.scss";
import Button from "@components/ui/button";
import Amount from "@components/particles/amount";
import Price from "@components/particles/price";

import { useSelector } from "react-redux";

const ShopCartBox = ({ currency, linkTo = "/shopcart" }) => {
	const totalAmount = useSelector((state) => state.shopcart.totalAmount);
	const totalPrice = useSelector((state) => state.shopcart.totalPrice);
	
	return (
		<div className="shopcartbox">
			<div className="shopcartbox__mainbar">
				<Amount value={totalAmount} />
				<div className="shopcartbox__pricesum">
					<span>на сумму</span>
					<Price value={totalPrice} currency={currency} />
				</div>
			</div>
			<div className="shopcartbox__ctrlsbar">
				<Button link="true" to={linkTo} icon="shopcart" appearance="shopcart" figure="circle" />
			</div>
		</div>
	);
};

export default ShopCartBox;
