import { Duration } from "aws-cdk-lib";
import { Architecture, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { RetentionDays } from "aws-cdk-lib/aws-logs";
import { Construct } from "constructs";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

export class GenericLambda extends NodejsFunction {
    constructor(scope: Construct, fileName: string) {
        super(scope, fileName, {
            architecture: Architecture.ARM_64,
            runtime: Runtime.NODEJS_20_X,
            entry: `./handlers/${fileName}.ts`,
            logRetention: RetentionDays.ONE_DAY,
            timeout: Duration.seconds(60),
            environment: {
                ENV: process.env.ENV as string,
                REPLICATE_API_KEY: process.env.REPLICATE_API_KEY as string,
            },
        });
    }
}
