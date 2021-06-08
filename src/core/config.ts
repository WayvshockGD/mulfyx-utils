import Eris from "eris";
import dotenv from "dotenv";
dotenv.config();

type Data = "token" | "prefix" | "announceChannel";

export function config({ item , encode }: { item: Data, encode?: boolean }) {
    let items = {
        token: `${process.env.TOKEN}`,
        prefix: "=",

        announceChannel: "790484719632252979"
    }

    if (encode) {
        return encodeURIComponent(items[item]);
    }

    return items[item];
}

export function getOwners() {
    return [
        "609899399358971924",
        "571577749647654933"
    ]
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