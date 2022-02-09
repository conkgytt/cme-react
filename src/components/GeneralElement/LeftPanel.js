import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import clsx from "clsx";

import styles from "./LeftPanel.module.scss";
import { domStateActions } from "../../redux";

function LeftPanel() {
	const dispatch = useDispatch();

	const avatar = useSelector((state) => state.auth.avatar);
	const name = useSelector((state) => state.auth.name);
	const email = useSelector((state) => state.auth.email);
	const classRoomsName = useSelector((state) => state.auth.classes);

	const isShowed = useSelector((state) => state.domState.leftPanel);

	const handleHideLeftPanel = () => {
		const hideLeftPanelAction = domStateActions.hideElement("leftPanel");
		dispatch(hideLeftPanelAction);
	};

	const handleClickProfileContainer = () => {
		handleHideLeftPanel();

		const showProfileBoxAction =
			domStateActions.showElement("profileBox");

		dispatch(showProfileBoxAction);
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
					<div
						className={clsx(styles.profileContainer)}
						onClick={handleClickProfileContainer}
					>
						<img
							className={clsx(styles.avatar)}
							src={avatar}
							alt={name}
							title={name}
						/>

						<div className={clsx(styles.infoContainer)}>
							<p className={clsx(styles.name)}>{name}</p>
							<p className={clsx(styles.classRoomName)}>
								{classRoomsName.map((classRoomName, index) =>
									index === classRoomsName.length - 1
										? `${classRoomName}`
										: `${classRoomName}, `
								)}
							</p>
							<p className={clsx(styles.email)}>{email}</p>
						</div>
					</div>

					<div className={clsx(styles.navigationListWrapper)}>
						<section className={clsx(styles.directionList)}>
							<Link to="/">
								<p>Trang chủ</p>
							</Link>
							<Link to="/">
								<p>Trang chủ</p>
							</Link>
						</section>
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
