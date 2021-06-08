import Command from "../Command";
import { cpus } from "os";
import proccess from "process";
import { getOwners } from "../core/config";
import { devDependencies, dependencies } from "../../package.json";

export = new Command({
    name: "stats",
    desc: "Shows stats of the client",

    execute: ({ util, message, client }) => {
        let dev = client.users.get(getOwners()[0]);

        let depend = [
            `Dependency Versions`,
            `TypeScript: \`${devDependencies.typescript}\``,
            `Eris: \`${dependencies.eris}\``
        ]

        return util.sendMessage(message.channel, { 
            embed: new util.MessageEmbed({
                title: "Showing stats",
                description: depend.join("\n"),
                fields: [
                    {
                        name: "Cpus",
                        value: cpus.length.toString(),
                        inline: true
                    },
                    {
                        name: "Platform",
                        value: proccess.platform,
                        inline: true
                    },
                    {
                        name: "Developer",
                        value: `${dev?.username}#${dev?.discriminator}`,
                        inline: true
                    }
                ]
        }) })
    }
})