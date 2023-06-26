import Button from "@components/ui/button";
import "./fld/_init.scss";
import "./fld-cb/_init.scss";
import "./fld-txt/_init.scss";

const FldTXT = ({ type = "text", id, name, labelText, placeholder, required, validType }) => {
	const cname = "fld";
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
	return (
		<Button
			caption={caption}
			figure="square"
			// icon='shopcart'
			appearance="form"
			buttonType="submit"
		/>
	);
};

export { FldTXT, FldCB, BtnSubmit };
