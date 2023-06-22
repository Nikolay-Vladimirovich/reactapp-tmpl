import "./portion.scss";
function Portion({ value = "--", units = "г." }) {
	return (
		<span className='portion'>
			<span className='portion__value'>{value}</span>
			<span className='portion__units'>{units}</span>
		</span>
	);
}

export default Portion;
