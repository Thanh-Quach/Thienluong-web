import axios from "axios";
import { api } from "./config";

export default class API{
    static async authenticate(data) {
        return axios.post(api+'authenticate', data)
    }

    static async store(data) {

        return axios.post(api+'schedule', data)
    }
    
    
    static async show(token, meetingId) {

        return axios.get(api+'schedule/', meetingId,{
            'headers': {
                'Authorization': 'Bearer '+token
            }
        })
    }

    
    static async index(token) {

        return axios.get(api+'schedule',{
            'headers': {
                'Authorization': 'Bearer '+token
            }
        })
    }

    static async delete(token, uid) {

        return axios.delete(api+'schedule/'+uid,{
            'headers': {
                'Authorization': 'Bearer '+token
            }
        })
    }
}