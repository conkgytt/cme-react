import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../redux";

import { deleteCookies, getCookie, setCookie } from "../../methods/cookie";
import { tokenPayload as tokenPayloadTransformer } from "../../methods/transformer";
import { authConstants } from "../../constants";
import { updateToken } from "../../methods/token";

function Services() {
	const dispatch = useDispatch();
	const googleId = useSelector((state) => state.auth.googleId);

	// Set style when first access
	useEffect(() => {
		const REFRESH_TOKEN_KEY_COOKIE =
			authConstants.REFRESH_TOKEN_KEY_COOKIE;
		const ACCESS_TOKEN_KEY_COOKIE =
			authConstants.ACCESS_TOKEN_KEY_COOKIE;
		const refreshToken = getCookie(REFRESH_TOKEN_KEY_COOKIE);

		let setTimeoutCodeToUpdateRefreshToken;
		let setIntervalCodeToUpdateRefreshToken;
		let setIntervalCodeToUpdateAccessToken;

		try {
			const handleUpdateRefreshToken = async () => {
				const updateTokenUrl = `https://cons-meeting-education.herokuapp.com/token/get-new-refresh-token`;
				const newRefreshToken = await updateToken(
					updateTokenUrl,
					refreshToken
				);

				if (newRefreshToken) {
					setCookie(
						REFRESH_TOKEN_KEY_COOKIE,
						newRefreshToken,
						1 * 24 * 60 * 60 * 1000
					);

					return true;
				}

				console.error("Fail to update refresh token.");
				return false;
			};
			const handleUpdateAccessToken = async () => {
				const refreshToken = getCookie(REFRESH_TOKEN_KEY_COOKIE);
				const updateTokenUrl = `https://cons-meeting-education.herokuapp.com/token/get-new-access-token`;
				const newAccessToken = await updateToken(
					updateTokenUrl,
					refreshToken
				);

				if (newAccessToken) {
					setCookie(
						ACCESS_TOKEN_KEY_COOKIE,
						newAccessToken,
						10 * 60 * 1000
					);

					return true;
				}

				console.error("Fail to update access token.");
				return false;
			};

			if (refreshToken) {
				const tokenPayload = refreshToken.split(".")[1];
				const payload = JSON.parse(
					decodeURIComponent(escape(atob(tokenPayload)))
				);
				const payloadTransformed = tokenPayloadTransformer(payload);

				dispatch(
					authActions.setAllInfo({
						...payloadTransformed,
						isSignedIn: true,
					})
				);

				// Verify refresh token in server
				const verifyTokenUrl = `https://cons-meeting-education.herokuapp.com/token/verify`;
				const verifyTokenOptions = {
					method: "post",
					headers: {
						authorization: "Bearer " + refreshToken,
					},
					body: JSON.stringify({
						tokenType: "refresh",
					}),
				};

				fetch(verifyTokenUrl, verifyTokenOptions)
					.then((res) => res.json())
					.then((tokenIsValid) => {
						// If refresh token is valid
						if (tokenIsValid) {
							// HANDLE UPDATE TOKENS
							// REFRESH TOKEN
							const timeToExpireRefreshToken =
								payload.exp && payload.exp * 1000;
							const timeNow = new Date().getTime();

							// First update
							setTimeoutCodeToUpdateRefreshToken = setTimeout(
								() => {
									if (handleUpdateRefreshToken()) {
										// Set interval to update after first update
										setIntervalCodeToUpdateRefreshToken =
											setInterval(
												handleUpdateRefreshToken,
												23 * 60 * 60 * 1000
											);
									}
								},
								timeToExpireRefreshToken - timeNow
							);

							// ACCESS TOKEN
							// First update
							handleUpdateAccessToken();

							// Set interval to update access token every
							setIntervalCodeToUpdateAccessToken = setInterval(
								handleUpdateAccessToken,
								8 * 60 * 1000
							);
						}

						// Logout if refresh token is invalid
						if (!tokenIsValid) {
							deleteCookies(REFRESH_TOKEN_KEY_COOKIE);
							dispatch(authActions.logout());
						}
					});
			}
		} catch (err) {
			console.error(err);
		}

		return function Cleanup() {
			clearTimeout(setTimeoutCodeToUpdateRefreshToken);
			clearInterval(setIntervalCodeToUpdateRefreshToken);
			clearInterval(setIntervalCodeToUpdateAccessToken);
		};
	}, [googleId]);

	return <></>;
}

export default Services;
