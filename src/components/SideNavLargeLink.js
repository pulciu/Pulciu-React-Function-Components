import React from "react";
import { NavLink } from "react-router-dom";
import "./SideNavLargeLink.css";

const NavItem = (props) => {
	return (
		<li className="link" onClick={props.hideMobileNav}>
			<NavLink exact={props.exact} to={props.path}>
				<div className="selected">
					<div className="bar"></div>
					{props.title}
				</div>
				<div>
					<div className="bar"></div>
					{props.title}
				</div>
			</NavLink>
		</li>
	);
};

export default NavItem;
