#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { AiGiftsStack } from "../lib/iac-stack";

const app = new cdk.App();
new AiGiftsStack(app, "AiGifts", {
    env: {
        account: "339713170154",
        region: "eu-west-2",
    },
});
