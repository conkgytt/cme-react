import { useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import clsx from "clsx";

import styles from "./LoginGoogleAccountButton.module.scss";
import googleIcon from "../../img/google.png";
import { cookie } from "../../methods";
import { authConstants } from "../../constants";
import { authActions } from "../../redux";
import { transformer } from "../../methods";

function LoginGoogleAccountButton({
	label,
	handleSignedUp = () => {},
	handleNotSignedUp = () => {},
}) {
	const dispatch = useDispatch();
	const loginWindowRef = useRef();

	const handleWindowReceiveMessage = useCallback((e) => {
		if (
			e.origin.includes(
				"https://cons-meeting-education.herokuapp.com"
			) &&
			e.data
		) {
			// Cleanup
			loginWindowRef.current.close();

			// Save token to cookie
			const data = e.data;
			cookie.setCookie(
				authConstants.REFRESH_TOKEN_KEY_COOKIE,
				data.refreshToken,
				1 * 24 * 60 * 60 * 1000
			);

			// Dispatch action to set all auth info
			const action = authActions.setAllInfo({
				...transformer.tokenPayload(data),
				isSignedIn: true,
			});
			dispatch(action);

			if (data.isSignedUp) {
				handleSignedUp();
			} else {
				handleNotSignedUp();
			}
		}
	}, []);

	useEffect(() => {
		window.addEventListener("message", handleWindowReceiveMessage, true);

		return function Cleanup() {
			window.removeEventListener(
				"message",
				handleWindowReceiveMessage,
				true
			);
		};
	}, []);

	const handleClick = () => {
		// Open login window
		loginWindowRef.current = window.open(
			`https://cons-meeting-education.herokuapp.com/auth/google/re-login`,
			"pop",
			"width=600,height=600"
		);
	};

	return (
		<button
			className={clsx(styles.loginGoogleAccountButton)}
			onClick={handleClick}
		>
			<p>
				<img src={googleIcon} alt={label} title="Google Icon" />
				<span>{label}</span>
			</p>
		</button>
	);
}

export default LoginGoogleAccountButton;
