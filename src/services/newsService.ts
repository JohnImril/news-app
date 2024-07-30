const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
if (!API_KEY) {
	throw new Error("REACT_APP_NEWS_API_KEY is not set");
}
const BASE_URL = "https://newsapi.org/v2";

export interface IArticle {
	source: {
		id: string | null;
		name: string;
	};
	author: string;
	title: string;
	description: string;
	url: string;
	urlToImage: string | null;
	publishedAt: string;
	content: string;
}

export interface INewsResponse {
	status: string;
	totalResults: number;
	articles: IArticle[];
}

const fetchData = async (
	url: string,
	params: Record<string, string>
): Promise<INewsResponse> => {
	const queryString = new URLSearchParams({
		...params,
		apiKey: API_KEY,
	}).toString();
	const response = await fetch(`${url}?${queryString}`);
	if (!response.ok) {
		throw new Error(`Error fetching data: ${response.statusText}`);
	}
	const data = await response.json();
	return data;
};

export const fetchNews = async (): Promise<INewsResponse> => {
	return fetchData(`${BASE_URL}/top-headlines`, { country: "us" });
};
