import React from "react";
import { connect } from "react-redux";
import { addTodo } from "../../../session/actions";
import { Input } from "reactstrap";


class ConnectedForm extends React.PureComponent {
    state = {
        title: ""
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { title } = this.state;
        //if (title.trim()) {
        this.props.addTodo({ title });
        this.setState({ title: "" });
        //}
    }
    render() {
        const { title } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <div style={{ padding: "10px 0" }}>
                    <div style={{ width: "16%", float: "right", textAlign: "right" }}>
                        <button type="submit" className="btn btn-secondary" style={{ background: "#fff", color: "#000" }}>Create</button></div>
                    <div style={{ width: "83%" }}><Input
                        type="text"
                        id="title"
                        placeholder="What needs to be done ?"
                        value={title}
                        onChange={this.handleChange}
                    /></div>

                </div>

            </form>
        );
    }
}

const AddTodo = connect(null, { addTodo })(ConnectedForm);

export default AddTodo;
