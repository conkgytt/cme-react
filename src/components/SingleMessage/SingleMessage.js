import React, { useEffect } from "react";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";

import styles from "./SingleMessage.module.scss";
import { singleMessageActions } from "../../redux";

function SingleMessage() {
	const dispatch = useDispatch();
	const singleMessageStore = useSelector((state) => state.singleMessage);
	const state = useSelector((state) => state.singleMessage.state);
	const type = useSelector((state) => state.singleMessage.type);
	const message = useSelector((state) => state.singleMessage.message);

	const denySingleMessageHandle = () => {
		const action = singleMessageActions.setState(false);

		dispatch(action);
	};

	const acceptSingleMessageHandle = () => {
		const action = singleMessageActions.setState(false);

		dispatch(action);
	};

	return (
		<div
			className={clsx(styles.singleMessageWrapper, {
				[styles.show]: state,
			})}
			style={{
				color:
					type === "message"
						? "#006aff"
						: type === "accept"
						? "#00a347"
						: type === "warning"
						? "#ff9500"
						: "",
			}}
		>
			<div className={clsx(styles.singleMessage)}>
				<div className={clsx(styles.contentWrapper)}>
					<div className={clsx(styles.iconWrapper)}>
						{type === "accept" && (
							<i className="fad fa-comment-alt-check"></i>
						)}
						{type === "message" && (
							<i className="fad fa-comments"></i>
						)}
						{type === "warning" && (
							<i className="fad fa-exclamation-triangle"></i>
						)}
						{type === "error" && (
							<i className="fad fa-exclamation-circle"></i>
						)}
					</div>

					<div className={clsx(styles.messageContentWrapper)}>
						<h3 className={clsx(styles.messageType)}>
							{type === "accept"
								? "Xác nhận"
								: type === "message"
								? "Tin nhắn"
								: type === "warning"
								? "Cảnh báo"
								: "Sự cố"}
						</h3>
						<p className={clsx(styles.messageContent)}>{message}</p>
					</div>
				</div>

				<div className={clsx(styles.handleWrapper)}>
					{type === "accept" && (
						<button
							className={clsx(styles.handleSuccessBtn)}
							onClick={acceptSingleMessageHandle}
						>
							<p>Oke</p>
						</button>
					)}
					<button
						className={clsx(styles.handleFailureBtn)}
						onClick={denySingleMessageHandle}
					>
						<p>Đóng</p>
					</button>
				</div>
			</div>
		</div>
	);
}

export default SingleMessage;
