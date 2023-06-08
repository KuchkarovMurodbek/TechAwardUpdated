import axios from 'axios'
export const baseUrl = "https://tech.nextlevelgroup.uz/api/v1"



export const publicAxios = axios.create({
    baseURL: baseUrl
})