import productsInfoDB from "@data/productsInfoDB";
import productsHomePageDB from "@data/productsHomePageDB";

export const ProductsService = {
	getAllHomePage() {
		const infoArr = productsInfoDB;
		const homeArr = productsHomePageDB;

		const resultArr = homeArr.map((homeItem) => {
			let obj = {};
			infoArr.forEach((infoItem) => {
				if (homeItem.productId === infoItem.productId) {
					obj = {
						...infoItem,
					};
				}
			});
			return obj;
		});
		return resultArr;
	},
	getAllInfo() {
		const infoArr = productsInfoDB;
		return infoArr;
	},
	getInfoOf(id) {
		const productOneInfo = productsInfoDB.filter((item) => item.productId === id)[0];
		return productOneInfo;
	},
};
