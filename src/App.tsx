import React, { useEffect, useState } from "react";
import "./App.css";
import {
	IAlbum,
	IComment,
	IPhoto,
	IPost,
	IUser,
} from "./services/services-interfaces.model";
import { GetlifeTable } from "./components/getlife-table/getlife-table.component";
import { serviceFetch } from "./services/services-interfaces.model";
import { ITableColumn } from "./App.model";
import { InputNumber, Menu } from "antd";

function App() {

	/** STATES */

	const [users, setUsers] = useState<IUser[]>();
	const [posts, setPosts] = useState<IPost[]>();
	const [albums, setAlbums] = useState<IAlbum[]>();
	const [comments, setComments] = useState<IComment[]>();
	const [photos, setPhotos] = useState<IPhoto[]>();

	const [postsNumber, setPostsNumber] = useState<number>(5);
	const [albumsNumber, setAlbumsNumber] = useState<number>(5);
	const [selectedKeys, setSelectedKeys] = useState<string[]>(["users"]);

	/** END OF STATES */

	/** EFFECTS */

	useEffect(() => {
		callService("https://jsonplaceholder.typicode.com/users", "users");
		callService("https://jsonplaceholder.typicode.com/posts", "posts");
		callService("https://jsonplaceholder.typicode.com/albums", "albums");
		callService("https://jsonplaceholder.typicode.com/comments", "comments");
		callService("https://jsonplaceholder.typicode.com/photos", "photos");
	}, []);

	/** END OF EFFECTS */

	/** FUNCTIONS */

	/** Function to make all the service calls */
	const callService = async (url: string, type: string) => {
		const response = await serviceFetch(url);
		switch (type) {
			case "users":
				setUsers(response as IUser[]);
				break;
			case "posts":
				setPosts(response as IPost[]);
				break;
			case "albums":
				setAlbums(response as IAlbum[]);
				break;
			case "comments":
				setComments(response as IComment[]);
				break;
			case "photos":
				setPhotos(response as IPhoto[]);
				break;
		}
	};

	/** Function to get the column names */
	const getColumns = (type: string): ITableColumn[] => {
		switch (type) {
			case "users":
				return [
					{
						title: "Nombre",
						dataIndex: "name",
						key: "name",
					},
					{
						title: "Email",
						dataIndex: "email",
						key: "email",
					},
					{
						title: "Nº de publicaciones",
						dataIndex: "posts",
						key: "posts",
					},
				];
			case "posts":
				return [
					{
						title: "Título",
						dataIndex: "title",
						key: "title",
					},
					{
						title: "Autor",
						dataIndex: "author",
						key: "author",
					},
					{
						title: "Nº comentarios",
						dataIndex: "comments",
						key: "comments",
					},
				];
			case "albums":
				return [
					{
						title: "Título",
						dataIndex: "title",
						key: "title",
					},
					{
						title: "Autor",
						dataIndex: "author",
						key: "author",
					},
					{
						title: "Nº de fotos",
						dataIndex: "photos",
						key: "photos",
					},
				];
			default:
				return [];
		}
	};

	/** Function to get the rows information of the tables */
	const getRows = (type: string): Object[] => {
		const response: any[] = [];
		switch (type) {
			case "users":
				users?.forEach((user) => {
					response.push({
						name: user.name,
						email: user.email,
						posts: posts?.filter((post) => post.userId === user.id)?.length,
					});
				});
				break;
			case "posts":
				posts?.forEach((post) => {
					response.push({
						title: post.title,
						author: users?.find((user) => user.id === post.id)?.name,
						comments: comments?.filter((comment) => comment.postId === post.id)
							?.length,
					});
				});
				break;
			case "albums":
				albums?.forEach((album) => {
					response.push({
						title: album.title,
						author: users?.find((user) => user.id === album.userId)?.name,
						photos: photos?.filter((photo) => photo.albumId === album.id)
							?.length,
					});
				});
		}
		return response;
	};

	/** END OF FUNCTIONS */

	/** VARIABLES */

	/** Variable to get the menu items */
	const menuItems = [
		{
			label: "Usuarios",
			key: "users",
		},
		{
			label: "Publicaciones",
			key: "posts",
		},
		{
			label: "Álbumes",
			key: "albums",
		},
	];

	/** END OF VARIABLES */

	/** RETURN */

	return (
		<div className="getlife-app">
			<h1 className="getlife-app__main-title">FETCHING APIS</h1>
			<Menu
				onClick={(e) => {
					setSelectedKeys([e.key]);
				}}
				selectedKeys={selectedKeys}
				mode="horizontal"
				items={menuItems}
			/>
			{users && posts && selectedKeys.includes("users") && (
				<div className="getlife-app__table">
					<h2 className="getlife-app__table-title">Listado de usuarios</h2>
					<GetlifeTable
						columns={getColumns("users")}
						dataSource={getRows("users")}
					></GetlifeTable>
				</div>
			)}
			{posts && users && comments && selectedKeys.includes("posts") && (
				<div className="getlife-app__table">
					<h2 className="getlife-app__table-title">Listado de publicaciones</h2>
					<div className="getlife-app__input-container">
						<span className="getlife-app__input-label">
							¿Cuántos artículos quiere visualizar? (max: {posts.length})
						</span>
						<InputNumber
							min={1}
							max={posts.length}
							defaultValue={postsNumber}
							onChange={(e) => {
								setPostsNumber(e || 1);
							}}
						/>
					</div>
					<GetlifeTable
						columns={getColumns("posts")}
						dataSource={getRows("posts")}
						showRows={postsNumber}
					></GetlifeTable>
				</div>
			)}
			{albums && users && photos && selectedKeys.includes("albums") && (
				<div className="getlife-app__table">
					<h2 className="getlife-app__table-title">Listado de álbumes</h2>
					<div className="getlife-app__input-container">
						<span className="getlife-app__input-label">
							¿Cuántos artículos quiere visualizar? (max: {albums.length})
						</span>
						<InputNumber
							min={1}
							max={albums.length}
							defaultValue={albumsNumber}
							onChange={(e) => {
								setAlbumsNumber(e || 1);
							}}
						/>
					</div>
					<GetlifeTable
						columns={getColumns("albums")}
						dataSource={getRows("albums")}
						showRows={albumsNumber}
					></GetlifeTable>
				</div>
			)}
		</div>
	);
}

export default App;
