import React from "react";
import clsx from "clsx";
import styles from "./ProfileBoxMobile.module.scss";

function ProfileBoxMobile() {
	return (
		<div className="profile-box-mobile">
			<header className="">
				<span>Thông tin</span>
				<i className="fal fa-times"></i>
			</header>

			<div className="">
				<section className="profile-info">
					<div className="left-slide">
						<img src="" alt="" />
					</div>
					<div className="right-slide">
						<span className="">
							<p>Tên:</p>
							<p>Email:</p>
						</span>
						<span>
							<p>Trần Văn Còn</p>
							<p>tranvanconkg@gmail.com</p>
						</span>
					</div>
				</section>
			</div>
		</div>
	);
}

export default ProfileBoxMobile;
