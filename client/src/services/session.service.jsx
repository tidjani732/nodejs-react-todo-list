import { util } from "../helpers/helper";
import { decode, encode } from "jwt-simple";
import { JWT_KEY, ROUTE_WELCOME } from "../helpers/constants";

export const sessionService = {
    getSessionUser: () => {
        var token = util.getStorage("__sdriwmcainjsvfd")
        if (token) {
            try {
                return decode(token, JWT_KEY, true);
            } catch (e) {
                return {}
            }
        }
        return {}
    },
    setSessionUser: token => {
        let obj = encode(token, JWT_KEY);
        util.setStorage("__sdriwmcainjsvfd", obj)
    },
    isLogged: () => {
        var usr = sessionService.getSessionUser()
        if (Object.keys(usr).length === 0) return false
        return true
    },
    logOut: () => {
        localStorage.clear()
        window.location = ROUTE_WELCOME
    },
    getSessionToken: () => {
        var usr = sessionService.getSessionUser();
        return usr.token;
    },
    getUid: () => {
        var usr = sessionService.getSessionUser();
        return usr.userId;
    }
}
