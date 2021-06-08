import Eris from "eris";
import dotenv from "dotenv";
dotenv.config();

type Data = "token" | "prefix" | "announceChannel" | "log";
type emotes = "check" | "deny"; 

/**
 * Grabbing the items now.
 * 
 * @example 
 * config({ item: "prefix" });
*/
export function config({ item , encode }: { 
    /** Grabbing the item from config */
    item: Data, 
    /** Encode links if there are any. */
    encode?: boolean 
}) {

    let items = {
        token: `${process.env.TOKEN}`,
        prefix: "=",

        announceChannel: "790484719632252979",
        log: "851874906739834901"
    }

    if (encode) {
        return encodeURIComponent(items[item]);
    }

    return items[item];
}

export function getOwners() {
    return [
        "609899399358971924",
        "571577749647654933",
        "708557575779516426"
    ]
}

export function getDefaultEmote({ item }: { item: emotes }) {
    let emotes = {
        check: "✅",
        deny: "❌"
    }

    return emotes[item];
}

export let clientOptions: Eris.ClientOptions = {
    compress: true,
    messageLimit: 60,
    defaultImageFormat: "png",
    allowedMentions: {
        everyone: false,
        roles: true,
        users: true
    }
}