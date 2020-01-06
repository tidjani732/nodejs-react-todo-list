import { API } from "./API";

export const todoService = {
    loadTodos: () => {
        return API.sendGet("/todos");
    },
    addTodo: todos => {
        return API.sendPost("/todos", todos);
    },
    deleteTodo: todo => {
        return API.sendPost("/todos/delete", todo);
    },
    updateTodo: todo => {
        return API.sendPost("/todos/update", todo)
    }
}
