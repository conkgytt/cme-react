import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./styles/styles.scss";
import { store } from "./redux";

import App from "./components/App/App";
import Services from "./components/Services/Services";
import SingleMessage from "./components/SingleMessage/SingleMessage";
import GeneralElement from "./components/GeneralElement/GeneralElement";

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<App />
				<SingleMessage />
				<GeneralElement />
				<Services />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);

reportWebVitals();
