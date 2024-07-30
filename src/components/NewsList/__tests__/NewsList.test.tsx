import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import NewsList from "../NewsList";
import * as newsService from "../../../services/newsService";
import { INewsResponse } from "../../../services/newsService";

jest.mock("../../../services/newsService");

const mockNews: INewsResponse = {
	status: "ok",
	totalResults: 1,
	articles: [
		{
			source: { id: null, name: "Google News" },
			author: "Author Name",
			title: "Sample News Title",
			description: "Sample description",
			url: "http://sample.com",
			urlToImage: "http://sample.com/image.jpg",
			publishedAt: "2024-07-29T15:10:24Z",
			content: "Sample content of the news article...",
		},
	],
};

const mockedFetchNews = newsService.fetchNews as jest.MockedFunction<
	typeof newsService.fetchNews
>;

test("renders news list and handles no news", async () => {
	mockedFetchNews.mockResolvedValueOnce(mockNews);

	render(<NewsList />);

	await waitFor(() => {
		expect(screen.getByText("Sample News Title")).toBeInTheDocument();
	});

	mockedFetchNews.mockResolvedValueOnce({
		status: "ok",
		totalResults: 0,
		articles: [],
	});

	const { getByText: getByTextEmpty } = render(<NewsList />);

	await waitFor(() => {
		expect(getByTextEmpty("No News Available")).toBeInTheDocument();
	});
});

test("handles error state", async () => {
	mockedFetchNews.mockRejectedValueOnce(new Error("Failed to fetch news."));

	render(<NewsList />);

	await waitFor(() => {
		expect(screen.getByText("Failed to fetch news.")).toBeInTheDocument();
	});
});
