import "./amount.scss";

function Amount({ value = "--", units }) {
	let unitsFormatted = morph(value);
	function morph(int, array) {
		return (
			(array = array || ["товар", "товара", "товаров"]) &&
			array[
				int % 100 > 4 && int % 100 < 20 ? 2 : [2, 0, 1, 1, 1, 2][int % 10 < 5 ? int % 10 : 5]
			]
		);
	}

	return (
		<span className="amount">
			<span className="amount__value">{value}</span>
			<span className="amount__units">{unitsFormatted}</span>
		</span>
	);
}

export default Amount;
