import React from "react";
import clsx from "clsx";

import styles from "./Home.module.scss";
import Navigation from "../Navigation/Navigation";

function Home() {
	return (
		<div className={clsx(styles.homePage)}>
			<Navigation />
		</div>
	);
}

export default Home;
