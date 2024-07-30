import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import NewsItem from "../NewsItem";

const article = {
	source: { id: null, name: "Google News" },
	author: "Author Name",
	title: "Sample News Title",
	description: "Sample description",
	url: "http://sample.com",
	urlToImage: "http://sample.com/image.jpg",
	publishedAt: "2024-07-29T15:10:24Z",
	content: "Sample content of the news article...",
};

test("renders news item and opens modal on click", () => {
	render(<NewsItem article={article} />);

	expect(screen.getByText(article.title)).toBeInTheDocument();
	expect(screen.getByText("Author:")).toBeInTheDocument();
	expect(screen.getByText(article.author)).toBeInTheDocument();
	expect(screen.getByText("Source:")).toBeInTheDocument();
	expect(screen.getByText(article.source.name)).toBeInTheDocument();
	expect(screen.getByText("Published at:")).toBeInTheDocument();
	expect(
		screen.getByText(new Date(article.publishedAt).toLocaleString())
	).toBeInTheDocument();
	expect(screen.getByText(article.description)).toBeInTheDocument();

	fireEvent.click(screen.getByRole("button", { name: /read more/i }));

	expect(screen.getByText(article.content)).toBeInTheDocument();
	expect(screen.getByText("Read the full article")).toHaveAttribute(
		"href",
		article.url
	);
});
