/* Функция валидации одного поля */
export default class FieldValidate {
	/**
	 *
	 * @param {string|object} field
	 * @param {object} options
	 * @returns
	 */
	constructor(field, options = {}, rules = {}, messages = {}) {
		// this.fld;
		if (typeof field == "string") {
			this.fld = document.querySelector(field);
		}
		if (!this.fld && typeof field == "object") {
			this.fld = field;
		}
		if (!this.fld) {
			console.warn(`FieldValidate: не существует элемента ${this.fld} на странице!`);
			return;
		}
		this.opts = {
			actionType: options.actionType ?? "store",
			/*  */
			// specialOutput: options.specialOutput ?? false,
			// specialOutputTrigger: options.specialOutputTrigger ?? false,
			// specialOutputSelector: options.specialOutputSelector ?? null,
			specialOutputObj: options.specialOutputObj ?? null,
			/*  */
			fieldWrapSelector: options.fieldWrapSelector ?? "[class*='fld']",
			invalidClass: options.invalidClass ?? "fld--invalid",
			requiredClass: options.requiredClass ?? "fld--required",
			outMsgClass: options.outMsgClass ?? "validate-msg",
			outMsgPlace: options.outMsgPlace ?? "end",
		};
		this.rules = {
			login: {
				min: 4,
			},
			password: {
				min: 4,
			},
		};
		this.messages = {
			// login: {
			// 	invalid: messages?.invalidLogin ?? "Логин невалидный",
			// 	short: messages?.shortLogin ??
			// 	`Логин должен содержать не менее ${this.rules.login.min}-х символов`,
			// },
			invalidLogin: messages?.invalidLogin ?? "Логин невалидный",
			shortLogin:
				messages?.shortLogin ??
				`Логин должен содержать не менее ${this.rules.login.min}-х символов`,
			/*  */
			required: messages?.required ?? "Поле не должно быть пустым",
			invalidEmail: messages?.invalidEmail ?? "Email невалидный",
			shortPassword:
				options?.messages?.shortPassword ??
				`Пароль должен содержать не менее ${this.rules.password.min}-х символов`,
			authWrongLogin: messages?.authWrongLogin ?? "",
			authWrongLoginOrPassword:
				messages?.authWrongLoginOrPassword ?? "Логин или Пароль неверен",
		};

		this.invalidType = null;
		this.outMsg = "";
		this.outMsgElement = null;

		this.addRequiredArea();

		// this.fld.addEventListener("change", this.validateMe);

		this.fld.addEventListener("input", () => {
			// if (this.outMsgElement) {
			// 	// Этим условием исключаем излишние проверки.
			// 	// Например, если мы еще ниразу не ошиблись при вводе данных в поле,
			// 	// то тогда мы НЕ проверяем при каждом событии input.
			// 	// А если ошибка у поля уже имеется, то проверям при каждом событии input,
			// 	// до тех пор пока ошибка не исправится правильным вводом.
			// 	this.validateMe();
			// }
			this.clearMarkAsWrong();
		});
	}

	addRequiredArea = () => {
		if (this.fld.required) {
			this.fld.closest(this.opts.fieldWrapSelector).classList.add(this.opts.requiredClass);
		}
	};

	validateMe = (successAuth, errorsCounter) => {
		if (this.checkValid(successAuth)) {
			this.clearMarkAsWrong(successAuth, errorsCounter);
		} else {
			this.markAsWrong(successAuth, errorsCounter);
		}
	};

	checkValid = (successAuth) => {
		// successAuth получаем из другого класса LocalUserAuth
		switch (this.fld.dataset.validType) {
			case "email":
				const re =
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

				this.isValid = true;
				if (this.opts.actionType !== "auth") {
					// Если это не форма авторизации, то проверяем валидность для поля email
					// Т.к. для авторизации мы проверям только на соответствие со значением в хранилище
					if (re.test(String(this.fld.value).trim().toLowerCase()) === false) {
						this.invalidType = "invalidEmail";
						this.isValid = false;
					}
				} else {
					// Если проверям в форме с типом "авторизация", то тип сообщения другой
					// И зависит от успешности проверки данных, результат которой принимается
					// из другого класса в переменной successAuth
					if (!successAuth) {
						this.invalidType = "authWrongLogin";
						this.isValid = false;
					} else {
						this.isValid = true;
					}
				}
				if (this.fld.required) {
					if (String(this.fld.value).trim().length === 0) {
						this.invalidType = "required";
						this.isValid = false;
					}
				}
				return this.isValid;
			case "login":
				this.isValid = true;
				if (this.opts.actionType !== "auth") {
					// Если это не форма авторизации, то проверяем валидность для поля login
					// Т.к. для авторизации мы проверям только на соответствие со значением в хранилище
					if (String(this.fld.value).trim().length < this.rules.login.min) {
						this.invalidType = "shortLogin";
						this.isValid = false;
					}
				} else {
					// Если проверям в форме с типом "авторизация", то тип сообщения другой
					// И зависит от успешности проверки данных, результат которой принимается
					// из другого класса в переменной successAuth
					if (!successAuth) {
						this.invalidType = "authWrongLogin";
						this.isValid = false;
					} else {
						this.isValid = true;
					}
				}
				if (this.fld.required) {
					if (String(this.fld.value).trim().length === 0) {
						this.invalidType = "required";
						this.isValid = false;
					}
				}
				return this.isValid;
			case "password":
				this.isValid = true;
				if (this.opts.actionType !== "auth") {
					// Если это не форма авторизации, то проверяем валидность для поля email
					// Т.к. для авторизации мы проверям только на соответствие со значением в хранилище
					if (String(this.fld.value).trim().length < this.rules.password.min) {
						this.invalidType = "shortPassword";
						this.isValid = false;
					}
				} else {
					// Если проверям в форме с типом "авторизация", то тип сообщения другой
					// И зависит от успешности проверки данных, результат которой принимается
					// из другого класса в переменной successAuth
					if (!successAuth) {
						this.invalidType = "authWrongLoginOrPassword";
						this.isValid = false;
					} else {
						this.isValid = true;
					}
				}
				if (this.fld.required) {
					if (String(this.fld.value).trim().length === 0) {
						this.invalidType = "required";
						this.isValid = false;
					}
				}
				return this.isValid;
			case "checkbox":
			case "agreement":
			case "subscribe":
				this.isValid = true;
				if (this.fld.required) {
					if (!this.fld.checked) {
						this.invalidType = "required";
						this.isValid = false;
					}
				}
				return this.isValid;
			default:
				return false;
		}
	};
	getField = () => {
		return this.fld;
	};
	clearMarkAsWrong = (successAuth, errorsCounter) => {
		this.fld.closest(this.opts.fieldWrapSelector).classList.remove(this.opts.invalidClass);
		if (this.outMsgElement) {
			this.outMsgElement.remove();
			this.outMsgElement = null;
		}
	};
	markAsWrong = (successAuth, errorsCounter) => {
		if (!this.isValid) {
			this.fld.closest(this.opts.fieldWrapSelector).classList.add(this.opts.invalidClass);
			this.appendOutMsg(successAuth, errorsCounter);
		}
	};
	setOutMsg = () => {
		if (!this.isValid) {
			this.outMsg = this.messages[this.invalidType];
		}
	};
	buildOutMsgHelper = (successAuth, errorsCounter) => {
		let outMsgHelper = document.createElement("div");
		outMsgHelper.className = this.opts.outMsgClass;
		outMsgHelper.textContent = this.outMsg;

		let baseObj = this.fld.closest(this.opts.fieldWrapSelector);
		if(this.outMsg === this.messages["authWrongLoginOrPassword"]) {
			baseObj = this.opts.specialOutputObj;
		}
		
		if (!this.outMsgElement) {
			baseObj.append(outMsgHelper);
			this.outMsgElement = outMsgHelper;
		} else {
			this.outMsgElement.textContent = this.outMsg;
		}
	};

	appendOutMsg = (successAuth, errorsCounter) => {
		this.setOutMsg();
		this.buildOutMsgHelper(successAuth, errorsCounter);
	};
} // конец класса FieldValidate
