import { ApiServer } from "./server";
import { MongoConnector } from "./mongoConnector";



export async function start(): Promise<void> {
    const mongoConnector = new MongoConnector();
    const apiServer = new ApiServer();
    await apiServer.start();
    await mongoConnector.connect();
    const graceful = async () => {
        await mongoConnector.disconnect();
        await apiServer.stop();
        process.exit(0);
    };

    // Stop graceful
    process.on('SIGTERM', graceful);
    process.on('SIGINT', graceful);
}