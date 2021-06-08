import Eris from "eris";
import { getOwners, config } from "../core/config";
import { UtilClient } from "../core/UtilClient";
import Util from "../utils/Util";

export default class CommandHandler {
    constructor(message: Eris.Message, client: UtilClient) {
        let prefix = config({ item: "prefix" });

        if (!message.content.startsWith(prefix)) return;

        if (message.author.bot) return;

        let args = message.content.slice(prefix.length).trim().split(" ");

        let command = client.commands.get(args[0].toLowerCase());

        if (!command) return;

        if (command.ownerOnly && !getOwners().includes(message.author.id)) return; 

        client.data.set(`commands.${message.author.id}`, {
            commandUsage: {
                command: args[0],
                author: message.author.username,
                args: args.slice(1)
            }
        });

        args = args.slice(1);

        command.execute({
            message: message,
            args: args,
            client: client,
            util: new Util(),
            commands: client.commands
        }, {
            guild: (<Eris.GuildChannel>message.channel).guild
        });
    }
}