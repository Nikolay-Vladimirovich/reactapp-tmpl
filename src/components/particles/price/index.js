import "./price.scss";
function Price({ value = "--", currency = "ru-RU", modificator }) {
	/*  */
	let classB= 'price';
	let classM = modificator ? classB + "--" + modificator : "";
	let classStr = classM
		? classB + " " + classM
		: classB;
	let priceValueFormatted = new Intl.NumberFormat(currency).format(value);
	const currencySign =  currency !== "ru-RU" ? "[знак иностранной валюты]" : "₽";
	/*
	TODO: реализовать выборку знака из готовых наборов знаков валют
	*/
	return (
		<span className={classStr}>
			<span className="price__value">{priceValueFormatted}</span>
			<span className="price__currency">{currencySign}</span>
		</span>
	);
}

export default Price;
