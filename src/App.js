import React, { useState } from "react";
import "./App.scss";
import ColorBox from "./components/ColorBox";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

function App() {
	const [todoList, setTodoList] = useState([
		{ id: 1, title: "hahahahaah" },
		{ id: 2, title: "hihihihi" },
		{ id: 3, title: "heheheheeh" }
	]);

	function handleTodoClick(todo) {
		const index = todoList.find(x => x.id === todo.id);
		if (index < 0) return;

		const newTodoList = [...todoList];
		newTodoList.splice(index, 1);
		setTodoList(newTodoList);
	}

	function handleTodoFormSubmit(formValues) {
		const newTodo = {
			id: todoList.length + 1,
			...formValues
		};
		const newTodoList = [...todoList];
		newTodoList.push(newTodo);
		setTodoList(newTodoList);
	}

	return (
		<div className="app">
			<h1>TodoList</h1>
			<TodoForm onSubmit={handleTodoFormSubmit} />
			<TodoList todos={todoList} onTodoClick={handleTodoClick} />
		</div>
	);
}

export default App;
