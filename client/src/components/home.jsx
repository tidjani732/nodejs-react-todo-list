import React, { Component } from "react";
import AddTodo from "./todos/_partials/todo.add";
import TodoList from "./todos/_partials/todo.list";
import TodoUpdateModal from "./todos/_partials/update.todo.modal";
import { connect } from "react-redux";
import { getTodos, notify } from "../session/actions";
import { getSocket } from "../helpers/socket";
import { authService } from "../services/auth.service";
import { sessionService } from "../services/session.service";




class Home extends Component {
    state = {
        users: []
    }
    componentDidMount() {
        var userId = sessionService.getUid();
        this.props.getTodos();
        this.socket = getSocket();
        this.socket.on("assigned_todo", (todo, msg, uid) => {
            if (uid === userId) {
                this.props.notify({ msg: msg, type: "success" }, todo);
            } else {
                this.props.notify({ msg: "", type: "success" }, todo);
            }
        });
    }

    UNSAFE_componentWillMount() {
        authService.getUsers().then(res => {
            if (res.status === 200) {
                this.setState({ users: res.data.users })
            }
        })
    }

    render() {
        return <div className="todo-list">
            <h3 className="text-center mt-3"> React Todo-list</h3>

            <AddTodo />

            <TodoList />

            <TodoUpdateModal users={this.state.users} />
        </div>;
    }
}

export default connect(null, { getTodos, notify })(Home);
