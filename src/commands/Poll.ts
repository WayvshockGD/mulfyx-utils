import Command from "../Command";
import { getDefaultEmote } from "../core/config";

export = new Command({
    name: "poll",
    desc: "Creates a server poll.",

    execute: ({ message, args, util, client }, { guild }) => {
        if (!args[0]) {
            return util.argError(message.channel, "args[0]");
        }

        let channel = guild.channels.get(util.resolver.clean(args[0])) || message.channel;


        if (!args.slice(1).join(" ")) return util.argError(message.channel, "args.join(\" \")"); 
        
        if (message.channel.id === channel.id) {
            return client.createMessage(channel.id, util.code({
                content: args.slice(1).join(" ")
            })).then(m => {
                m.addReaction(getDefaultEmote({ item: "check" }));
                m.addReaction(getDefaultEmote({ item: "deny" }));
            })
        } else {
            util.sendMessage(message.channel, 
                `${getDefaultEmote({ item: "check" })} Sent poll to <#${channel.id}>`
            )

            return client.createMessage(channel.id, util.code({
                content: args.slice(1).join(" ")
            })).then(m => {
                m.addReaction(getDefaultEmote({ item: "check" }))
                m.addReaction(getDefaultEmote({ item: "deny" }))
            })
        }
    }
})