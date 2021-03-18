import React from "react";
import "./PickColorScheme.css";

const PickColorScheme = (props) => {
	const changeColorScheme = (colorScheme) => {
		props.hideMobileNav();

		document.body.classList.remove("show-color-schemes", "cs1", "cs2", "cs3");
		document.body.classList.add(colorScheme);
	};

	return (
		<div className="color-schemes">
			<div>
				<h2>Please pick a color scheme:</h2>
				<ul>
					<li onClick={() => changeColorScheme("cs1")}></li>
					<li onClick={() => changeColorScheme("cs2")}></li>
					<li onClick={() => changeColorScheme("cs3")}></li>
				</ul>
			</div>
		</div>
	);
};

export default PickColorScheme;
