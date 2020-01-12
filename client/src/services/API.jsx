import { host } from "../helpers/constants";
import Axios from "axios";
import { sessionService } from "./session.service";

const token = sessionService.getSessionToken();

export const API = {
    sendGet: url => {
        var status = 200;
        return new Promise((resolve, rejects) => {
            fetch(host + '/api' + url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearus ' + sessionService.getSessionToken()
                }
            }).then(res => {
                status = res.status;
                return res.json();
            }).then(res => resolve({ data: res, status }))
                .catch(err => {
                    console.log(err);
                    rejects(err)
                });
        });
    },
    sendPost: (url, params) => {
        var status = 200;
        return new Promise((resolve, rejects) => {
            fetch(host + '/api' + url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearus ' + sessionService.getSessionToken()
                },
                body: JSON.stringify(params)
            }).then(res => {
                status = res.status;
                return res.json();
            }).then(res => resolve({ data: res, status }))
                .catch(err => {
                    console.log(err);
                    rejects(err)
                });
        });
    },
    postWithFiles: (url, params) => {
        var status = 200;

        return new Promise((resolve, rejects) => {
            fetch(host + '/api' + url, {
                method: "POST",
                body: params,
                headers: {
                    'Authorization': 'Bearus ' + sessionService.getSessionToken()
                },
            })
                .then(res => {
                    status = res.status;
                    return res.json();
                })
                .then(res => resolve({ data: res, status }))
                .catch(err => {
                    console.log(err);
                    rejects(err);
                })
        });
    }
}
