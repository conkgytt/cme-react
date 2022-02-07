import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

import styles from "./SearchBox.module.scss";
import { domStateActions } from "../../redux";

function SearchBox() {
	const dispatch = useDispatch();

	const isShowed = useSelector((state) => state.domState.searchBox);
	const [searchValue, setSearchValue] = useState("");

	const searchInputRef = useRef();

	const handleHideSearchBox = () =>
		dispatch(domStateActions.hideElement("searchBox"));

	useEffect(() => {
		if (isShowed && searchInputRef.current)
			searchInputRef.current.focus();
	}, [isShowed]);

	return (
		<div
			className={clsx(styles.searchBox, {
				[styles.show]: isShowed,
			})}
		>
			<div className={clsx(styles.searchBar)}>
				<input
					ref={searchInputRef}
					placeholder="Tìm kiếm vài thứ..."
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					autoFocus
				/>

				<i
					className={clsx(
						styles.resetValueIcon,
						"far fa-times-circle"
					)}
					onClick={() => setSearchValue("")}
				></i>
				<i className={clsx(styles.searchIcon, "far fa-search")}></i>
			</div>

			<ul className={clsx(styles.searchResultList)}></ul>

			<div
				className={clsx(styles.background)}
				onClick={handleHideSearchBox}
			></div>
		</div>
	);
}

export default SearchBox;
