import { hostname } from "os";

//Routes....

export const ROUTE_LOGIN = "/login"
export const ROUTE_REGISTER = "/register"
export const ROUTE_HOME = "/home"
export const ROUTE_PROFILE = "/profil"
export const ROUTE_WELCOME = "/"
export const ROUTE_ACTIVATE = "/activate/"
export const RT_AC_RECOVER = "/recovery"

//Session Actions
export const SESSION_ERROR = "SESSION_ERROR"
export const CLOSE_ERROR = "CLOSE_ERROR"
export const PROFILE_LOADED = "PROFILE_LOADED";

export const TODO_ADDED = "ADD_TODO";
export const TODO_DELETED = "DELETE_TODO";
export const TODO_UPDATED = "TODO_UPDATED";
export const TODO_LOADED = "TODO_LOADED";
export const GET_USER_REMOTE = "GET_USER_REMOTE";
export const TODO_OPEN_EDIT = "TODO_OPEN_EDIT"
export const CLOSE_MODAL = "CLOSE_MODAL"
export const SESSION_LOADED = "SESSION_LOADED"

//JWT Encode key
export const JWT_KEY = "THIS_SHOULD_BE_A_RANDOM_STRING"
//API links
export const host = hostname() === "localhost" ? "http://localhost:3001" : "http://prod_host.com"
