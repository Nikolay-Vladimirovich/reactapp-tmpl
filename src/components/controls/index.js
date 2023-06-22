import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
/*  */
import { checkoutAll } from "@store/reducers/shopcart";
import { useAuth } from "@hooks/useAuth";
/*  */
import Button from "../ui/button";
import "./controls.scss";

function ControlNavigateBack() {
	const navigate = useNavigate();

	return (
		<Button
			// link="true"
			// to="/"
			icon="arrowleft"
			figure="circle"
			size="small"
			appearance="shopcart"
			clickHandler={() => navigate(-1)}
		/>
	);
}

function ControlNavigateHome() {
	return (
		<Button
			link="true"
			// to="/"
			icon="arrowleft"
			figure="circle"
			size="small"
			appearance="shopcart"
		/>
	);
}

function ControlAuth() {
	const { signout } = useAuth();
	return (
		<Button
			caption="Выйти"
			figure="square"
			// icon='shopcart'
			appearance="auth"
			clickHandler={signout}
		/>
	);
}

function ControlShopcartCheckout() {
	const dispatch = useDispatch();
	return (
		<Button
			caption="Оформить заказ"
			figure="square"
			// icon='shopcart'
			appearance="shopcart"
			clickHandler={() => dispatch(checkoutAll())}
			
		/>
	);
}

export { ControlNavigateBack, ControlNavigateHome, ControlAuth, ControlShopcartCheckout };
