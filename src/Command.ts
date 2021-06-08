import { CommandOptions, CommandData, commandAdditions, ctxOptions } from "../data/CommandData";

export default class Command implements CommandOptions {

    public log: boolean|undefined;

    public disabled: boolean;

    public ownerOnly: boolean;

    public name: string;

    public desc: string;

    public options: CommandOptions;

    constructor(options: CommandOptions, additions?: commandAdditions) {

        this.name = options.name;

        this.desc = options.desc;

        this.log = additions?.ownerOnly || false;

        this.disabled = additions?.disabled || false;

        this.ownerOnly = additions?.ownerOnly || false;

        this.options = options;
    }

    execute({ message, args, client, util, commands}: CommandData, { guild }: ctxOptions) {
        this.options.execute({ 
            message, 
            args, 
            client,
            util,
            commands
        }, {
            guild: guild
        });
    }
}