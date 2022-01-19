import {Types} from "mongoose";

export interface IUserDocument extends ICreateUser, Document {
    isValidPassword: (password: string) => Promise<boolean>;
};

export interface ICreateUser {
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    confirmPassword: string;
    email: string;
    phoneNumber: string;
}

export interface ILoginUser {
    userName: string;
    password: string;
}
export interface IDbUser extends Document {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}