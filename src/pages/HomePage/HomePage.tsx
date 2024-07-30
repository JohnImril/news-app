import React from "react";
import NewsList from "../../components/NewsList/NewsList";

import "./HomePage.css";

const HomePage: React.FC = () => (
	<div className="home-page">
		<h1>Top Headlines</h1>
		<NewsList />
	</div>
);

export default HomePage;
