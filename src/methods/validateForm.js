export const isRequired = (value) => {
	if (value.length) return true;
	return false;
};

export const minLength = (value, length) => {
	if (value.length < length) {
		return false;
	} else {
		return true;
	}
};

export const maxLength = (value, length) => {
	if (value.length > length) {
		return false;
	} else {
		return true;
	}
};

export const validateInput = (
	value,
	options = {
		isRequired: false,
		minLength: null,
		maxLength: null,
		isNumbers: false,
		isEmail: false,
		// isPhoneNumber: false,
		invalidSymbols: "",
	}
) => {
	const errors = [];

	if (options.isRequired && !(value?.length || 0)) {
		errors.push({
			isSuccess: false,
			code: 0,
			message: "Thông tin này là bắt buộc.",
		});
	}

	if (
		typeof options.minLength === "number" &&
		value.length < options.minLength
	) {
		errors.push({
			isSuccess: false,
			code: 1,
			length: value.length,
			minLength: options.minLength,
			message: `Nội dung cần tối thiểu ${options.minLength} ký tự. Hiện tại có ${value.length} ký tự.`,
		});
	}

	if (
		typeof options.maxLength === "number" &&
		value.length > options.maxLength
	) {
		errors.push({
			isSuccess: false,
			code: 2,
			length: value.length,
			maxLength: options.maxLength,
			message: `Nội dung tối đa chỉ ${options.maxLength} ký tự. Hiện tại có ${value.length} ký tự.`,
		});
	}

	if (options.isNumbers) {
		const symbolsArr = value.split("");
		const isNumbers = symbolsArr.every((symbol) =>
			Number.isInteger(+symbol)
		);

		if (!isNumbers) {
			errors.push({
				isSuccess: false,
				code: 3,
				message: "Chỉ cho phép nhập thông tin bằng số (0-9).",
			});
		}
	}

	if (options.invalidSymbols) {
		const symbolArr = value.split("");
		const invalidSymbols = symbolArr.filter((symbol) =>
			options.invalidSymbols.includes(symbol)
		);
		const invalidSymbolsUnique = [...new Set(invalidSymbols)];

		if (invalidSymbols?.length) {
			errors.push({
				isSuccess: false,
				code: 4,
				invalidSymbols: invalidSymbolsUnique,
				message: `Chứa ký tự không được phép: ${invalidSymbolsUnique
					.map((symbol) => `${symbol}`)
					.join(", ")}.`,
			});
		}
	}

	if (options.isEmail) {
		const isEmail = value
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);

		if (!isEmail) {
			errors.push({
				isSuccess: false,
				code: 5,
				message: `Thông tin được nhập phải là một địa chỉ Email.`,
			});
		}
	}

	return errors;
};
