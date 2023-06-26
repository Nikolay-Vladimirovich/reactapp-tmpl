import "./init.scss";
// let templateRenderCounter = 0;
const Template = ({ modificator, children }) => {
	return (
		<div className={`template${modificator ? " template--" + modificator : ""}`}>{children}</div>
	);
};
const Header = ({ modificator, children }) => {
	return (
		<header className={`header${modificator ? " header--" + modificator : ""}`}>
			<div className="header__layout">{children}</div>
		</header>
	);
};
const Main = ({ modificator, children }) => {
	return (
		<main className={`main${modificator ? " main--" + modificator : ""}`}>
			<div className="main__layout">{children}</div>
		</main>
	);
};
const Footer = ({ modificator, children }) => {
	return (
		<footer className={`footer${modificator ? " footer--" + modificator : ""}`}>
			<div className="footer__layout">{children}</div>
		</footer>
	);
};
export { Template, Header, Main, Footer };
