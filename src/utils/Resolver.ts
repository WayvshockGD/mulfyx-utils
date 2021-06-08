let rules = [
    "<", "@", "&",
    ">", "#", "!"
]

export default class Resolver {
    clean(args: string) {
        return this.cleanContent(args);
    }

    private cleanContent(item: string) {
        for (let rule of rules) {
            item = item.replace(rule, "");
        }

        return item;
    }
}