import Command from "../Command";
import { config } from "../core/config";

export = new Command({
    name: "announce",
    desc: "Announces something to the announcement channel.",

    execute: ({ message, args, util, client }) => {
        if (!args.join(" ")) {
            return util.error(message.channel, 
                "You need to say something for me to announce!"
            );
        } else {
            return client.createMessage(config({ item: "announceChannel" }), {
                embed: new util.MessageEmbed({
                    title: `Announcement by ${message.author.username}`,
                    description: `${args.join(" ")}`
                })
            })
        }
    }
})