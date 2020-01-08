import React, { Component } from "react";
import TodoList from "./_partials/todo.list";
import AddTodo from "./_partials/todo.add";
import TodoUpdateModal from "./_partials/update.todo.modal";


class Todos extends Component {
    state = {}
    openUpdate = todo => {
        this.setState({ openModal: true, actualTodo: todo })
    }
    render() {
        return <div className="todo-list">
            <AddTodo />

            <TodoList openUpdate={this.openUpdate} />

            <TodoUpdateModal />
        </div>;
    }
}

export default Todos;