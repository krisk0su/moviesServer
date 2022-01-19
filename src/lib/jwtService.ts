import { sign, verify } from "jsonwebtoken";

export const createJWT = (user: any) => {
    return sign({
            userName: user.userName,
            firstName: user.firstName,
            userId: user.id,
            roles: ["ADMIN"]
        },
        "dockerValue",
        { expiresIn: '999999s' });
}

export const verifyJwt = (token: any ) => {
    const verified: any = verify(token, "dockerValue", {complete: true});
    return verified;
}
