import clsx from "clsx";
import { Routes, Route } from "react-router-dom";

import Authenticate from "../Authenticate/Authenticate";
import Home from "../Home/Home";
import styles from "./App.module.scss";

function App() {
	return (
		<div className={clsx(styles.app)}>
			<Routes>
				<Route path="/" exact element={<Home />} />
				<Route path="/auth/*" element={<Authenticate />} />
			</Routes>
		</div>
	);
}

export default App;
