import {
    GET,
    Path,
    POST,
    PreProcessor, Security
} from "typescript-rest";
import { createUserValidator, loginUserValidator } from "../Validators/users/users";
import { ICreateUser, ILoginUser } from "../Interfaces/users";
import { createUser, loginUser } from "../Services/users";


@Path('users')
export class HomesController {
    @POST
    @PreProcessor(createUserValidator)
    async createUser(user: ICreateUser) {
        let result: any;
        try {
            result = await createUser(user);
        } catch (err: any) {
            console.log("err", err)
        }
        //TODO redirect to movies
        return "user created"
    }

    @POST
    @Path("login")
    @PreProcessor(loginUserValidator)
    async loginUser(user: ILoginUser) {
        return await loginUser(user);
    }

    @GET
    @Security("ADMIN")
    async login() {
        return 'asd';
    }
}
