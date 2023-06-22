import "./btn/_init.scss";
import "./fld/_init.scss";
import "./fld-cb/_init.scss";
import "./fld-txt/_init.scss";
// import Icon from "../icon";
// import { Link } from "react-router-dom";

const FldTXT = ({ type = "text", id, name, labelText, placeholder, required, validType }) => {
	const cname = "fld";
	// const isTextFormat = ["text", "email"].some((el) => el === type);
	// const preparedModificator = isTextFormat ? ` ${cname}--txt` : ``;
	const preparedModificator = ` ${cname}--txt`;
	return (
		<div className={`${cname}${preparedModificator}`}>
			{labelText ? (
				<label className="label" htmlFor={id}>
					{labelText}
				</label>
			) : (
				""
			)}
			<input
				className="input"
				placeholder={placeholder}
				type={type}
				data-valid-type={validType}
				name={name}
				id={id}
				required={required}
			/>
		</div>
	);
};
const FldCB = ({ id, name, labelText, placeholder, required, validType = "checkbox" }) => {
	const cname = "fld";
	// const isTextFormat = ["text", "email"].some((el) => el === type);
	// const preparedModificator = isTextFormat ? ` ${cname}--txt` : ``;
	const preparedModificator = ` ${cname}--cb`;
	return (
		<div className={`${cname}${preparedModificator}`}>
			<input
				className="input"
				placeholder={placeholder}
				type="checkbox"
				data-valid-type={validType}
				name={name}
				id={id}
				required={required}
			/>
			<label className="label" htmlFor={id}>
				{labelText}
			</label>
		</div>
	);
};
const BtnSubmit = ({ caption = "Текст на пнопке" }) => {
	const cname = "btn-submit";
	// const isTextFormat = ["text", "email"].some((el) => el === type);
	// const preparedModificator = isTextFormat ? ` ${cname}--txt` : ``;
	// const preparedModificator = ` ${cname}--cb`;
	return (
		<button className={cname} type="submit">
			{caption}
		</button>
	);
};

export { FldTXT, FldCB, BtnSubmit };
