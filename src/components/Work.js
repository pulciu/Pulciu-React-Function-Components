import React from "react";
import { filterByCategory, getFavoritesFromLink } from "../api/PortfolioItems";
import WorkEntry from "./WorkEntry";
import WorkNav from "./WorkNav";
import "./Work.css";

const Work = (props) => {
	const [portfolioItems, setPortfolioItems] = React.useState(filterByCategory("uiux"));
	const [favorites, setFavorites] = React.useState([]);
	const [category, setCategory] = React.useState("uiux");
	const [transition, setTransition] = React.useState("");
	const [portfolioUpdate, setPortfolioUpdate] = React.useState();

	const updatePortfolio = (newPortfolio) => {
		setTransition("fadeOut");
		clearTimeout(portfolioUpdate);
		setPortfolioUpdate(
			setTimeout(function () {
				setPortfolioItems([]);
				setPortfolioItems(newPortfolio);
				setTransition("");
			}, 300)
		);
	};

	// Gets called by the heart icon in <WorkEntry />
	const updateFavorites = (newFavorites) => {
		setFavorites(newFavorites);
	};

	// Update the favorites tab right away when removing an item, without the fade in / out animation provided by updatePortfolio()
	const updateFavoritesTab = (newItems) => {
		setPortfolioItems(newItems);
	};

	const updateCategory = (newCategory) => {
		setCategory(newCategory);
	};

	React.useEffect(() => {
		if (props.match.params.favoritesCollection) {
			const favoritesCollection = getFavoritesFromLink(props.match.params.favoritesCollection);
			setPortfolioItems(favoritesCollection);
			setFavorites(favoritesCollection);
			setCategory("favorites");
		}

		return () => {};
	}, [props.match.params.favoritesCollection]);

	return (
		<div className="work rotate-in">
			<WorkNav category={category} updateCategory={updateCategory} favorites={favorites} updatePortfolio={updatePortfolio} />

			<div className="projects-grid">
				<ul className={transition}>
					{portfolioItems.map((p) => (
						<WorkEntry key={portfolioItems.indexOf(p)} item={p} category={category} updateCategory={updateCategory} favorites={favorites} updateFavorites={updateFavorites} updatePortfolio={updatePortfolio} updateFavoritesTab={updateFavoritesTab} />
					))}
				</ul>
			</div>
		</div>
	);
};

export default Work;
