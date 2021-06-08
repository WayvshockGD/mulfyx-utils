import Command from "../Command";

export = new Command({
    name: "usages",
    desc: "Shows command usage of the author.",

    execute: ({ client, message, args, util }) => {
        let arg = (args.length) ? args[0] : message.author.id;

        let usages = client.data.get(`command.${arg}`);

        if (!usages) {
            return util.error(message.channel, "Could not find that user.");
        } 

        return util.sendMessage(message.channel, util.code({
            content: [
                `Author: ${usages.commandUsage?.author}`,
                `message: ${usages.commandUsage?.command}`
            ].join("\n")
        }))
    }
}, {
    ownerOnly: true
})