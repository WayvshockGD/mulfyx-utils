import Command from "../Command";
import { config } from "../core/config";

export = new Command({
    name: "usages",
    desc: "Shows command usage of the author.",

    execute: ({ client, message, args, util }) => {
        let arg = (args.length) ? util.resolver.clean(args[0]) : message.author.id;

        let usages = client.data.get(`commands.${arg}`);
        let prefix = config({ item: "prefix" });

        if (!usages) {
            return util.error(message.channel, "Could not find data for that user.");
        } 

        let content = [
            `Author: ${usages.commandUsage?.author}`,
            `Command: ${prefix}${usages.commandUsage?.command}`
        ];

        if (usages.commandUsage?.args.length) content.push(usages.commandUsage.args.join(" "));

        return util.sendMessage(message.channel, util.code({
            content: content.join(" ")
        }))
    }
}, {
    ownerOnly: true
})