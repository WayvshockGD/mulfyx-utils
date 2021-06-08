interface fieldBuilder {
    name: string;
    value: string;
    inline: boolean;
}

interface embedOps {
    title?: string;
    description?: string;
    fields?: fieldBuilder[];
    footer?: {
        text?: string;
        icon_url?: string;
    }
    color?: number;
}

export default class EmbedBuilder {
    constructor(embedOptions: embedOps) {
        return {
            title: embedOptions["title"] || "",
            description: embedOptions["description"] || "",
            fields: embedOptions["fields"] || [],
            footer: embedOptions["footer"] || {},
            color: embedOptions["color"] || 0x45a8ff
        }
    }
}