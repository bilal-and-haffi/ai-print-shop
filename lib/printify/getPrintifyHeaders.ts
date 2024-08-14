import { envServer } from "@/lib/env/server";

export function getPrintifyRequestHeaders() {
    return {
        "Content-Type": "application/json",
        authorization: `Bearer ${envServer.PRINTIFY_API_TOKEN}`,
    };
}
