import Command from "../Command";

export = new Command({
    name: "snipe",
    desc: "Snipes a message from a discord channel.",

    execute: ({ message, client, util }) => {
        let data = client.data.get(`snipe.${message.channel.id}`);

        if (!data) {
            return util.error(message.channel, "There is nothing here.");
        }

        return util.sendMessage(message.channel, util.code({
            content: [
                `Author: ${data.snipes?.author}`,
                `Channel: ${data.snipes?.channel}`,
                `Content: ${data.snipes?.message}`
            ].join("\n")
        }))
    }
})