
import privateAxios from "../lib/privateAxios";
// import { publicAxios } from "../lib/publicAxios";


export const posts = {
    getPosts: async(page?:number,search?:string) => await privateAxios.get(`/posts/?page=${page}&search=${search}`),
    getPostFiltered:async(search?:string,page?:number,filtervalue?:any,updown?:string) => await privateAxios.get(`/posts/?page=${page}&search=${search}&orderBy=${filtervalue}&orderDirection=${updown}`),
    getActivePost:async(page?:number,search?:string)=>await privateAxios.get(`/posts/?isactive=true&search=${search}&page=${page}`),
    getActivePostFiltered:async(search?:string,page?:number,filtervalue?:any,updown?:string) => await privateAxios.get(`/posts/?isactive=true&page=${page}&search=${search}&orderBy=${filtervalue}&orderDirection=${updown}`),
    getPostId:async(id?:string) =>await privateAxios.get(`/posts/${id}`),
    sendIgnore:async(post_id?:number,user_id?:number)=>await privateAxios.post('/posts/ignore',{post_id,user_id})
}
