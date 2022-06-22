import {
    Context,
    Path,
    POST,
    PreProcessor,
    ServiceContext
} from "typescript-rest";
import { createUserValidator, loginUserValidator } from "../Validators/users/users";
import { ICreateUser, ILoginUser } from "../Interfaces/users";
import { createUser, loginUser } from "../Services/users";


@Path('users')
export class UsersController {
    @Context
    context: ServiceContext;

    @POST
    @PreProcessor(createUserValidator)
    async createUser(user: ICreateUser) {
        await createUser(user);
        return this.context.response.sendStatus(200);
    }

    @POST
    @Path("login")
    @PreProcessor(loginUserValidator)
    async loginUser(user: ILoginUser) {
        const jwt =  await loginUser(user);
        return jwt;
    }
}
