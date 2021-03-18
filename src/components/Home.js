import React from "react";
import "./Home.css";

const Home = () => {
	const [autoplay, setAutoplay] = React.useState(true);
	const [slide, setSlide] = React.useState(0);

	React.useEffect(() => {
		const slider = setInterval(() => {
			let nextSlide = slide === 3 ? 0 : slide + 1;
			if (autoplay) setSlide(nextSlide);
			else clearInterval(slider);
		}, 5000);
		return () => {
			clearInterval(slider);
		};
	}, [autoplay, slide]);

	const changeSlide = (index) => {
		setAutoplay(false);
		setSlide(index);
	};

	return (
		<div className="home rotate-in">
			<div className="home-container">
				<div className="content">
					<h2>How can we help?</h2>
					<ul className="title">
						<li className={slide === 0 ? "selected" : ""} onClick={() => changeSlide(0)}>
							UI/UX
						</li>
						<li className={slide === 1 ? "selected" : ""} onClick={() => changeSlide(1)}>
							Dev
						</li>
						<li className={slide === 2 ? "selected" : ""} onClick={() => changeSlide(2)}>
							Marketing
						</li>
						<li className={slide === 3 ? "selected" : ""} onClick={() => changeSlide(3)}>
							Identity
						</li>
					</ul>
					<ul className="description">
						<li className={slide === 0 ? "selected" : ""}>Wireframes &gt; Design Style &gt; Final Designs for web and mobile apps.</li>
						<li className={slide === 1 ? "selected" : ""}>Front-end and back-end development. Experience with both PHP and Javascript based solutions.</li>
						<li className={slide === 2 ? "selected" : ""}>Print and digital marketing collateral (broshures, flyers, presentation decks, video content and more).</li>
						<li className={slide === 3 ? "selected" : ""}>Logos, brand guides, style scapes and more.</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Home;
