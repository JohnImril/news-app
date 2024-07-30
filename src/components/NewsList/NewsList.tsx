import React, { useEffect, useState } from "react";
import { Empty } from "antd";

import NewsItem from "../NewsItem/NewsItem";
import { fetchNews, IArticle } from "../../services/newsService";

import "./NewsList.css";

const NewsList: React.FC = () => {
	const [news, setNews] = useState<IArticle[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const getNews = async () => {
			try {
				const data = await fetchNews();
				setNews(data.articles);
			} catch (err) {
				setError("Failed to fetch news.");
			}
		};
		getNews();
	}, []);

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<div className="news-list">
			{news.length > 0 ? (
				news.map((article, index) => (
					<NewsItem key={index} article={article} />
				))
			) : (
				<Empty description="No News Available" />
			)}
		</div>
	);
};

export default NewsList;
