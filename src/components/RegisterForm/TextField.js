import React from "react";
import clsx from "clsx";
import styles from "./TextField.module.scss";
import { validateForm } from "../../methods";

function TextField({
	id,
	label,
	icon,
	state,
	setState,
	isRequired,
	minLength,
	maxLength,
	isNumbers,
	invalidSymbols,
	sendErrorHandle,
	alert = "",
}) {
	const handleSetInput = (newStateValue, funcSetState) => {
		const validateInputResult = validateForm.validateInput(
			newStateValue,
			{
				isRequired,
				minLength: minLength,
				maxLength: maxLength,
				invalidSymbols,
				isNumbers,
			}
		);

		if (validateInputResult.length) {
			sendErrorHandle(id);

			return stopValidate(validateInputResult[0].message);
		} else {
			sendErrorHandle(id, "remove");
		}

		// No error
		stopValidate("");

		function stopValidate(errorMessage) {
			funcSetState({
				...state,
				value: newStateValue,
				errorMessage: errorMessage,
			});
		}
	};
	const getErrorClass = (state) => ({
		[styles.error]: state.errorMessage,
	});

	return (
		<>
			<div className={clsx(styles.textField, getErrorClass(state))}>
				<input
					value={state.value}
					onChange={(e) => handleSetInput(e.target.value, setState)}
					onBlur={(e) => handleSetInput(e.target.value, setState)}
					type="text"
					placeholder=" "
				/>
				<span>
					{icon}
					<p>{label}</p>
				</span>
				<p></p>
			</div>
			<p className={clsx(styles.error)}>{state.errorMessage || ""}</p>
			<p className={clsx(styles.alert)}>{alert}</p>
		</>
	);
}

export default TextField;
