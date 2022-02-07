import clsx from "clsx";

import styles from "./GoogleAccountInfo.module.scss";
import { singleMessageActions } from "../../redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function GoogleAccountInfo({ avatar, googleName, email }) {
	const dispatch = useDispatch();

	return (
		<div className={clsx(styles.googleAccountInfoWrapper)}>
			<p className={clsx(styles.title)}>
				Tài khoản Google dùng đăng ký
			</p>

			<div className={clsx(styles.googleAccountInfo)}>
				<div className={clsx(styles.avatarContainer)}>
					<img src={avatar} alt="" />
				</div>

				<div className={clsx(styles.infoContainer)}>
					<div className={clsx(styles.googleNameContainer)}>
						<span>Google</span>
						<span>{googleName}</span>
					</div>

					<div className={clsx(styles.emailContainer)}>
						<span>Email</span>
						<span>{email}</span>
					</div>

					<div className={clsx(styles.signUpWithOtherAccount)}></div>
				</div>
			</div>

			<p className={clsx(styles.separateLabel)}>
				Hoặc sử dụng tài khoản Google khác
			</p>
		</div>
	);
}

export default GoogleAccountInfo;
