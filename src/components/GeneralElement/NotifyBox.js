import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";

import styles from "./NotifyBox.module.scss";
import { domStateActions } from "../../redux";

function NotifyBox() {
	const dispatch = useDispatch();

	const avatar = useSelector((state) => state.auth.avatar);
	const notifyBoxState = useSelector((state) => state.domState.notifyBox);

	const handleHideNotifyBox = () =>
		dispatch(domStateActions.hideElement("notifyBox"));

	const [notifyList, setNotifyList] = useState([
		{
			title: "Ad velit est consectetur elit sunt nulla in in nostrud dolore dolor dolor laborum.",
			content:
				"Et ullamco Lorem nisi cupidatat.Adipisicing cillum occaecat adipisicing tempor duis commodo et irure amet elit fugiat nulla ipsum tempor.Amet fugiat commodo consectetur magna in occaecat exercitation. Exercitation reprehenderit tempor aliquip nostrud ea eu nulla.",
			img: avatar,
		},
		{
			title: "Ad velit est consectetur elit sunt nulla in in nostrud dolore dolor dolor laborum.",
			content:
				"Et ullamco Lorem nisi cupidatat.Adipisicing cillum occaecat adipisicing tempor duis commodo et irure amet elit fugiat nulla ipsum tempor.Amet fugiat commodo consectetur magna in occaecat exercitation. Exercitation reprehenderit tempor aliquip nostrud ea eu nulla.",
			img: avatar,
		},
		{
			title: "Ad velit est consectetur elit sunt nulla in in nostrud dolore dolor dolor laborum.",
			content:
				"Et ullamco Lorem nisi cupidatat.Adipisicing cillum occaecat adipisicing tempor duis commodo et irure amet elit fugiat nulla ipsum tempor.Amet fugiat commodo consectetur magna in occaecat exercitation. Exercitation reprehenderit tempor aliquip nostrud ea eu nulla.",
			img: avatar,
		},
		{
			title: "Ad velit est consectetur elit sunt nulla in in nostrud dolore dolor dolor laborum.",
			content:
				"Et ullamco Lorem nisi cupidatat.Adipisicing cillum occaecat adipisicing tempor duis commodo et irure amet elit fugiat nulla ipsum tempor.Amet fugiat commodo consectetur magna in occaecat exercitation. Exercitation reprehenderit tempor aliquip nostrud ea eu nulla.",
			img: avatar,
		},
		{
			title: "Ad velit est consectetur elit sunt nulla in in nostrud dolore dolor dolor laborum.",
			content:
				"Et ullamco Lorem nisi cupidatat.Adipisicing cillum occaecat adipisicing tempor duis commodo et irure amet elit fugiat nulla ipsum tempor.Amet fugiat commodo consectetur magna in occaecat exercitation. Exercitation reprehenderit tempor aliquip nostrud ea eu nulla.",
			img: avatar,
		},
		{
			title: "Ad velit est consectetur elit sunt nulla in in nostrud dolore dolor dolor laborum.",
			content:
				"Et ullamco Lorem nisi cupidatat.Adipisicing cillum occaecat adipisicing tempor duis commodo et irure amet elit fugiat nulla ipsum tempor.Amet fugiat commodo consectetur magna in occaecat exercitation. Exercitation reprehenderit tempor aliquip nostrud ea eu nulla.",
			img: avatar,
		},
		{
			title: "Ad velit est consectetur elit sunt nulla in in nostrud dolore dolor dolor laborum.",
			content:
				"Et ullamco Lorem nisi cupidatat.Adipisicing cillum occaecat adipisicing tempor duis commodo et irure amet elit fugiat nulla ipsum tempor.Amet fugiat commodo consectetur magna in occaecat exercitation. Exercitation reprehenderit tempor aliquip nostrud ea eu nulla.",
			img: avatar,
		},
		{
			title: "Ad velit est consectetur elit sunt nulla in in nostrud dolore dolor dolor laborum.",
			content:
				"Et ullamco Lorem nisi cupidatat.Adipisicing cillum occaecat adipisicing tempor duis commodo et irure amet elit fugiat nulla ipsum tempor.Amet fugiat commodo consectetur magna in occaecat exercitation. Exercitation reprehenderit tempor aliquip nostrud ea eu nulla.",
			img: avatar,
		},
		{
			title: "Ad velit est consectetur elit sunt nulla in in nostrud dolore dolor dolor laborum.",
			content:
				"Et ullamco Lorem nisi cupidatat.Adipisicing cillum occaecat adipisicing tempor duis commodo et irure amet elit fugiat nulla ipsum tempor.Amet fugiat commodo consectetur magna in occaecat exercitation. Exercitation reprehenderit tempor aliquip nostrud ea eu nulla.",
			img: avatar,
		},
	]);

	return (
		<div
			className={clsx(styles.notifyBox, {
				[styles.show]: notifyBoxState,
			})}
		>
			<header>
				<span>Thông báo</span>
				<i
					className="fas fa-chevron-down"
					onClick={handleHideNotifyBox}
				></i>
			</header>

			<div className={clsx(styles.notifyListWrap)}>
				<ul className={clsx(styles.notifyList)}>
					{notifyList.map((notify, index) => (
						<li className={clsx(styles.notifyItem)} key={index}>
							<img
								className={clsx(styles.thumb)}
								src={avatar}
								alt={notify.title}
								title={notify.title}
							/>

							<div className={clsx(styles.contentWrapper)}>
								<h3 className={clsx(styles.notifyTitle)}>
									{notify.title}
								</h3>
								<p className={clsx(styles.notifyContent)}>
									{notify.content}
								</p>
							</div>

							<div className={clsx(styles.removeNotifyBtn)}>
								<i className={clsx("fal fa-times")}></i>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default NotifyBox;
