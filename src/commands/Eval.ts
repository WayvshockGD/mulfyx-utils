import Command from "../Command";
import { inspect } from "util";

export = new Command({
    name: "eval",
    desc: "Evals js code within discord text.",

    execute: ({ message, args, util }) => {
        let code = "";

        if (!args.join(" ")) {
            return util.error(message.channel, "Say something for me to eval");
        }

        try {
            code = inspect(eval(args.join(" ")));
        } catch (error) {
            return util.error(message.channel, error);
        }

        return util.sendMessage(message.channel, util.code({ 
            lang: "js", 
            content: code 
        })).catch(e => {
            return util.error(message.channel, e);
        })
    }
}, {
    ownerOnly: true
})