import "./card.scss";
import Purchase from "@components/elements/purchase";
import Image from "@components/ui/image";

import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
// import { canIncrease } from "../../../store/reducers/product";

function Card({
	imgSrc,
	imgAlt,
	title = "Заголовок карточки по-умолчанию",
	description = "Описание карточки по-умолчанию",
	price,
	portion,
	units,
	productId,
	cardSaveHandler,
	cardCancelHandler,
}) {
	const navigate = useNavigate();

	const shopcartData = useSelector((state) => state.shopcart.data);

	let reachMax;
	shopcartData.forEach((element) => {
		if (element.productId === productId) {
			reachMax = element.reachedMax;
		}
	});

	function goToProduct() {
		navigate(`/product/${productId}`);
	}

	return (
		<article
			className="card"
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
			<div className="card__mainbar">
				<Image className="card__preview" src={imgSrc} alt={imgAlt ?? title} />
				<h2 className="card__title">{title}</h2>
				<p className="card__description">{description}</p>
			</div>
			<div className="card__footbar">
				<Purchase
					productId={productId}
					price={price}
					portion={portion}
					units={units}
					buttonIcon={reachMax ? "cross" : "plus"}
					purchaseHandler={reachMax ? cardCancelHandler : cardSaveHandler}
				/>
			</div>
		</article>
	);
}

export default Card;
