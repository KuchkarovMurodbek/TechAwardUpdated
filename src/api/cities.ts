
import privateAxios from "../lib/privateAxios";
// import { publicAxios } from "../lib/publicAxios";


export const cities = {
    getCities: async() => await privateAxios.get(`/cities`),
    postCities: async(data:string) => await privateAxios.post(`/cities`,data),
  
    
}
