import Command from "../Command";
import { getOwners } from "../core/config";

export = new Command({
    name: "help",
    desc: "Shows all the commands of the client.",
    
    execute: ({ util, message, commands }) => {
        let helpCommands: string[] = [];
        let devCommands: string[] = [];

        commands.forEach(function(c) {
            if (c.ownerOnly) return devCommands.push(`${c.name} - ${c.desc}`);
            helpCommands.push(`${c.name} - ${c.desc}`);
        });

        util.sendMessage(message.channel, util.code({ 
            content: helpCommands.join("\n") 
        }));

        if (getOwners().includes(message.author.id)) {
            util.sendMessage(message.channel, util.code({
                content: devCommands.join("\n")
            }))
        }
    }
})