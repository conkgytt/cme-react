import React from "react";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Navigation.module.scss";
import { domStateActions } from "../../redux";
import NavRightLogged from "../NavRightLogged/NavRightLogged";
import NavRightNotLogged from "../NavRightNotLogged/NavRightNotLogged";

function Navigation() {
	const dispatch = useDispatch();

	const { isSignedUp, position, name, avatar, email } = useSelector(
		(state) => state.auth
	);

	const handleShowLeftPanel = () => {
		const showLeftPanelAction = domStateActions.showElement("leftPanel");
		dispatch(showLeftPanelAction);
	};

	return (
		<div className={clsx(styles.navigationBarWrapper)}>
			<nav className={clsx(styles.navigationBar)}>
				<div className={clsx(styles.navigationBarLeft)}>
					<i
						className="far fa-bars"
						onClick={handleShowLeftPanel}
					></i>
				</div>

				{isSignedUp ? (
					<NavRightLogged
						position={position}
						name={name}
						avatar={avatar}
						email={email}
					/>
				) : (
					<NavRightNotLogged />
				)}
			</nav>
		</div>
	);
}

export default Navigation;
