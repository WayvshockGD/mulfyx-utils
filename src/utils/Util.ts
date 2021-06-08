import Eris from "eris";
import EmbedBuilder from "./EmbedBuilder";
import Resolver from "./Resolver";

interface codeOptions {
    lang?: string;
    content: string;
}

interface messageOptions {
    pin?: boolean;
    deleteAfter?: number;
}

interface splitOtps {
    content: string;
    split: string|RegExp;
}

export default class Util {

    get MessageEmbed() {
        return EmbedBuilder;
    }

    get resolver() {
        return new Resolver();
    }

    splitMessage(splitOptions: splitOtps): string[] {
        return splitOptions.content.split(splitOptions.split);
    }

    sendMessage(message: Eris.TextableChannel, content: Eris.MessageContent, options?: messageOptions) {
        return message.createMessage(content).then(function(msg){
            if (options?.pin) {
                msg.pin();
            }

            if (options?.deleteAfter) {
                setTimeout(() => {
                    msg.delete();
                }, options.deleteAfter);
            }
        })
    }

    code(options: codeOptions) {
        return `\`\`\`${options.lang || ""}\n${options.content}\n\`\`\``;
    }

    error(message: Eris.TextableChannel, content: string|string[]) {
        if (Array.isArray(content)) content = content.join("\n");

        return this.sendMessage(message, this.code({
            content: content
        }));
    }

    argError(message: Eris.TextableChannel, arg: string) {
        return this.error(message, `There were no arguments at ${arg}`);
    }
}