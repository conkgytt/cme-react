import React from "react";
import clsx from "clsx";
import styles from "./NavRightNotLogged.module.scss";
import { Link } from "react-router-dom";

function NavRightNotLogged() {
	return (
		<div className={clsx(styles.navigationBarRight)}>
			<Link to="/auth" className={clsx(styles.loginBtn)}>
				<p>Đăng nhập</p>
			</Link>
		</div>
	);
}

export default NavRightNotLogged;
