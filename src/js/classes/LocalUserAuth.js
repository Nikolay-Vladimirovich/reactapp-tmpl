export default class LocalUserAuth {
	/**
	 *
	 * @param {string} formSelector
	 * @param {object} options
	 */
	constructor(formSelector, options = {}) {
		this.componentSelector = formSelector;
		if (typeof formSelector == "string") {
			this.form = document.querySelector(formSelector);
		}
		if (!this.form && typeof formSelector == "object") {
			this.form = formSelector;
		}
		this.opts = {
			uniqueFld: options.uniqueFld ?? "email", // * Уникальное поле для пользователя
			validateReference: options.validateReference ?? null,
			localStorageUsersKey: options.localStorageUsersKey ?? "myLocalSiteUsers",
			localStorageAuthKey: options.localStorageAuthKey ?? "myLocalSiteAuth",
			relocateDelay: options.relocateDelay ?? 2,
			relocateHref: options.relocateHref ?? "home.html",
		};

		this.successAuth = null;
	}

	formSubmit = (e) => {
		e.preventDefault(); // Отменяем отправку формы
		// console.log("formSubmit..........");
		this.logIn(this.formSubmitData[this.opts.uniqueFld]);
	};

	// authorizationComplete = (timeout) => {};
	getCurrentAuthUser = () => {
		const currentAuthArray = this._getAuthArray();
		if (!currentAuthArray.length) return null;
		return currentAuthArray[0];
	};
	getCurrentAuthState = () => {
		const currentAuthArray = this._getAuthArray();
		return currentAuthArray.length;
	};
	logIn = (dataObject) => {
		const currentAuthArray = this._getAuthArray();
		// if (!currentAuthArray.length) {}
		currentAuthArray.push(dataObject);
		const newAuthString = JSON.stringify(currentAuthArray);
		localStorage.setItem(this.opts.localStorageAuthKey, newAuthString);
	};
	logOut = () => {
		const currentAuthArray = this._getAuthArray();
		// if (currentAuthArray.length) {}
		currentAuthArray.length = 0;
		const newAuthString = JSON.stringify(currentAuthArray);
		localStorage.setItem(this.opts.localStorageAuthKey, newAuthString);
	};
	checkUserData = () => {
		if (!this.form) {
			console.warn(
				`LocalUserAuth: не существует элемента ${this.componentSelector} на странице!`,
			);
			return;
		}

		this.formData = new FormData(this.form);
		this.formSubmitData = {};
		this.formSubmitData[this.opts.uniqueFld] = this.formData.get(this.opts.uniqueFld);
		this.formSubmitData["password"] = this.formData.get("password");

		const isUserExist = this._isUserExist(this.formSubmitData);
		this.successAuth = null;
		// Переменная, которая говорит об успешности проверки с хранилищем.
		// Её мы передаем в классы валидации дляинформирования их о состоянии проверки
		if (isUserExist) {
			if (this.checkPassword(this.formSubmitData)) {
				this.successAuth = true;

				if (!this.opts.validateReference.isValid(this.successAuth)) {
					// Здесь я уже после того как email и password совпали с теми что в хранилище,
					// проверяю заполненность остальных полей, кроме email и password
					// Т.к. корректность email и password (отсутствие индикации ошибки) должна быть видна
					// только после заполнения всех полей,
					// Это как бы защита от подбора. Иначе, не заполнив что-либо, можно угадывать пароль,
					// пока не пропадет индикация ошибок
					this.successAuth = false;
				}
			} else {
				this.successAuth = false;
			}
		} else {
			this.successAuth = false;
		}
		if (this.successAuth) {
			this.opts.validateReference.validateForm(this.successAuth);
		} else {
			console.log("Такого пользователя не существует или данные введены неверно!");
			this.opts.validateReference.validateForm(this.successAuth);
		}
		return this.successAuth;
	};
	checkPassword = (userInputData) => {
		// let usersBody = localStorage.getItem(this.opts.localStorageUsersKey);
		// let parsedUsersBody = JSON.parse(usersBody);
		let parsedUsersBody = this._getUsersArray();
		for (let user of parsedUsersBody) {
			if (user[this.opts.uniqueFld] === userInputData[this.opts.uniqueFld]) {
				if (user["password"] === userInputData.password) return true;
			}
		}
	};
	_isUserExist = (userInputData) => {
		let usersBody = this._getUsersArray();
		if (usersBody.length === 0) {
			return false;
		} else {
			let isExist = usersBody.some(
				(user) => user[this.opts.uniqueFld] === userInputData[this.opts.uniqueFld],
			);
			return isExist;
		}
	};
	_getUsersArray = () => {
		let myLocalSiteUsers = localStorage.getItem(this.opts.localStorageUsersKey);
		let usersArray = this._getArray(myLocalSiteUsers);
		return usersArray;
	};
	_getAuthArray = () => {
		let myLocalSiteAuth = localStorage.getItem(this.opts.localStorageAuthKey);
		let authArray = this._getArray(myLocalSiteAuth);
		return authArray;
	};
	_getArray = (localStorageData) => {
		let result;
		if (!localStorageData) {
			result = [];
			return result;
		} else {
			result = JSON.parse(localStorageData);
		}
		return result;
	};
} // конец класса LocalUserAuth