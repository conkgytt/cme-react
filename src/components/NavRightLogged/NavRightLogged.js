import React from "react";
import clsx from "clsx";
import { useDispatch } from "react-redux";

import { domStateActions } from "../../redux";
import styles from "./NavRightLogged.module.scss";

function NavRightLogged({ name, avatar, email }) {
	const dispatch = useDispatch();

	const handleShowElement = (elementField) =>
		dispatch(domStateActions.showElement(elementField));

	return (
		<div className={clsx(styles.navigationBarRight)}>
			<section className={clsx(styles.notify)}>
				<i
					className="fad fa-bell"
					onClick={() => handleShowElement("notifyBox")}
				></i>
			</section>

			<section className={clsx(styles.search)}>
				<i
					className="fad fa-search"
					onClick={() => handleShowElement("searchBox")}
				></i>
			</section>

			<div className={clsx(styles.profile)}>
				<img
					src={avatar}
					alt={name}
					onClick={() => handleShowElement("profileBox")}
				/>
			</div>
		</div>
	);
}

export default NavRightLogged;
