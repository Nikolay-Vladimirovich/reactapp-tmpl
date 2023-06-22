import FieldValidate from "./FieldValidate";

export default class FormValidate {
	/**
	 *
	 * @param {string} formSelector
	 * @param {object} options
	 * @returns
	 */
	constructor(formSelector, options = {}) {
		if (typeof formSelector == "string") {
			this.form = document.querySelector(formSelector);
		}
		if (!this.form && typeof formSelector == "object") {
			this.form = formSelector;
		}
		if (!this.form) {
			console.warn(`FormValidate: не существует элемента ${formSelector} на странице!`);
			return;
		}
		this.opts = {
			/*  */
			// specialOutput: options.specialOutput ?? false,
			// specialOutputTrigger: options.specialOutputTrigger ?? false,
			// specialOutputSelector: options.specialOutputSelector ?? null,
			specialOutputObj: options.specialOutputObj ?? null,
			/*  */
			actionType: options.actionType ?? "store",
			validateFieldsTypes: options.validateFieldsTypes ?? [
				"text", // ! Добавил
				"email",
				"password",
				"checkbox",
			],
			buttonSubmit: options.buttonSubmit ?? '[type="submit"]',
		};

		this.formErrorsCounter = 0;

		this.validErrorsCounter = 0;

		// Формируем строку для поиска input'ов исходя из указанных типов полей
		let querySelectorStr = this.opts.validateFieldsTypes.reduce(
			(acc, item, idx, arr) =>
				acc + `input[type=\'${item}\']` + (idx < arr.length - 1 ? ", " : ""),
			"",
		);
		this.form.setAttribute("novalidate", true); // Отменяем встроенную в браузер валидацию

		// this.form.addEventListener("submit", (e) => {
		// 	e.preventDefault(); // Отменяем отправку формы
		// 	this.validateForm();
		// 	// if (this.isValidForm) {
		// 	// 	let formData = new FormData(form);
		// 	// 	let formSubmitData = new Object();
		// 	// 	formSubmitData["email"] = formData.get("email");
		// 	// 	formSubmitData["password"] = formData.get("password");
		// 	// }
		// });
		let fldsValidateNodeList = this.form.querySelectorAll(querySelectorStr);
		this.fldsValidateMap = new Map();
		this.fldsAllData = {};
		/*
			 fldsValidateMap содержит в роли ключа объект, содержащий методы и свойства валидации конкретного поля,
			 а в роли значения содержит текущее состояние валидности этого поля.
		*/
		fldsValidateNodeList.forEach((fld) => {
			this.fldsValidateMap.set(
				new FieldValidate(fld, {
					actionType: this.opts.actionType,
					/*  */
					// specialOutput: this.opts.specialOutput,
					// specialOutputTrigger: this.opts.specialOutputTrigger,
					// specialOutputSelector: this.opts.specialOutputSelector,
					specialOutputObj: this.opts.specialOutputObj,
					/*  */
				}),
			);
		});
	}
	/* Метод валидации всех полей */
	validateOnly = () => {
		this.validErrorsCounter = 0;
		for (let fld of this.fldsValidateMap) {
			this.fldsValidateMap.set(fld[0], fld[0].checkValid(true));
			fld[0].validateMe();
			// this.formErrorsBeforeAuth= this.formErrorsCounter + Number(!fld[0].checkValid());
			this.validErrorsCounter = this.validErrorsCounter + Number(!fld[0].checkValid());
		}
	}
	validateForm = (successAuth) => {
		this.formErrorsCounter = 0;
		for (let fld of this.fldsValidateMap) {
			this.fldsValidateMap.set(fld[0], fld[0].checkValid(successAuth));
			fld[0].validateMe(successAuth, this.validErrorsCounter);
			// this.formErrorsBeforeAuth= this.formErrorsCounter + Number(!fld[0].checkValid());
			this.formErrorsCounter = this.formErrorsCounter + Number(!fld[0].checkValid(successAuth));
		}
		
		this.isValidForm = this.formErrorsCounter === 0 ? true : false;
	};

	isValid = (successAuth) => {
		this.validateForm(successAuth);
		return this.isValidForm;
	};

	resetValidation = (successAuth) => {
		this.validateForm(successAuth);
	};
} // конец класса FormValidate
