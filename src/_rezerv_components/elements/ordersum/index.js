import { useSelector } from "react-redux";
/*  */
import Price from "@components/particles/price";
/*  */
import "./ordersum.scss";

function OrderSum({ value, caption = "Заказ на сумму", currency }) {
	const totalPrice = useSelector((state) => state.shopcart.totalPrice)
	return (
		<div className="ordersum">
			<div className="ordersum__content">
				<div className="ordersum__place ordersum__place--caption">
					<span className="ordersum__caption">{caption}:</span>
				</div>
				<div className="ordersum__place ordersum__place--pricesum">
					<Price
						value={totalPrice}
						currency={currency}
						modificator="shopcart"
					/>
				</div>
			</div>
		</div>
	);
}

export default OrderSum;
