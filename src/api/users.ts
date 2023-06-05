import privateAxios from "../lib/privateAxios";
// import { publicAxios } from "../lib/publicAxios";


export const users = {
    getUsers: async(page?:any) => await privateAxios.get(`/users?page=${page}`),
  
    
}