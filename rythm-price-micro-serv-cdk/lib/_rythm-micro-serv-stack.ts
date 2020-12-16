import * as cdk from "@aws-cdk/core";
import { FargateStack } from "./fargate-stack";

export class RythmMicroServStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const fargateStack = new FargateStack(this, "FargateStack", props);
  }
}
