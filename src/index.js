import config from '@config'
import { AuthProvider } from '@hoc/AuthProvider'
import { RequireAuth, RequireExited } from '@hoc/RequireAuth'
// import Products from "@pages/Products";
// import ProductDetail from "@pages/ProductDetail";
// import Shopcart from "@pages/Shopcart";
import Error from '@pages/Error'
// import Auth from "@pages/Auth";
// import Reg from "@pages/Registration";
import Home from '@pages/Home'
import UIButtons from '@pages/UIButtons'
import { store } from '@store'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// My devutils = begin
import './dev-utils/js/dev-utils.js'
import './dev-utils/scss/dev-utils.scss'
// My devutils = end
import reportWebVitals from './reportWebVitals'

global.siteName = config.siteName

const router = createBrowserRouter(
	[
		// {
		// 	path: `/auth`,
		// 	element: (
		// 		<RequireExited>
		// 			<Auth title="Вход" />
		// 		</RequireExited>
		// 	),
		// },
		// {
		// 	path: `/reg`,
		// 	element: (
		// 		<RequireExited>
		// 			<Reg title="Регистрация" />
		// 		</RequireExited>
		// 	),
		// },
		{
			path: `/`,
			element: (
				// <RequireAuth>
				<Home title='Главная' />
				// </RequireAuth>
			)
		},
		{
			path: `/ui-buttons`,
			element: (
				// <RequireAuth>
				<UIButtons title='UIButtons' />
				// </RequireAuth>
			)
		},
		// {
		// 	path: `/shopcart`,
		// 	element: (
		// 		<RequireAuth>
		// 			<Shopcart title="Корзина товаров" />
		// 		</RequireAuth>
		// 	),
		// },
		// {
		// 	path: `/product/:id`,
		// 	element: (
		// 		<RequireAuth>
		// 			<ProductDetail title="Карточка товара" />
		// 		</RequireAuth>
		// 	),
		// },
		{
			errorElement: <Error title='Страница ошибки' />
		}
	],
	{
		basename: config.baseUrl // ! Важно для хостинга!
	}
)
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</Provider>
	</React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
