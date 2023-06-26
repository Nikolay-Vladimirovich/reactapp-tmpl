import "./button.scss";
import Icon from "@components/ui/icon";
import { Link } from "react-router-dom";

function Button({
	link = false,
	buttonType,
	to = "/",
	caption,
	category = "primary",
	appearance,
	size = "medium",
	icon,
	iconPosition = "left",
	figure = "rounded",
	clickHandler,
	preventDefault = "true",
	stopPropagation = "true",
}) {
	// let ico = icon ?? category ?? '';
	let captionHTML = caption ? <span className="btn__caption">{caption}</span> : "";
	if (!link) {
		return (
			<button
				type={buttonType}
				className="btn"
				data-category={category}
				data-appearance={appearance}
				data-size={size}
				data-figure={figure}
				onClick={(e) => {
					if (!clickHandler) return;
					if (preventDefault) e.preventDefault();
					if (stopPropagation) e.stopPropagation();
					clickHandler();
				}}
				onKeyDown={(e) => {
					if (!clickHandler) return;
					if (e.code === "Space" || e.code === "Enter") {
						if (preventDefault) e.preventDefault();
						if (stopPropagation) e.stopPropagation();
						clickHandler();
					}
				}}
			>
				<span className="btn__helper">
					{iconPosition === "left" ? icon ? <Icon icon={icon} /> : "" : ""}
					{captionHTML}
					{iconPosition === "right" ? icon ? <Icon icon={icon} /> : "" : ""}
				</span>
			</button>
		);
	} else {
		return (
			<Link
				className="btn"
				data-category={category}
				data-appearance={appearance}
				data-size={size}
				data-figure={figure}
				to={to}
				// onClick={()=>{clickHandler()}}
			>
				<span className="btn__helper">
					{iconPosition === "left" ? icon ? <Icon icon={icon} /> : "" : ""}
					{captionHTML}
					{iconPosition === "right" ? icon ? <Icon icon={icon} /> : "" : ""}
				</span>
			</Link>
		);
	}
}
export default Button;
