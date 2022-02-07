import React from "react";
import NotifyBox from "./NotifyBox";
import SearchBox from "./SearchBox";
import ProfileBox from "./ProfileBox";
import LeftPanel from "./LeftPanel";

function GeneralElement() {
	return (
		<>
			<NotifyBox />
			<SearchBox />
			<ProfileBox />
			<LeftPanel />
		</>
	);
}

export default GeneralElement;
