import "./icon.scss";

function Icon({ type = "font", icon, category, appearance, size, figure }) {
	// let ico = icon ?? category ?? '';
	return (
		<span
			className= 'icon'
			data-category={category}
			data-appearance={appearance}
			data-size={size}
			data-figure={figure}
			data-icon={icon}
		>
		</span>
	);
}

export default Icon;
