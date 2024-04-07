import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { ApiGateway } from "./apiGateway";
import { GenericLambda } from "./lambda";

export class AiGiftsStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const api = new ApiGateway(this);

        const text2imgLambda = new GenericLambda(this, "text2img");

        api.addIntegration("POST", "text2img", text2imgLambda);
    }
}
