import React from "react";
import clsx from "clsx";
import styles from "./ListField.module.scss";

function ListField({
	label,
	icon,
	list,
	currentItem,
	setCurrentItem,
	errorMessage,
	alert,
}) {
	return (
		<>
			<label className={clsx(styles.listField)}>
				<span>
					{icon}
					<p>{label}</p>
				</span>

				<p>
					{" " +
						list.find((item) => item.value === currentItem.value)
							.display}
				</p>

				<input type="checkbox" />

				<i className="fas fa-sort-down"></i>

				<ul>
					{list.map((item, index) => (
						<li
							key={index}
							onClick={() =>
								setCurrentItem((preState) => ({
									...preState,
									value: item.value,
								}))
							}
							className={clsx({
								[styles.rankIsChecked]:
									item.value === currentItem.value,
							})}
						>
							<p>{item.display}</p>
							{item.value === currentItem.value && (
								<i className="fad fa-check"></i>
							)}
						</li>
					))}
				</ul>
			</label>
			<p className={clsx(styles.error)}>
				{currentItem.errorMessage && errorMessage}
			</p>
			<p className={clsx(styles.alert)}>{alert}</p>
		</>
	);
}

export default ListField;
