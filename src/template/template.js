import "./init.scss";
// import { refreshScrollbarWidth } from "../js/utils/scrollbar.js";

// import { useLocation } from "react-router-dom";

// let templateRenderCounter = 0;
const Template = ({ modificator, children }) => {
	
	// templateRenderCounter = templateRenderCounter + 1;
	// console.log("templateRenderCounter", templateRenderCounter);

	// const location = useLocation();
	// console.log("location", location.state);

	// TODO: сейчас, из-за установленного расширения spade в chrome на сильном увеличении
	// TODO: выскакивает ошибка "ResizeObserver loop limit exceeded". Надо исправить, т.к. причина тут!
	// ! P.S.: Выячнилось, что не всегда она выскакивает. И вообще только в одном браузере. И даже в нем перестала появляться.
	// ! Поэтому решил раскомментировать этот код.
	// !! P.S. №2: Оказалось эта ошибка появляется после перерендера или если мы в коде поменяли что-то и вернулись в браузер и затем изменили размер окна.
	// ! Поэтому решил закомментирова код опять. Без него ошибки нет!
	// ! Скорее всего все-таки проблема во взаимодействии со сторонним расширением браузера spade в chrome. 
	/* 
	let templateRef = useRef(null);
	useLayoutEffect(() => {		
		refreshScrollbarWidth(templateRef.current);
		window.addEventListener("resize", (e) => {
			refreshScrollbarWidth(templateRef.current);
		});
	}, []); // ? refreshScrollbarWidth необходимо перерасчитвать при изменении масштаба
	 */

	// * Если сделать без useLayoutEffect, вот так:
	// window.addEventListener("load", () => {
	// 	refreshScrollbarWidth(templateRef.current);
	// });
	// window.addEventListener("resize", () => {
	// 	refreshScrollbarWidth(templateRef.current);
	// });
	// * То при переходе обратно со страницы shopcart на products функция refreshScrollbarWidth не будет перевыполняться

	return (
		<div
			// ref={templateRef}

			className={`template${modificator ? " template--" + modificator : ""}`}
		>
			{children}
		</div>
	);
};
const Header = ({ modificator, children }) => {
	return (
		<header className={`header${modificator ? " header--" + modificator : ""}`}>
			<div className="header__layout">{children}</div>
		</header>
	);
};
const Main = ({ modificator, children, templateRef }) => {
	// let mainRef = useRef(null);
	// console.log(mainRef);
	return (
		<main /* ref={mainRef} */ className={`main${modificator ? " main--" + modificator : ""}`}>
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
