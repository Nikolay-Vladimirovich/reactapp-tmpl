import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
/*  */
import { ProductsService } from "@services/products.service";
import { add, remove } from "@store/reducers/shopcart";
/*  */
import CardDetailed from "@components/cards/cardDetailed";
import Preloader from "@components/ui/preloader";
/*  */
import "./productDetailed.scss";

import { useParams } from "react-router-dom";

const ProductDetailed = () => {
	const cname = "productdetailed";
	const { id } = useParams();

	const [productDetailedDataLoaded, setProductDetailedDataLoaded] = useState([]);
	const [preloader, setPreoader] = useState(Preloader);

	useEffect(() => {
		const productDetailedData = ProductsService.getInfoOf(Number(id));
		setPreoader(null);
		setProductDetailedDataLoaded(productDetailedData);
	}, [id]);


	const dispath = useDispatch();
	return (
		<div className={cname}>
			{preloader}
			{productDetailedDataLoaded?.title ? (
				<div className={`${cname}__body`}>
					<CardDetailed
						productId={productDetailedDataLoaded.productId}
						imgSrc={productDetailedDataLoaded.imgFullSrc}
						title={productDetailedDataLoaded.title}
						description={productDetailedDataLoaded.descriptionDetailed}
						price={productDetailedDataLoaded.price}
						portion={productDetailedDataLoaded.portion}
						units={productDetailedDataLoaded.units}
						cardSaveHandler={() => dispath(add(productDetailedDataLoaded))}
						cardCancelHandler={() => dispath(remove(productDetailedDataLoaded))}
					/>
				</div>
			) : !preloader ? (
				<div className={`${cname}__notifybar`}>
					<span className={`${cname}__notify`}>Нет такого товара</span>
				</div>
			) : (
				""
			)}
		</div>
	);
};

export default ProductDetailed;
