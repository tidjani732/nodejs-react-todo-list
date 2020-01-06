import {
    TODO_ADDED, TODO_LOADED, TODO_UPDATED,
    TODO_DELETED, SESSION_ERROR, CLOSE_ERROR, CLOSE_MODAL, TODO_OPEN_EDIT, SESSION_LOADED
} from "../../helpers/constants";



const initialState = {
    todos: [],
    sesUser: {},
    new_error: {},
    todo: {}, //currently edited todo
    modalOpen: ""
};
function rootReducer(state = initialState, action) {

    if (action.type === SESSION_LOADED) {
        return Object.assign({}, state, {
            sesUser: state.sesUser = action.payload
        });
    }
    if (action.type === TODO_ADDED) {
        return Object.assign({}, state, {
            todos: state.todos.concat(action.payload)
        });
    }

    if (action.type === TODO_LOADED) {
        return Object.assign({}, state, {
            todos: state.todos.concat(action.payload)
        });
    }
    if (action.type === TODO_OPEN_EDIT) {
        return Object.assign({}, state, {
            todo: state.todo = action.payload,
            modalOpen: state.modalOpen = "TodoUpdateModal"
        });
    }
    if (action.type === TODO_UPDATED) {
        return Object.assign({}, state, {
            todos: state.todos.filter(x => x._id !== action.payload._id).concat(action.payload)
        });
    }
    if (action.type === TODO_DELETED) {
        return Object.assign({}, state, {
            todos: state.todos.filter(x => x._id !== action.payload._id)
        });
    }

    if (action.type === SESSION_ERROR) {
        return Object.assign({}, state, {
            new_error: state.new_error = action.payload
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
