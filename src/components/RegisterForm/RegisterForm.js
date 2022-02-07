import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import { authActions, singleMessageActions } from "../../redux";
import { ACCESS_TOKEN_KEY_COOKIE } from "../../constants/auth";
import { cookie, transformer } from "../../methods";
import ListField from "./ListField";
import styles from "./RegisterForm.module.scss";
import TextField from "./TextField";

function RegisterForm() {
	const getInitState = (value) => ({
		value,
		errorMessage: "",
	});
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [name, setName] = useState(getInitState(""));
	const [group, setGroup] = useState(getInitState(""));
	const [position, setPosition] = useState(getInitState("student"));
	const [school, setSchool] = useState(getInitState(""));
	const [classes, setClasses] = useState(getInitState(""));

	const authInfo = useSelector((state) => state.auth);

	const ranks = [
		{
			value: "student",
			display: "Học sinh",
		},
		{
			value: "teacher",
			display: "Giáo viên",
		},
		{
			value: "mainTeacher",
			display: "Giáo viên chủ nhiệm",
		},
		{
			value: "leaderSubject",
			display: "Tổ trưởng chuyên môn",
		},
		{
			value: "adminSchool",
			display: "Ban giám hiệu",
		},
	];

	let errorsRef = useRef([1, 2, 3, 4]);
	const errors = errorsRef.current;

	const requiredErrorMessage = "Thông tin này là bắt buộc.";

	const handleSubmitRegister = () => {
		const inputsValueCheck = () => {
			setName((prev) => ({
				...prev,
				errorMessage: prev.value ? "" : requiredErrorMessage,
			}));

			setGroup((prev) => ({
				...prev,
				errorMessage: prev.value ? "" : requiredErrorMessage,
			}));

			setSchool((prev) => ({
				...prev,
				errorMessage: prev.value ? "" : requiredErrorMessage,
			}));

			setClasses((prev) => ({
				...prev,
				errorMessage: prev.value ? "" : requiredErrorMessage,
			}));
		};
		inputsValueCheck();

		// handle submit api...
		if (!errors?.length) {
			const accessToken = cookie.getCookie(ACCESS_TOKEN_KEY_COOKIE);
			const registerUrl = `https://cons-meeting-education.herokuapp.com/auth/register`;
			const registerInfo = {
				googleId: authInfo.googleId,
				googleName: authInfo.googleName,
				name: name.value,
				avatar: authInfo.avatar,
				email: authInfo.email,
				position: position.value,
				group: group.value,
				classes:
					position.value === "student"
						? [classes.value.trim().toUpperCase()]
						: classes.value
								.split(";")
								.map((className) =>
									className.trim().toUpperCase()
								),
				school: school.value,
				isSignedIn: true,
				isSignedUp: true,
			};
			const registerOptions = {
				method: "POST",
				headers: {
					authorization: "Bearer " + accessToken,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(registerInfo),
			};

			fetch(registerUrl, registerOptions)
				.then((res) => res.json())
				.then((successSignUp) => {
					if (successSignUp) {
						const newAuthInfo =
							transformer.tokenPayload(registerInfo);
						const setAuthInfoActions =
							authActions.setAllInfo(newAuthInfo);
						const singleMessageAction =
							singleMessageActions.setSingleMessage({
								state: true,
								type: "message",
								message: "Đăng ký thành công.",
							});

						dispatch(setAuthInfoActions);
						dispatch(singleMessageAction);
						navigate("/");
					}
				});
		}
	};

	const receiveError = (id, type = "add") => {
		if (type === "add") {
			const idWasExist = errorsRef.current.find(
				(errorId) => errorId === id
			);

			if (!idWasExist) {
				errorsRef.current.push(id);
			}
		} else {
			errorsRef.current = errorsRef.current.filter(
				(errorId) => errorId !== id
			);
		}
	};

	const submitButtonRef = useRef();

	return (
		<form action="" className={clsx(styles.profileRegisterForm)}>
			<h3 className={clsx(styles.profileFormTitle)}>
				Thông tin đăng ký
			</h3>
			<TextField
				id={1}
				label="Họ và tên"
				icon={<i className="fad fa-user-alt"></i>}
				state={name}
				setState={setName}
				errorMessage={requiredErrorMessage}
				isRequired
				minLength={2}
				maxLength={20}
				sendErrorHandle={receiveError}
			/>
			<ListField
				label="Vị trí"
				icon={<i className="fad fa-briefcase"></i>}
				list={ranks}
				currentItem={position}
				setCurrentItem={setPosition}
			/>
			{position.value === "student" && (
				<TextField
					id={2}
					label="Nhóm (tổ)"
					icon={<i className="fas fa-user-friends"></i>}
					state={group}
					setState={setGroup}
					isRequired
					maxLength={20}
					sendErrorHandle={receiveError}
				/>
			)}

			{position.value !== "adminSchool" && (
				<TextField
					id={3}
					label={
						position.value === "student"
							? "Lớp học"
							: "Các lớp giảng dạy"
					}
					icon={<i className="fad fa-list-ul"></i>}
					state={classes}
					setState={setClasses}
					alert={
						position.value !== "student" && (
							<>
								*Lưu ý: Mỗi lớp cách nhau bởi dấu chấm phẩy ";"{" "}
								<br />
								Ví dụ: 12A12;12A15.
							</>
						)
					}
					isRequired
					minLength={2}
					maxLength={40}
					sendErrorHandle={receiveError}
				/>
			)}

			<TextField
				id={4}
				label="Trường học"
				icon={<i className="fad fa-school"></i>}
				state={school}
				setState={setSchool}
				errorMessage={requiredErrorMessage}
				isRequired
				minLength={6}
				maxLength={60}
				sendErrorHandle={receiveError}
			/>
			<button
				ref={submitButtonRef}
				type="button"
				className={clsx(styles.submitRegisterBtn)}
				onClick={handleSubmitRegister}
			>
				<p>Đăng ký</p>
			</button>
		</form>
	);
}

export default RegisterForm;
