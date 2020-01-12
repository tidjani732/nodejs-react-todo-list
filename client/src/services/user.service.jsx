import { API } from "./API";

export const usrServ = {
    getSesUser: () => {
        return API.sendGet("/user/me");
    },
    updateProfile: formData => {
        console.log(formData);
        return API.postWithFiles('/user/update', formData);
    }
}
