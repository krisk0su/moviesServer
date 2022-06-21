import express = require("express");
import * as http from 'http';
import { ExtractJwt, StrategyOptions } from 'passport-jwt';
import { PassportAuthenticator, Server } from 'typescript-rest';
import { verify } from "jsonwebtoken";
import { Strategy } from "passport-http-bearer";

export class ApiServer {
    public PORT: number = +process.env.PORT || 3333;

    private readonly app: any;
    private server: http.Server = null;

    constructor() {
        this.app = express();
        this.config();
        this.seed();
        //Server.useIoC();

        Server.loadControllers(this.app, "./src/Controllers/*", __dirname);
        // Server.swagger(this.app, { filePath: './dist/swagger.json' });
    }

    /**
     * Start the server
     */
    public async start() {
        return new Promise<any>((resolve: any, reject: any) => {
            this.server = this.app.listen(this.PORT, (err: any) => {
                if (err) {
                    return reject(err);
                }

                // TODO: replace with Morgan call
                console.log(`Listening to http://127.0.0.1:${this.PORT}`);

                return resolve();
            });
        });

    }

    /**
     * Stop the server (if running).
     * @returns {Promise<boolean>}
     */
    public async stop(): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            if (this.server) {
                this.server.close(() => {
                    return resolve(true);
                });
            } else {
                return resolve(true);
            }
        });
    }

    /**
     * Configure the express app.
     */
    private config(): void {
        this.configureAuthenticator();
    }

    private configureAuthenticator() {
        const JWT_SECRET: string = 'dockerValue';
        const jwtConfig: StrategyOptions = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: Buffer.from(JWT_SECRET)
        };
        const strategy = new Strategy(jwtConfig, async (payload: any, done: (err: any, user: any) => void) => {
            const jwt: any = await verify(payload.toString(), JWT_SECRET);
            done(null, {
                ...jwt
            });
        });
        const authenticator = new PassportAuthenticator(strategy, {
            authOptions: {
                session: false,
                failWithError: false,
                authInfo: true
            },
            rolesKey: 'roles' // change the name of the property used to access the user role(s)
        });
        Server.registerAuthenticator(authenticator);
        //Server.registerAuthenticator(authenticator, 'secondAuthenticator');
    }

    private seed(): void {
    }
}