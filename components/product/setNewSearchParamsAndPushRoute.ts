"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";

export function setNewSearchParamsAndPushRoute({
    searchParams,
    name,
    value,
    router,
    pathname,
}: {
    name: string;
    searchParams: ReadonlyURLSearchParams;
    value: string;
    router: AppRouterInstance;
    pathname: string;
}) {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set(name, value);
    const queryString = newParams.toString();
    router.push(pathname + "?" + queryString);
}
