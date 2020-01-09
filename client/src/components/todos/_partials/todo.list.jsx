import React from "react";
import { connect } from "react-redux";
import { Badge, Table, Alert } from "reactstrap";
import { deleteTodo, openEditModal } from "../../../session/actions";
import { util } from "../../../helpers/helper";



const ConnectedList = ({ todos, deleteTodo, ...props }) => <>
    <Alert color="primary" className="alert-st">
        {`${todos.length} Task${todos.length === 1 ? "" : "s"} :`}
    </Alert>
    <Table borderless>
        <tbody>
            {todos.map((todo, key) => (
                <tr key={key}>
                    <th scope="row" className="w-5">{key + 1}</th>
                    <td>
                        <span className={todo.status ? "text-success" : "text-danger"}>{todo.title} </span> <br />
                        {todo.assigned_to && <span>Assigned to: {todo.assigned_to.name}</span>}
                    </td>
                    <td className="mw-20"> <Badge className={"badge text-white " + (todo.status ? "badge-success" : "badge-danger")}>{!todo.status && "un"}done</Badge></td>
                    <td className="mw-20"><a className="badge badge-primary text-white"
                        onClick={() => props.openEditModal(todo)}>edit</a></td>
                    <td className="mw-20"><a className="badge badge-primary text-white"
                        onClick={() => deleteTodo(todo)}>delete</a></td>
                </tr>
            ))}
        </tbody>
    </Table>
</>


const TodoList = connect(util.mapStateToProps("todos"), { deleteTodo, openEditModal })(ConnectedList);

export default TodoList;
