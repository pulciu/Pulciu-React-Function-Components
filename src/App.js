import React from "react";
import { Route, HashRouter } from "react-router-dom";
import Home from "./components/Home";
import Work from "./components/Work";
import About from "./components/About";
import Contact from "./components/Contact";
import SideNavLarge from "./components/SideNavLarge";
import SideNavSmall from "./components/SideNavSmall";
import MobileHeader from "./components/MobileHeader";
import PickColorScheme from "./components/PickColorScheme";
import BackgroundGradients from "./components/BackgroundGradients";
import MobileCopyright from "./components/MobileCopyright";

const App = () => {
	const toggleMobileNav = () => (document.body.classList.contains("show-mobile-nav") ? document.body.classList.remove("show-mobile-nav") : document.body.classList.add("show-mobile-nav"));
	const hideMobileNav = () => document.body.classList.remove("show-mobile-nav");

	return (
		<HashRouter>
			<BackgroundGradients />
			<PickColorScheme hideMobileNav={hideMobileNav} />
			<MobileHeader toggleMobileNav={toggleMobileNav} />
			<SideNavLarge hideMobileNav={hideMobileNav} />
			<SideNavSmall />

			<div className="pages-container perspective">
				<Route exact path="/" component={Home} />
				<Route path="/work/:favoritesCollection?" component={Work} />
				<Route path="/about" component={About} />
				<Route path="/contact" component={Contact} />
			</div>

			<MobileCopyright />
		</HashRouter>
	);
};

export default App;
