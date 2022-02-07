import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/auth";
import singleMessage from "./slices/singleMessage";
import domState from "./slices/domState";

const store = configureStore({
	reducer: {
		auth,
		singleMessage,
		domState,
	},
});

export default store;
