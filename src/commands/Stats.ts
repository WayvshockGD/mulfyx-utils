import Command from "../Command";
import { cpus } from "os";
import proccess from "process";
import { getOwners } from "../core/config";
import { execSync } from "child_process";
import { devDependencies, dependencies } from "../../package.json";

export = new Command({
    name: "stats",
    desc: "Shows stats of the client",

    execute: ({ util, message, client }) => {
        let dev = client.users.get(getOwners()[0]);

        let gitVersion = execSync('git rev-parse --short HEAD', {encoding: 'utf8'}).slice(0, -1);

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
                        name: "Latest commit",
                        value: `\`${gitVersion}\``,
                        inline: false
                    },
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