import { configureStore } from "@reduxjs/toolkit";

import shopcart from "./reducers/shopcart";

export const store = configureStore({
	reducer: {
		shopcart: shopcart,
	},
});
