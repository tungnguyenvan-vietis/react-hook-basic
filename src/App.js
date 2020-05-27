import React, { useState, useEffect } from "react";
import "./App.scss";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import PostList from "./components/PostList";

function App() {
	const [todoList, setTodoList] = useState([
		{ id: 1, title: "hahahahaah" },
		{ id: 2, title: "hihihihi" },
		{ id: 3, title: "heheheheeh" }
	]);

	const [postList, setPostList] = useState([]);

	useEffect(() => {
		async function fetchPostList() {
			try {
				const requestURL =
					"http://js-post-api.herokuapp.com/api/posts?_limit=10&_page=1";
				const respone = await fetch(requestURL);
				const responeJSON = await respone.json();
				console.log({ responeJSON });

				const { data } = responeJSON;
				setPostList(data);
			} catch (error) {
				console.log("Fail to load data!");
			}
		}

		console.log("Post List");
		fetchPostList();
	}, []);

	useEffect(() => {
		console.log("TODO List");
	});

	function handleTodoClick(todo) {
		const index = todoList.find(x => x.id === todo.id);
		if (index < 0) return;

		const newTodoList = [...todoList];
		newTodoList.splice(index, 1);
		setTodoList(newTodoList);
	}

	function handleTodoFormSubmit(formValues) {
		if (formValues.title !== "") {
			const newTodo = {
				id: todoList.length + 1,
				...formValues
			};
			const newTodoList = [...todoList];
			newTodoList.push(newTodo);
			setTodoList(newTodoList);
		} else {
			window.alert("Please input title!");
		}
	}

	return (
		<div className="app">
			<h1>Todo</h1>

			<TodoForm onSubmit={handleTodoFormSubmit} />
			<TodoList todos={todoList} onTodoClick={handleTodoClick} />

			<h1>List</h1>
			<PostList posts={postList} />
		</div>
	);
}

export default App;
