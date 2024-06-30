import { Options, Placeholder } from "../PrintifyTypes";

export interface Variant {
    id: number;
    title: string;
    options: Options;
    placeholders: Placeholder[];
}
