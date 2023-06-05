//users:id interface
interface City{
    id:number,
    name:string,
}

export interface UserId {
id:number,
first_name:string,
last_name:string,
email:string,
phone:string,
isadmin:boolean,
birthday:string,
created_at:string,
city:City
}



// user type interface
export interface UserType {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    created_at: Date;
    city_id: number;
    birthday: any;
    phone: string;
  }
  [];