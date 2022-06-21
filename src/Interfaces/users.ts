export interface IUserDocument extends ICreateUser, Document {
    isValidPassword: (password: string) => Promise<boolean>;
};

export interface ICreateUser {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
}

export interface ILoginUser {
    username: string;
    password: string;
}
