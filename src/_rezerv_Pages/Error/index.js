import { Link } from "react-router-dom";

const Error = ({ title }) => {
	document.title = title + (global.siteName ? " | " + global.siteName : "");

	return (
		<div className="">
			404
			<div className="">Страница не найдена</div>
			<Link to={"/"}>перейти на главную страницу</Link>
		</div>
	);
};

export default Error;
