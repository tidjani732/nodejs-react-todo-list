import {
    TODO_ADDED, TODO_LOADED, TODO_UPDATED,
    TODO_DELETED, SESSION_ERROR, CLOSE_ERROR, CLOSE_MODAL, TODO_OPEN_EDIT, SESSION_LOADED
} from "../../helpers/constants";
import { sessionService } from "../../services/session.service";



const initialState = {
    todos: [],
    sesUser: {},
    new_error: {},
    todo: {}, //currently edited todo
    modalOpen: "",
    userId: sessionService.getUid()
};
function rootReducer(state = initialState, action) {
    const { payload } = action;
    if (action.type === SESSION_LOADED) {
        return Object.assign({}, state, {
            sesUser: state.sesUser = payload
        });
    }
    if (action.type === TODO_ADDED) {
        return Object.assign({}, state, {
            todos: state.todos.concat(payload)
        });
    }

    if (action.type === TODO_LOADED) {
        console.log(payload);
        return Object.assign({}, state, {
            todos: state.todos.concat(payload)
        });
    }
    if (action.type === TODO_OPEN_EDIT) {
        return Object.assign({}, state, {
            todo: state.todo = payload,
            modalOpen: state.modalOpen = "TodoUpdateModal"
        });
    }
    if (action.type === TODO_UPDATED) {
        console.log(payload, payload.user, "-----", state.userId);

        if (payload.user === state.userId || payload.assigned_to && payload.assigned_to._id === state.userId) {
            return Object.assign({}, state, {
                todos: state.todos.filter(x => x._id !== payload._id).concat(payload)
            });
        } else if (payload.user !== state.userId || (payload.assigned_to && payload.assigned_to._id !== state.userId)) {
            return Object.assign({}, state, {
                todos: state.todos.filter(x => x._id !== payload._id)
            });
        }

    }
    if (action.type === TODO_DELETED) {
        return Object.assign({}, state, {
            todos: state.todos.filter(x => x._id !== payload._id)
        });
    }

    if (action.type === SESSION_ERROR) {
        return Object.assign({}, state, {
            new_error: state.new_error = payload
        });
    }
    if (action.type === CLOSE_ERROR) {
        return Object.assign({}, state, {
            new_error: state.new_error = {}
        });
    }
    if (action.type === CLOSE_MODAL) {
        return Object.assign({}, state, {
            modalOpen: state.modalOpen = ""
        });
    }
    return state;
};
export default rootReducer;
