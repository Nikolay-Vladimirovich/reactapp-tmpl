import "./cardDesired.scss";
import PurchaseCancel from "@components/elements/purchasecancel";
import Image from "@components/ui/image";

import { useNavigate } from "react-router-dom";

function CardDesired({
	productId,
	imgSrc,
	imgAlt,
	title = "Заголовок карточки по-умолчанию",
	price,
	portion,
	units,
	amount,
	purchaseCancelHandler,
}) {
	const navigate = useNavigate();
	function goToProduct() {
		navigate(`/product/${productId}`);
	}
	return (
		<article
			className="carddesired"
			tabIndex={"0"}
			onClick={() => {
				goToProduct();
			}}
			onKeyDown={(e) => {
				if (e.code === "Space" || e.code === "Enter") {
					e.preventDefault();
					e.stopPropagation();
					goToProduct();
				}
			}}
		>
			<div className="carddesired__previewbar">
				<Image className="carddesired__preview" src={imgSrc} alt={imgAlt ?? title} />
			</div>
			<div className="carddesired__titlebar">
				<h2 className="carddesired__title">{title}</h2>
			</div>
			<div className="carddesired__ctrlsbar">
				<PurchaseCancel
					price={price}
					portion={portion}
					units={units}
					amount={amount}
					purchaseCancelHandler={purchaseCancelHandler}
				/>
			</div>
		</article>
	);
}

export default CardDesired;
