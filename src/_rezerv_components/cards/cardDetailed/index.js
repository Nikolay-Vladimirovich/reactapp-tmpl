import "./cardDetailed.scss";
import Purchase from "@components/elements/purchase";
import Image from "@components/ui/image";

import { useSelector } from "react-redux";
// import { useState, useEffect } from "react";

// let r = 0;
function CardDetailed({
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
	// r = r + 1;
	// console.log(r);
	const shopcartData = useSelector((state) => state.shopcart.data);

	let reachMax;
	shopcartData.forEach((element) => {
		if (element.productId === productId) {
			reachMax = element.reachedMax;
		}
	});

	return (
		<article className="carddetailed">
			<div className="carddetailed__previewbar">
				<Image className="carddetailed__preview" src={imgSrc} alt={imgAlt ?? title} />
			</div>
			<div className="carddetailed__headbar">
				<h2 className="carddetailed__title">{title}</h2>
			</div>
			<div className="carddetailed__mainbar">
				<p className="carddetailed__description">{description}</p>
			</div>
			<div className="carddetailed__footbar">
				<Purchase
					bem={{
						modificator: "carddetailed",
					}}
					productId={productId}
					price={price}
					portion={portion}
					units={units}
					buttonFigure={"square"}
					buttonSize={"medium"}
					buttonAppearance={"shopcart"}
					// buttonIconPosition={"right"}
					buttonIcon={""}
					buttonCaption={reachMax ? "Удалить" : "В корзину"}
					purchaseHandler={reachMax ? cardCancelHandler : cardSaveHandler}
				/>
			</div>
		</article>
	);
}

export default CardDetailed;
