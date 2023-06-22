import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import { store } from "@store";
import { Provider } from "react-redux";

import Auth from "@pages/Auth";
import Reg from "@pages/Registration";
import Products from "@pages/Products";
import ProductDetail from "@pages/ProductDetail";
import Shopcart from "@pages/Shopcart";
import Error from "@pages/Error";

import { RequireAuth, RequireExited } from "@hoc/RequireAuth";
import { AuthProvider } from "@hoc/AuthProvider";

import config from '@config';

global.siteName = config.siteName;

const router = createBrowserRouter([
	{
		path: `/auth`,
		element: (
			<RequireExited>
				<Auth title="Вход" />
			</RequireExited>
		),
	},
	{
		path: `/reg`,
		element: (
			<RequireExited>
				<Reg title="Регистрация" />
			</RequireExited>
		),
	},
	{
		path: `/`,
		element: (
			<RequireAuth>
				<Products title="Главная" />
			</RequireAuth>
		),
	},
	{
		path: `/shopcart`,
		element: (
			<RequireAuth>
				<Shopcart title="Корзина товаров" />
			</RequireAuth>
		),
	},
	{
		path: `/product/:id`,
		element: (
			<RequireAuth>
				<ProductDetail title="Карточка товара" />
			</RequireAuth>
		),
	},
	{
		errorElement: <Error title="Страница ошибки" />,
	},
], {
	basename: config.baseUrl // ! Важно для хостинга!
});
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</Provider>
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
