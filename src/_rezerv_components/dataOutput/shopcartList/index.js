import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
/*  */
import { remove } from "@store/reducers/shopcart";
/*  */
import CardDesired from "@components/cards/cardDesired";
/*  */
import "./shopcartList.scss";

function ShopcartList() {
	const cname = "shopcartlist";
	const shopcartData = useSelector((state) => state.shopcart.data);
	const dispatch = useDispatch();
	return (
		<div className={`${cname}`}>
			{shopcartData.length !== 0 ? (
				<div className={`${cname}__body`}>
					{shopcartData.map((item, idx) => {
						return (
							<CardDesired
								key={uuidv4()}
								productId={item.productId}
								imgSrc={item.imgPreviewSrc}
								title={item.title}
								price={item.price}
								portion={item.portion}
								units={item.units}
								amount={item.amount}
								purchaseCancelHandler={() => dispatch(remove(item))}
							/>
						);
					})}
				</div>
			) : (
				<div className={`${cname}__notifybar`}>
					<span className={`${cname}__notify`}>Корзина пуста</span>
				</div>
			)}
		</div>
	);
}

export default ShopcartList;
