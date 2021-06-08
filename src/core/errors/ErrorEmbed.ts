import Util from "../../utils/Util"

let util = new Util();

export default function ErrorEmbed(content: string) {
    return {
        embed: {
            color: util.color("RED"),
            description: content
        }
    }
}