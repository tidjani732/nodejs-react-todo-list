import { API } from "./API";

export const authService = {
    login: credentials => {
        return API.sendPost("/login", credentials)
    },
    register: data => {
        return API.sendPost("/register", data)
    },
    actvateAccount: token => {
        return API.sendGet("/activate/" + token)
    },
    recoverAcc: data => {
        return API.sendPost("/auth/recover", data)
    },
    getResetAccount: data => {
        return API.sendPost("/auth/load/reset", data)
    },
    resetPassword: data => {
        return API.sendPost("/auth/reset/pass", data)
    }
}
