import { config } from "../config";
import { UtilClient } from "../UtilClient";
import ErrorClass from "./ErrorClass";
import ErrorEmbed from "./ErrorEmbed";

export class startLogging extends ErrorClass {

    client: UtilClient;

    constructor(client: UtilClient) {
        super();

        this.client = client;

        this.client.on("shardReady", (id) => this.handleShardProcess(id));
        this.client.on("shardDisconnect", (error, id) => this.handleShardProcess(id, error));

        this.client.on("warn", this.handle.bind(this));
        this.client.on("error", this.handle.bind(this));
        
        process.on("unhandledRejection", this.handle.bind(this));
        process.on("unhandledRejection", this.handle.bind(this));
    }

    public handle(error: Error) {
        this.log({
            args: [error],
            color: "yellow"
        });
    }

    public handleShardProcess(id: number, error?: Error) {
        this.log({
            args: [id.toString(), `${error}`],
            color: "green"
        });

        return this.send(config({ item: "log" }), `Handing shard id \`${id}\``);
    }

    private send(channel: string, content: string) {
        this.client.createMessage(channel, ErrorEmbed(content));
    }
}