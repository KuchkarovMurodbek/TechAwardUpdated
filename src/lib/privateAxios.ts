import { getItem } from './ItemStorage';
import { publicAxios as privateAxios } from './publicAxios';
 
privateAxios.interceptors.request.use((config) => {
    const token = getItem("access_token")
    const authorization = token ? `Bearer ${token}` : ''
    config.headers.Authorization = authorization
    return config
}) 


export default privateAxios