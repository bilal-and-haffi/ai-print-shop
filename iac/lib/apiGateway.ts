import { RemovalPolicy } from "aws-cdk-lib";
import {
    LambdaIntegration,
    LogGroupLogDestination,
    RestApi,
} from "aws-cdk-lib/aws-apigateway";
import type { IFunction } from "aws-cdk-lib/aws-lambda";
import { LogGroup, RetentionDays } from "aws-cdk-lib/aws-logs";
import { Construct } from "constructs";

export class ApiGateway extends RestApi {
    constructor(scope: Construct) {
        super(scope, "ApiGateway", {
            restApiName: "aigifts",
            cloudWatchRole: true,
            deployOptions: {
                accessLogDestination: new LogGroupLogDestination(
                    new LogGroup(scope, "ApiLogGroup", {
                        logGroupName: "api_gateway",
                        retention: RetentionDays.ONE_DAY,
                        removalPolicy: RemovalPolicy.DESTROY,
                    }),
                ),
            },
        });
    }

    addIntegration(method: string, path: string, lambda: IFunction) {
        const resource = this.root.resourceForPath(path);
        resource.addMethod(method, new LambdaIntegration(lambda));
    }
}
