class ShopcartHelper {
	constructor(options = {}) {
		this.opts = {
			localStorageKey: options.localStorageKey ?? "myShopcart",
			infoDB: options.infoDB ?? null,
			limitDB: options.limitDB ?? null,
			primaryKey: options.primaryKey ?? null,
		};
		this.pkey = this.opts.primaryKey;
		this.pkeyRelatedWithReduxStore = this.opts.primaryKey; //
	}
	amountTotal() {
		const shopcartArr = this.getAll();
		const total = shopcartArr.reduce((acc, item) => {
			return acc + this.amountOf(item[this.pkeyRelatedWithReduxStore]);
		}, 0);
		return total;
	}
	priceTotal() {
		const shopcartArr = this.getAll();
		const total = shopcartArr.reduce((acc, item) => {
			return acc + item["price"] * this.amountOf(item[this.pkeyRelatedWithReduxStore]);
		}, 0);
		return total;
	}
	amountOf(id) {
		const shopcartArr = this._getArray();
		let amount = 0;
		if (this._isProductExist(id)) {
			shopcartArr.forEach((item) => {
				if (item[this.pkeyRelatedWithReduxStore] === id) {
					amount = item["amount"];
				}
			});
		}
		return amount;
	}
	getAll() {
		if (!this._isDB(this.opts.infoDB).exist) {
			console.warn(`${this._isDB(this.opts.infoDB).error} this.opts.infoDB`);
			return [];
		}
		const mainArr = this.opts.infoDB;
		const savedArr = this._getArray();
		const resultArr = savedArr.map((savedItem) => {
			let obj = {};
			mainArr.forEach((mainItem) => {
				if (savedItem[this.pkey] === mainItem[this.pkey]) {
					obj = {
						amount: savedItem.amount,
						reachedMax: !this._canIncreaseItem(savedItem[this.pkey]),
						...mainItem,
					};
				}
			});
			return obj;
		});

		return resultArr;
	}
	clearAll() {
		this._lsSet([]);
	}

	delete = (payobj) => {
		const shopcartArr = this._getArray();
		if (this._isProductExist(payobj[this.pkey])) {
			const newShopcartArr = shopcartArr.filter(
				(item) => item[this.pkeyRelatedWithReduxStore] !== payobj[this.pkey],
			);
			this._lsSet(JSON.stringify(newShopcartArr));
		}
	};

	save = (payobj) => {
		let shopcartArr = this._getArray();
		if (!this._isProductExist(payobj[this.pkey])) {
			if (this._canIncreaseItem(payobj[this.pkey])) {
				const newObj = { [this.pkey]: payobj[this.pkey], amount: 1 };
				shopcartArr.push(newObj);
				this._lsSet(JSON.stringify(shopcartArr));
			}
		} else {
			const newShopcartArr = this.increase(payobj[this.pkey]);
			this._lsSet(JSON.stringify(newShopcartArr));
		}
	};

	increase = (id) => {
		const shopcartArr = this._getArray();
		const newShopcartArr = shopcartArr.map((item) => {
			if (item[this.pkeyRelatedWithReduxStore] === id) {
				const counter = this._canIncreaseItem(id) ? item["amount"] + 1 : item["amount"];
				return { [this.pkey]: id, amount: counter };
			}
			return { [this.pkey]: item[this.pkeyRelatedWithReduxStore], amount: item["amount"] };
		});
		return newShopcartArr;
	};
	limitMaxOf(id) {
		return this.opts.limitDB.filter((item) => item[this.pkeyRelatedWithReduxStore] === id)[0].maxAmount;
	}
	_canIncreaseItem = (id) => {
		if (!this._isDB(this.opts.limitDB).exist) {
			console.warn(`${this._isDB(this.opts.limitDB).error} this.opts.limitDB`);
			return false;
		}
		if (this.limitMaxOf(id) === "unlimit") {
			return true;
		} else {
			return this.amountOf(id) < this.limitMaxOf(id) ? true : false;
		}
	};
	_isProductExist = (id) => {
		const shopcartArr = this._getArray();
		if (shopcartArr.length === 0) {
			return false;
		} else {
			return shopcartArr.some((item) => item[this.pkey] === id);
		}
	};

	_isDB = (db) => {
		let exist = true;
		let error = '';
		if (!db || !Array.isArray(db) || !db.length) {
			exist = false;
			error = 'ошибка БД'
		}
		return { exist, error };
	};

	_getArray = () => {
		const lsShopcart = localStorage.getItem(this.opts.localStorageKey);
		let shopcartArray;
		if (!lsShopcart) {
			shopcartArray = [];
			return shopcartArray;
		} else {
			shopcartArray = JSON.parse(lsShopcart);
		}
		return shopcartArray;
	};
	_lsSet = (lsdata) => {
		localStorage.setItem(this.opts.localStorageKey, lsdata);
	};
} // конец класса

export default ShopcartHelper;
