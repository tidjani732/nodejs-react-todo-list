import { todoService } from "../../services/todo.service";
import { TODO_LOADED, SESSION_LOADED, SESSION_ERROR, TODO_ADDED, CLOSE_ERROR, TODO_DELETED, TODO_UPDATED, CLOSE_MODAL, TODO_OPEN_EDIT } from "../../helpers/constants";
import { sessionService } from "../../services/session.service";

export function getSessionData() {
    var sesUser = sessionService.getSessionUser();
    return { type: SESSION_LOADED, payload: sesUser }
}
export function addTodo(data) {
    return async function (dispatch) {
        try {
            const res = await todoService.addTodo(data);
            if (res.status === 201 && res.data.todo)
                dispatch({ type: TODO_ADDED, payload: res.data.todo });
            else if (res.status === 422)
                dispatch({ type: SESSION_ERROR, payload: { msg: "Todo must have a title !" } });
            else
                dispatch({ type: SESSION_ERROR, payload: { msg: "Error on adding todo !" } });
        }
        catch (er) {
            return dispatch({ type: SESSION_ERROR, payload: { msg: "Error on adding todo, verify your internet please!" } });
        }
    }
};

export function getTodos() {
    return async function (dispatch) {
        try {
            const res = await todoService.loadTodos();
            if (res.data.todos) {
                dispatch({ type: TODO_LOADED, payload: res.data.todos });
            }
            else
                dispatch({ type: SESSION_ERROR, payload: { msg: "Session expired !" } });
        }
        catch (er) {
            return dispatch({ type: SESSION_ERROR, payload: { msg: "Todos not loaded !" } });
        }
    };
}

export function deleteTodo(todo) {
    return function (dispatch) {
        console.log(todo);

        return todoService.deleteTodo(todo).then(res => {
            if (res.status === 200 && res.data.success) {
                dispatch({ type: TODO_DELETED, payload: todo })
            }
        }).catch(er => dispatch({ type: SESSION_ERROR, payload: { msg: "Todos not deleted, Verify your internet !" } }))
    };
}

export function editTodo(todo) {
    return function (dispatch) {
        return todoService.updateTodo(todo).then(res => {
            if (res.status === 200 && res.data.success) {
                // console.log(res.data);
                dispatch({ type: TODO_UPDATED, payload: res.data.todo })
            }
        }).catch(er => dispatch({ type: SESSION_ERROR, payload: { msg: "Unable to update Todo, Verify your internet !" } }))
    };
}
export function openEditModal(todo) {
    return { type: TODO_OPEN_EDIT, payload: todo }
}

export function closeError() {
    return function (dispatch) {
        return setTimeout(() => {
            dispatch({ type: CLOSE_ERROR, payload: {} })
        }, 4000)
    }
};

export function notify(notification, todo) {
    return function (dispatch) {
        dispatch({ type: SESSION_ERROR, payload: notification })
        dispatch({ type: TODO_UPDATED, payload: todo });
    }
};

export function closeModal() {
    return { type: CLOSE_MODAL, payload: {} }
};
