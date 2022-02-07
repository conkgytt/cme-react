import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	state: false,
	message:
		"Qui voluptate esse eu excepteur consequat excepteur non Lorem est aliquip incididunt amet dolore.",
	type: "accept", // or error or warning or accept
};

export const singleMessageSlice = createSlice({
	name: "singleMessage",
	initialState,
	reducers: {
		setSingleMessage: (state, action) => ({
			...state,
			...action.payload,
		}),
		setState: (state, action) => {
			state.state = !!action.payload;
		},
		setType: (state, action) => {
			state.type = !!action.payload;
		},
		setMessage: (state, action) => {
			state.message = action.payload;
		},
	},
});

export const { setSingleMessage, setState, setType, setMessage } =
	singleMessageSlice.actions;
export default singleMessageSlice.reducer;
