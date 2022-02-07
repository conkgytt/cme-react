import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import clsx from "clsx";

import styles from "./Authenticate.module.scss";
import loginThumb from "../../img/login-thumb.svg";
import registerThumb from "../../img/register-thumb.svg";
import LoginSlide from "../LoginSlide/LoginSlide";
import RegisterSlide from "../RegisterSlide/RegisterSlide";

function Authenticate() {
	return (
		<div className={clsx(styles.authCtn)}>
			<div className={clsx(styles.authBox)}>
				<div className={clsx(styles.thumbSlide)}>
					<Routes>
						<Route
							path="/*"
							element={<img src={loginThumb} alt="" />}
						/>
						<Route
							path="/register"
							element={<img src={registerThumb} alt="" />}
						/>
					</Routes>
				</div>

				<div className={clsx(styles.authSlide)}>
					<Routes>
						<Route path="/*" element={<LoginSlide />} />
						<Route path="/register" element={<RegisterSlide />} />
					</Routes>
				</div>

				{/* Back to homePage */}
				<Link className={clsx(styles.backToHomePageBtn)} to="/">
					<i className="fas fa-caret-left"></i>
					<i className="fas fa-home-lg-alt"></i>
				</Link>
			</div>
		</div>
	);
}

export default Authenticate;
