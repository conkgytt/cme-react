import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import styles from "./RegisterSlide.module.scss";
import RegisterForm from "../RegisterForm/RegisterForm";
import GoogleAccountInfo from "./GoogleAccountInfo";
import LoginGoogleAccountButton from "../LoginGoogleAccountButton/LoginGoogleAccountButton";

function RegisterBox() {
	const dispatch = useDispatch();
	const isSignedIn = useSelector((state) => state.auth.isSignedIn);
	const isSignedUp = useSelector((state) => state.auth.isSignedUp);
	const googleName = useSelector((state) => state.auth.googleName);
	const avatar = useSelector((state) => state.auth.avatar);
	const email = useSelector((state) => state.auth.email);

	return (
		<div className={clsx(styles.registerSlide)}>
			<h3 className={clsx(styles.registerTitle)}>
				<Link to="/auth/login">
					<i className="fas fa-caret-left"></i>
					<p>Đăng nhập</p>
				</Link>

				<p>Đăng ký</p>
			</h3>

			{isSignedIn && !isSignedUp && (
				<GoogleAccountInfo
					avatar={avatar}
					googleName={googleName}
					email={email}
				/>
			)}

			<LoginGoogleAccountButton label="Đăng ký bằng Google" />

			{!isSignedUp && <RegisterForm />}
		</div>
	);
}

export default RegisterBox;
