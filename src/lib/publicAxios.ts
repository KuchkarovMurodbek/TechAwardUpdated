import axios from 'axios'
export const baseUrl = "http://tech.nextlevelgroup.uz/api/v1"

export const publicAxios = axios.create({
    baseURL: baseUrl
})