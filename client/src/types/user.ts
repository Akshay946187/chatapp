export interface UserType {
    email: string;
    password: string;
    confirmPassword: string;
  }

export interface profile{
  firstName:string;
  lastName:string;
  image:string;
  hovered:boolean
}

export interface Contact {
  _id: string;
  email: string;
  password: string;
  profileSetup: boolean;
  __v: number;
  firstName?: string;
  lastName?: string;
}