import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import clsx from "clsx";
import styles from "./ProfileBox.module.scss";
import { authActions, domStateActions } from "../../redux";

function ProfileBox() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isShowed = useSelector((state) => state.domState.profileBox);
	const { avatar, name, email } = useSelector((state) => state.auth);

	const handleHideProfileBox = () =>
		dispatch(domStateActions.hideElement("profileBox"));

	const handleLogout = () => {
		const logoutAction = authActions.logout();
		const hideProfileBoxAction =
			domStateActions.hideElement("profileBox");

		dispatch(logoutAction);
		dispatch(hideProfileBoxAction);
		navigate("/auth/login");
	};

	return (
		<div
			className={clsx(styles.profileBox, {
				[styles.show]: isShowed,
			})}
		>
			<header className={clsx(styles.head)}>
				<span>
					<i className="far fa-id-card-alt"></i>
					Thông tin
				</span>
				<i className="far fa-times" onClick={handleHideProfileBox}></i>
			</header>

			<div className={clsx(styles.body)}>
				<div className={clsx(styles.profileContainer)}>
					<div className={clsx(styles.avatarContainer)}>
						<img src={avatar} alt={name} title={name} />
					</div>

					<div className={clsx(styles.infoContainer)}>
						<span>{name}</span>
						<p>{email}</p>
					</div>
				</div>

				<div className={clsx(styles.directionsContainer)}>
					<div className={clsx(styles.userAction)}>
						<h3>TÀI KHOẢN</h3>

						<ul className={clsx(styles.listActions)}>
							<li className={clsx(styles.action)}>
								<span>Sửa thông tin</span>
								<i className="fad fa-user-edit"></i>
							</li>

							<li className={clsx(styles.action)}>
								<span>Cài đặt</span>
								<i className="fad fa-cogs"></i>
							</li>

							<li
								className={clsx(styles.action)}
								onClick={handleLogout}
							>
								<span>Đăng xuất</span>
								<i className="fad fa-sign-out-alt"></i>
							</li>
						</ul>
					</div>

					<div className={clsx(styles.directActions)}>
						<h3>ĐIỀU HƯỚNG</h3>

						<ul className={clsx(styles.listActions)}>
							<li className={clsx(styles.action)}>
								<span>Trang thông báo</span>
								<i className="fad fa-bullhorn"></i>
							</li>

							<li className={clsx(styles.action)}>
								<span>Trang ngoại khóa</span>
								<i className="fad fa-gamepad"></i>
							</li>

							<li className={clsx(styles.action)}>
								<span>Trang học tập</span>
								<i className="fad fa-chalkboard-teacher"></i>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProfileBox;
