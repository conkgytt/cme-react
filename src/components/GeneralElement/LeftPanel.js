import React from "react";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";

import styles from "./LeftPanel.module.scss";
import { domStateActions } from "../../redux";

function LeftPanel() {
	const dispatch = useDispatch();

	const avatar = useSelector((state) => state.auth.avatar);
	const name = useSelector((state) => state.auth.name);
	const isShowed = useSelector((state) => state.domState.leftPanel);

	const handleHideLeftPanel = () => {
		const hideLeftPanelAction = domStateActions.hideElement("leftPanel");
		dispatch(hideLeftPanelAction);
	};

	return (
		<div
			className={clsx(styles.leftPanelWrapper, {
				[styles.show]: isShowed,
			})}
		>
			<div className={clsx(styles.leftPanel)}>
				<header className={clsx(styles.head)}>
					<span>Điều hướng</span>
					<i
						className="fas fa-chevron-left"
						onClick={handleHideLeftPanel}
					></i>
				</header>

				<div className={clsx(styles.body)}>
					<div className={clsx(styles.profileContainer)}>
						<img
							className={clsx(styles.avatar)}
							src={avatar}
							alt={name}
							title={name}
						/>

						<div className={clsx(styles.infoContainer)}></div>
					</div>
				</div>
			</div>

			<div
				className={clsx(styles.background)}
				onClick={handleHideLeftPanel}
			></div>
		</div>
	);
}

export default LeftPanel;
