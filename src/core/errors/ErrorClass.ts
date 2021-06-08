import chalk from "chalk";

interface logOptions {
    color: "red" | "blue" | "green" | "yellow";
    args: string[]|Error[];
}

export default class ErrorClass {
    public log(options: logOptions) {
        return console.log(chalk[options.color](options.args.join(" ")));
    }
}