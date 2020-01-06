import React, { Component } from "react";
import AddTodo from "./todos/_partials/todo.add";
import TodoList from "./todos/_partials/todo.list";
import TodoUpdateModal from "./todos/_partials/update.todo.modal";
import { connect } from "react-redux";
import { getTodos } from "../session/actions";



class Home extends Component {
    state = {}
    componentDidMount() {
        this.props.getTodos()
    }

    render() {
        return <div className="todo-list">
            <h3 className="text-center mt-3"> React Todo-list</h3>
            <AddTodo />

            <TodoList />

            <TodoUpdateModal />
        </div>;
    }
}

export default connect(null, { getTodos })(Home);