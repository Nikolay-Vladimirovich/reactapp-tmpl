import { createSlice } from "@reduxjs/toolkit";
import productsInfoDB from "@data/productsInfoDB";
// JSON-БД с детальной информацией по каждому товару
import productsLimitDB from "@data/productsLimitDB";
// JSON-БД с информацией о лимитах наколичество заказов для каждого товара. Для ограничения кол-ва добавлений в корзину.
import ShopcartHelper from "@js/classes/ShopcartHelper.js";
// Вспомогательный JS-класс для управления данным корзины в локальном хранилище

let shopcartHelper = new ShopcartHelper({
	infoDB: productsInfoDB,
	// Подключаем JSON-БД с детальной информацией по каждому товару к вспомогательному JS-классу
	// для последующей связи между этой БД и строкой-массивом в хранилище, которую формирует данный JS-класс
	limitDB: productsLimitDB, // Подключаем JSON-БД с информацией об условии заказа товаров,
	// Товаров в этой БД я указал для каждого вида по одному. В этой базе можно указать любое число или 'unlimit'.
	// Таким образом я обеспечил выполнение условия ТЗ итоговой аттестации, не нарушая нормальной логики.
	// Ведь мы должны ограничиваться не одним товаром, а тем количеством , каким пожелает адиминстратор сайта.
	primaryKey: 'productId',
});

const initialState = {
	data: shopcartHelper.getAll(),
	totalAmount: shopcartHelper.amountTotal(),
	totalPrice: shopcartHelper.priceTotal(),
};

export const shopcartSlice = createSlice({
	name: "shopcart",
	initialState,
	reducers: {
		checkoutAll: (state, item) => {
			if (state.totalAmount) {
				let confirmation = window.confirm(
					`Уверены, что хотите завершить покупки?`,
				);
				if (confirmation) {
					shopcartHelper.clearAll();
					alert(
						`Заказ оформлен и уже готовится. Заказов: ${state.totalAmount}, на сумму ${state.totalPrice} рублей`,
					);
					state.totalAmount = 0;
					state.totalPrice = 0;
					state.data = [];
				}
			}
		},
		add: (state, item) => {
			shopcartHelper.save(item.payload);
			state.totalAmount = shopcartHelper.amountTotal();
			state.totalPrice = shopcartHelper.priceTotal();
			state.data = shopcartHelper.getAll();
		},
		remove: (state, item) => {
			shopcartHelper.delete(item.payload);
			state.totalAmount = shopcartHelper.amountTotal();
			state.totalPrice = shopcartHelper.priceTotal();
			state.data = shopcartHelper.getAll();
		},
	},
});
export const { add, remove, checkoutAll } = shopcartSlice.actions;
export default shopcartSlice.reducer;
