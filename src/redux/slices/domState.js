import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	leftPanel: false,
	notifyBox: false,
	searchBox: false,
	profileBox: false,
};

export const domStateSlice = createSlice({
	name: "domState",
	initialState,
	reducers: {
		setAllState: (state, action) => ({
			...state,
			...action.payload,
		}),
		showElement: (state, action) => {
			if (state[action.payload] !== undefined)
				state[action.payload] = true;
		},
		hideElement: (state, action) => {
			if (state[action.payload] !== undefined)
				state[action.payload] = false;
		},
		toggleElementState: (state, action) => {
			if (state[action.payload] !== undefined)
				state[action.payload] = !state[action.payload];
		},
	},
});

export const {
	setAllState,
	showElement,
	hideElement,
	toggleElementState,
} = domStateSlice.actions;
export default domStateSlice.reducer;
