import Eris from "eris";
import { UtilClient } from "../src/core/UtilClient";
import Util from "../src/utils/Util";

export interface CommandData {
    client: UtilClient;
    args: string[];
    message: Eris.Message;
    util: Util;
    commands: Map<string, CommandOptions>
}

export interface ctxOptions {
    guild: Eris.Guild;
}

export interface CommandOptions {
    [x: string]: any;
    name: string;
    desc: string;
    execute: ({}: CommandData, {}: ctxOptions) => void;
}

export interface commandAdditions {
    ownerOnly?: boolean;
    disabled?: boolean;
    log?: boolean;
}