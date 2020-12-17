import * as cdk from "@aws-cdk/core";
import { EcrStack } from "./ecr-stack";
import { EcsStack } from "./ecs-stack";
import { PriceSvcStack } from "./price-svc-stack";

export class RythmSvcCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const ecrStack = new EcrStack(this, "EcrStack", {
      stackName: "rythm-ecr-stack",
      env: props.env,
    });

    const ecsStack = new EcsStack(this, "EcsStack", {
      stackName: "rythm-ecs-stack",
      env: props.env,
    });

    const priceSvcStack = new PriceSvcStack(this, "PriceSvcStack", {
      stackName: "rythm-price-svc-stack",
      cluster: ecsStack.cluster,
      env: props.env,
    });
  }
}
