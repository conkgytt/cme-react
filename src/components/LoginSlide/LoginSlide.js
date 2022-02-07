import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";

import styles from "./LoginSlide.module.scss";
import { singleMessageActions } from "../../redux";
import LoginGoogleAccountButton from "../LoginGoogleAccountButton/LoginGoogleAccountButton";

function LoginBox() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Auth store
	const isSignedIn = useSelector((state) => state.auth.isSignedIn);
	const isSignedUp = useSelector((state) => state.auth.isSignedUp);

	const handleSignedUp = () => {
		navigate("/");
	};
	const handleNotSignedUp = () => {
		const messageAction = singleMessageActions.setSingleMessage({
			state: true,
			type: "message",
			message:
				"Bạn chưa từng đăng ký bằng tài khoản này, vui lòng đăng ký bổ sung.",
		});

		dispatch(messageAction);
		navigate("/auth/register");
	};

	// Handle redirect when logged or registed
	useEffect(() => {
		if (isSignedIn && isSignedUp) {
			const action = singleMessageActions.setSingleMessage({
				state: true,
				type: "warning",
				message: "Vui lòng đăng xuất tài khoản cũ để đăng nhập.",
			});

			navigate("/");
			dispatch(action);
		}
	}, [isSignedIn, isSignedUp]);

	return (
		<div className={clsx(styles.loginSlide)}>
			<h3 className={clsx(styles.loginTitle)}>
				<p>Đăng nhập</p>

				<Link to="/auth/register">
					<p>Đăng ký</p>
					<i className="fas fa-caret-right"></i>
				</Link>
			</h3>

			<LoginGoogleAccountButton
				label="Đăng nhập bằng Google"
				handleSignedUp={handleSignedUp}
				handleNotSignedUp={handleNotSignedUp}
			/>

			<p className={clsx(styles.moreAction)}>
				<span> Nếu chưa có tài khoản vui lòng </span>
				<Link to="/auth/register">Đăng ký</Link>
			</p>
		</div>
	);
}

export default LoginBox;
