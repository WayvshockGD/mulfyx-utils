import Eris from "eris";
import { CommandOptions, commandAdditions } from "../../data/CommandData";
import { config, clientOptions } from "./config";
import { readdirSync } from "fs";
import CommandHandler from "../handlers/CommandHandler";

interface pathOptions {
    basePath: string;
    path: string;
    type: "commands";
}

interface extraData {
    snipes?: {
        channel: string;
        author: string;
        message: string;
    }
    commandUsage?: {
        command: string;
        author: string;
        args: string[];
    }
}

export class UtilClient extends Eris.Client {

    /** Hold commands. */
    commands: Map<string, CommandOptions>;

    /** Extra map for holding extra stuff. */
    data: Map<string, extraData>;

    constructor() {
        super(config({ item: "token" }), clientOptions);


        this.data = new Map();

        this.commands = new Map();

        this.load({
            basePath: "../commands",
            path: "./build/src/commands/",
            type: "commands"
        });


        this.on("ready", this.onReady.bind(this));
        // @ts-ignore
        this.on("messageCreate", (m) => new CommandHandler(m, this));
        this.on("messageDelete", this.snipe.bind(this));
    }

    public load(path: pathOptions) {

        for (let files of readdirSync(path.path)) {
            let file = require(`${path.basePath}/${files}`);
            this[path.type].set(file.name, file);
            
            console.log(`[LOADER] loaded command (${file.name})`);
        }
    }

    public snipe(message: Eris.Message) {
        this.data.set(`snipe.${message.channel.id}`, {
            snipes: {
                channel: `<#${message.channel.id}>`,
                message: message.content,
                author: message.author.username
            }
        })
    }

    public onReady() {
        this.editStatus("idle");
        console.log(`[SOLAR] Ready on ${this.user.username}`);
    }

    async connect() {
        await super.connect().catch((e: Error) => {
            console.warn(`[SOLAR-ERROR] ${e}`);
        })
    }
}