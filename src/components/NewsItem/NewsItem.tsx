import React from "react";
import { Modal, Button, Card } from "antd";

import "./NewsItem.css";

interface IProps {
	article: {
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
	};
}

const NewsItem: React.FC<IProps> = ({
	article: {
		source,
		author,
		title,
		description,
		url,
		urlToImage,
		publishedAt,
		content,
	},
}) => {
	const [isModalVisible, setIsModalVisible] = React.useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	return (
		<Card
			hoverable
			style={{ marginBottom: "20px" }}
			cover={urlToImage && <img alt={title} src={urlToImage} />}
		>
			<h2>{title}</h2>
			<p>
				<strong>Author:</strong> {author}
			</p>
			<p>
				<strong>Source:</strong> {source.name}
			</p>
			<p>
				<strong>Published at:</strong>{" "}
				{new Date(publishedAt).toLocaleString()}
			</p>
			<p>{description}</p>
			<Button type="primary" onClick={showModal}>
				Read more
			</Button>
			<Modal
				title={title}
				open={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<p>
					<strong>Author:</strong> {author}
				</p>
				<p>
					<strong>Source:</strong> {source.name}
				</p>
				<p>
					<strong>Published at:</strong>{" "}
					{new Date(publishedAt).toLocaleString()}
				</p>
				{urlToImage && (
					<img
						src={urlToImage}
						alt={title}
						style={{ width: "100%" }}
					/>
				)}
				<p>{content}</p>
				<a href={url} target="_blank" rel="noopener noreferrer">
					Read the full article
				</a>
			</Modal>
		</Card>
	);
};

export default NewsItem;
