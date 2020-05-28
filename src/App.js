import React, { useState, useEffect } from "react";
import "./App.scss";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import PostList from "./components/PostList";
import Pagination from "./components/Pagination";
import queryString from "query-string";
import PostFiltersForm from "./components/PostFiltesForm";
import Clock from "./components/Clock";

function App() {
	const [todoList, setTodoList] = useState([
		{ id: 1, title: "hahahahaah" },
		{ id: 2, title: "hihihihi" },
		{ id: 3, title: "heheheheeh" }
	]);

	const [postList, setPostList] = useState([]);

	const [pagination, setPagination] = useState({
		_page: 1,
		_limit: 10,
		totalRows: 1
	});

	const [filters, setFilters] = useState({
		_limit: 10,
		_page: 1
	});

	useEffect(() => {
		async function fetchPostList() {
			try {
				const paramsString = queryString.stringify(filters);
				const requestURL = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
				const respone = await fetch(requestURL);
				const responeJSON = await respone.json();
				const { data, pagination } = responeJSON;
				setPostList(data);
				setPagination(pagination);
			} catch (error) {
				console.log("Fail to load data!", error.message);
			}
		}

		fetchPostList();
	}, [filters]);

	// useEffect(() => {
	// 	console.log("TODO List");
	// });

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

	function handlePageChange(newPage) {
		setFilters({
			...filters,
			_page: newPage
		});
	}

	function handleFiltersChange(newFilters) {
		setFilters({
			...filters,
			_page: 1,
			title_like: newFilters.searchTerm
		});
	}

	const [showClock, setShowClock] = useState(true);

	return (
		<div className="app">
			{showClock && <Clock />}
			<button onClick={() => setShowClock(false)}>Hide clock</button>

			<h1>Todo</h1>
			<TodoForm onSubmit={handleTodoFormSubmit} />
			<TodoList todos={todoList} onTodoClick={handleTodoClick} />
			<h1>List</h1>
			<PostFiltersForm onSubmit={handleFiltersChange} />
			<PostList posts={postList} />
			<h1>Pagination</h1>
			<Pagination
				pagination={pagination}
				onPageChange={handlePageChange}
			/>
		</div>
	);
}

export default App;
