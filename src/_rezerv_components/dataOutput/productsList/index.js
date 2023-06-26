import { useState, useEffect, memo } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
/*  */
import { add, remove } from "@store/reducers/shopcart";
import { ProductsService } from "@services/products.service";
/*  */
import Card from "@components/cards/card";
import Preloader from "@components/ui/preloader";
/*  */
import "./productsList.scss";

const ProductsList = memo(() => {
	const cname = "productslist";
	const [productsDataLoaded, setProductsDataLoaded] = useState([]);
	const [preloader, setPreoader] = useState(Preloader);
	useEffect(() => {
		const allHomePageData = ProductsService.getAllHomePage();
		setPreoader(null);
		setProductsDataLoaded(allHomePageData);
	}, []);
	const dispath = useDispatch();

	return (
		<div className={cname}>
			{preloader}
			{productsDataLoaded.length !== 0 ? (
				<div className={`${cname}__body`}>
					{productsDataLoaded.map((item, idx) => {
						return (
							<Card
								key={uuidv4()}
								productId={item.productId}
								imgSrc={item.imgPreviewSrc}
								title={item.title}
								description={item.description}
								price={item.price}
								portion={item.portion}
								units={item.units}
								cardSaveHandler={() => dispath(add(item))}
								cardCancelHandler={() => dispath(remove(item))}
							/>
						);
					})}
				</div>
			)  : !preloader ? (
				<div className={`${cname}__notifybar`}>
					<span className={`${cname}__notify`}>Ничего не найдено</span>
				</div>
			) : (
				""
			)}
		</div>
	);
});

export default ProductsList;
