// import FormValidate from "./FormValidate";

export default class LocalUserRegistration {
	/**
	 *
	 * @param {string} formSelector
	 * @param {object} options
	 */
	constructor(formSelector, options = {}) {
		if (typeof formSelector == "string") {
			this.form = document.querySelector(formSelector);
		}
		if (!this.form && typeof formSelector == "object") {
			this.form = formSelector;
		}

		if (!this.form) {
			console.warn(`LocalUserRegistration: не существует элемента ${formSelector} на странице!`);
			return;
		}

		// this.userForm = new FormValidate(formSelector);
		this.userForm = this.form;

		this.opts = {
			uniqueFld: options.uniqueFld ?? "email", // * Уникальное поле для пользователя
			validateReference: options.validateReference ?? null,
			localStorageUsersKey: options.localStorageUsersKey ?? "myLocalSiteUsers",
		};
		// this.form.addEventListener("submit", (e) => {});
	}

	formSubmit = (e) => {
		e.preventDefault(); // Отменяем отправку формы
		// if (this.userForm.isValid()) {
		let formData = new FormData(this.form);
		let formSubmitData = {};
		// formSubmitData["email"] = formData.get("email");
		formSubmitData[this.opts.uniqueFld] = formData.get(this.opts.uniqueFld);
		formSubmitData["password"] = formData.get("password");
		formSubmitData["subscribe"] = formData.get("subscribe");
		this.saveUser(formSubmitData);
		// form.submit();
		// }
	};

	saveUser = (dataObject) => {
		const isUserExist = this._isUserExist(dataObject);
		if (!isUserExist) {
			this._addNewUser(dataObject);
			alert(
				`Вы успешно зарегистрировались! Ваш ${this.opts.uniqueFld}: ${
					dataObject[this.opts.uniqueFld]
				}.${'\n'}${(dataObject['subscribe'] ? 'И подключили подписку' : 'Без подписки')} на обновления` ,
			);
		} else {
			this._updateUser(dataObject);
			alert(
				`Вы обновили ПАРОЛЬ для аккаунта ${
					dataObject[this.opts.uniqueFld]
				}.${'\n'}Статус подписки на обновления: ${(dataObject['subscribe'] ? 'подключена' : 'отключена')}`  ,
			);
		}
	};
	_addNewUser = (dataObject) => {
		let currentUsersArray = this._getUsersArray();
		currentUsersArray.push(dataObject);
		let newUsersString = JSON.stringify(currentUsersArray);
		localStorage.setItem(this.opts.localStorageUsersKey, newUsersString);
		
	};
	_updateUser = (dataObject) => {
		this._deleteUser(dataObject);
		this._addNewUser(dataObject);
	};
	_deleteUser = (dataObject) => {
		const currentUsersArray = this._getUsersArray();
		let newCurrentUsersArray = currentUsersArray.filter(
			(user) => user[this.opts.uniqueFld] !== dataObject[this.opts.uniqueFld],
		);
		let newCurrentUsersString = JSON.stringify(newCurrentUsersArray);
		localStorage.setItem(this.opts.localStorageUsersKey, newCurrentUsersString);
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
		let usersArray;
		if (!myLocalSiteUsers) {
			usersArray = [];
			return usersArray;
		} else {
			usersArray = JSON.parse(myLocalSiteUsers);
		}
		return usersArray;
	};
} // конец класса LocalUserRegistration
