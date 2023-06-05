//posts:id interface


interface Category {
    id:number,
    name:string,
    parent_id:null,
}


interface Author{
    first_name:string,
    last_name:string,
    email:string,
    phone:string,
    isadmin:boolean,
    created_at:string,
    birthday:string
}
export interface PostOneId {
    id: number,
    title: string,
    shortcontent: string,
    likes: number,
    img?: string,
    created_at: string,
    updated_at:string,
    isactive: boolean,
    actived_at: string,
    content:any,
    category:Category,
    author:Author,
    user_id:number,
}

// posts {}
export interface typePost {
    id: number;
    title: string;
    shortcontent: string;
    likes: 0;
    img: string;
    created_at: string;
    updated_at: string;
    isactive: boolean;
    actived_at: string;
    category: number;
    content: string;
    user_id: number;
    name:string
  }
  [];



