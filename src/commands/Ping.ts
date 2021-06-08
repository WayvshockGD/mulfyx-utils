import Command from "../Command";

export = new Command({
    name: "ping",
    desc: "Pings the bot",

    execute: ({ message }) => {
        let now = Date.now();

        return message.channel.createMessage("Pinging...").then((msg) => {
            let diff = (Date.now() - now);

            msg.edit(`Pong: ${diff}`);
        })
    }
})