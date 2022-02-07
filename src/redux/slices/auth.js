import { createSlice } from "@reduxjs/toolkit";
import { cookie } from "../../methods";
import { authConstants } from "../../constants";

const initialState = {
	googleId: "",
	googleName: "",
	email: "",
	avatar: "",
	classes: [],
	name: "",
	position: "",
	group: null,
	school: "",
	isSignedUp: false,
	isSignedIn: false,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAllInfo: (state, action) => ({
			...state,
			...action.payload,
		}),
		logout: (state, action) => {
			cookie.deleteCookies(authConstants.ACCESS_TOKEN_KEY_COOKIE);
			cookie.deleteCookies(authConstants.REFRESH_TOKEN_KEY_COOKIE);

			return initialState;
		},
	},
});

export const { setAllInfo, logout } = authSlice.actions;
export default authSlice.reducer;
