import {
    Context,
    GET,
    Path,
    POST,
    PreProcessor, Security, ServiceContext
} from "typescript-rest";
import { createUserValidator, loginUserValidator } from "../Validators/users/users";
import { ICreateUser, ILoginUser } from "../Interfaces/users";
import { createUser, loginUser } from "../Services/users";


@Path('users')
export class HomesController {
    @Context
    context: ServiceContext;

    @POST
    @PreProcessor(createUserValidator)
    async createUser(user: ICreateUser) {
        let result = await createUser(user);

        return "registered"
    }

    @POST
    @Path("login")
    @PreProcessor(loginUserValidator)
    async loginUser(user: ILoginUser) {
        const jwt =  await loginUser(user);
        return jwt;
    }
}
