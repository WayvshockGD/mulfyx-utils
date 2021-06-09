import { config } from "../config";
import { UtilClient } from "../UtilClient";
import ErrorClass from "./ErrorClass";
import ErrorEmbed from "./ErrorEmbed";

export default class startLogging extends ErrorClass {

    client: UtilClient;

    constructor(client: UtilClient) {
        super();

        this.client = client;

        this.client.on("shardReady", (id) => this.handleShardProcess(id, true));
        this.client.on("shardDisconnect", (error, id) => this.handleShardProcess(id, false, error));

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

    public handleShardProcess(id: number, shardType: boolean, error?: Error) {
        let message = shardType ? "Handling shard, id:" : "Shard has disconnected, id:";
        this.log({
            args: [`ID: ${id}`, `${error || ""}`],
            color: "green"
        });

        return this.send(config({ item: "log" }), `${message} \`(${id})\``);
    }

    private send(channel: string, content: string) {
        this.client.createMessage(channel, ErrorEmbed(content));
    }
}