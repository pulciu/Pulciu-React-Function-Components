import React from "react";
import axios from "axios";
import WorkEntry from "./WorkEntry";
import WorkNav from "./WorkNav";
import "./Work.css";

const Work = (props) => {
	const [allPortfolioItems, setAllPortfolioItems] = React.useState([]);
	const [portfolioDisplayed, setPortfolioDisplayed] = React.useState([]);
	const [favorites, setFavorites] = React.useState([]);
	const [category, setCategory] = React.useState("uiux");
	const [transition, setTransition] = React.useState("fadeOut");
	const [portfolioUpdate, setPortfolioUpdate] = React.useState();
	const [shareText, setShareText] = React.useState("Copy Link");
	const [searchValue, setSearchValue] = React.useState("");

	React.useEffect(() => {
		// Get the portfolio items
		axios.get("../resources/portfolio.json").then((response) => {
			setAllPortfolioItems(response.data.portfolio);

			// If the current URL contains a favorites collection, display those items, else display the UI/UX category
			if (props.match.params.favoritesCollection) {
				let favoriteIds = props.match.params.favoritesCollection.split("-");
				let favorites = [];

				for (let i = 0; i < favoriteIds.length; i++) {
					favorites.push(response.data.portfolio[parseInt(favoriteIds[i])]);
				}

				setTimeout(function () {
					setPortfolioDisplayed(favorites);
					setFavorites(favorites);
					setCategory("favorites");
					setTransition("");
				}, 300);
			} else {
				setTimeout(function () {
					setPortfolioDisplayed(response.data.portfolio.filter((p) => p.category === "uiux"));
					setTransition("");
				}, 300);
			}
		});
	}, [props.match.params.favoritesCollection]);

	// Update the portfolio items that are being displayed via a quick fade in/out animation
	const updateDisplayedPortfolio = (portfolioItems) => {
		setTransition("fadeOut");
		clearTimeout(portfolioUpdate);
		setPortfolioUpdate(
			setTimeout(function () {
				setPortfolioDisplayed([]);
				setPortfolioDisplayed(portfolioItems);
				setTransition("");
			}, 300)
		);
	};

	const changeCategory = (newCategory) => {
		setCategory(newCategory);

		if (newCategory !== "search") {
			if (newCategory === "favorites") {
				updateDisplayedPortfolio(favorites);
			} else {
				updateDisplayedPortfolio(allPortfolioItems.filter((p) => p.category === newCategory));
			}
			setSearchValue("");
		}
	};

	const searchPortfolio = (e) => {
		setSearchValue(e.target.value);
		updateDisplayedPortfolio(allPortfolioItems.filter((p) => p.title.toLowerCase().includes(e.target.value.toLowerCase())));
	};

	const createFavoritesLink = () => {
		let windowLocation = window.location.href;
		windowLocation = windowLocation.substr(0, windowLocation.lastIndexOf("/work") + 5); // Clean the URL in case it already contains a favorites collection

		for (let i = 0; i < favorites.length; i++) {
			let index = allPortfolioItems.indexOf(favorites[i]);
			windowLocation += i > 0 ? "-" + index : "/" + index;
		}

		// Only works on HTTPS or localhost
		navigator.clipboard.writeText(windowLocation);
		setShareText("Copied!");
		setTimeout(() => {
			setShareText("Copy Link");
		}, 5000);
	};

	// Called when the heart icon of a project is clicked
	const addToFavorites = (portfolioItem) => {
		let newFavorites = [...favorites, portfolioItem];
		setFavorites(newFavorites);
	};

	// Called when the slashed heart icon of a project is clicked
	const removeFromFavorites = (portfolioItem) => {
		let newFavorites = favorites.filter((n) => n !== portfolioItem);
		setFavorites(newFavorites);
		if (category === "favorites") setPortfolioDisplayed(newFavorites);

		if (newFavorites.length === 0) {
			setCategory("uiux");
			updateDisplayedPortfolio(allPortfolioItems.filter((p) => p.category === "uiux"));
		}
	};

	return (
		<div className="work rotate-in">
			<WorkNav createFavoritesLink={createFavoritesLink} searchPortfolio={searchPortfolio} changeCategory={changeCategory} shareText={shareText} searchValue={searchValue} category={category} favorites={favorites} />

			<div className="projects-grid">
				<ul className={transition}>
					{portfolioDisplayed.map((p) => (
						<WorkEntry key={portfolioDisplayed.indexOf(p)} item={p} favorites={favorites} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} />
					))}
				</ul>
			</div>
		</div>
	);
};

export default Work;
