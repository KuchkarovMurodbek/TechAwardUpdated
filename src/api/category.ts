
import privateAxios from "../lib/privateAxios";
// import { publicAxios } from "../lib/publicAxios";


export const category = {
    getCategory: async() => await privateAxios.get(`/categories`),
    postCategory: async(data:string) => await privateAxios.post(`/categories`,data),
  
    
}
