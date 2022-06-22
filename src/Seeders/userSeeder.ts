import { userModel } from "../Models/users/users";
import { Roles } from "../Enums/users";

export const addAdminUser = async () => {
    const newUser = new userModel({
        "firstname": "kristian",
        "lastname": "karakolev",
        "username": "krisk0su",
        "password": "krizk0tak3n",
        "confirmPassword": "krizk0tak3n",
        "email": "krisk0su@gmail.com",
        "role": Roles.Admin
    });
    await newUser.save();
}