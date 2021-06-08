import Command from "../Command";

export = new Command({
    name: "spam",
    desc: "Spams messages i guess",

    execute: ({ message, args, util }) => {
        let parsed = parseInt(args[0]);

        if (!args[0]) return util.argError(message.channel, "args[0]");

        if (!args.slice(1).join(" ")) return util.argError(message.channel, `args.join(" ")`);

        if (parsed.toString() === "NaN") {
            return util.error(message.channel, "\"args[0]\" is not a number.");
        } 

        for (let x = 0; x < parsed; x++) {
            util.sendMessage(message.channel, args.join(" ").slice(args[0].length));
        }
    }
}, {
    ownerOnly: true
});