import * as cdk from "@aws-cdk/core";
import { EcrStack } from "./ecr-stack";
import { PriceSvcStack } from "./price-svc-stack";
import { SocketioSvcStack } from "./socketio-svc-stack";
import { CoreStack } from "./core-stack";

export class RythmSvcCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    const coreStack = new CoreStack(this, "CoreStack", {
      stackName: "rythm-core-stack",
      env: props.env,
    });

    const ecrStack = new EcrStack(this, "EcrStack", {
      stackName: "rythm-ecr-stack",
      env: props.env,
    });

    const priceSvcStack = new PriceSvcStack(this, "PriceSvcStack", {
      stackName: "rythm-price-svc-stack",
      cluster: coreStack.cluster,
      env: props.env,
    });

    const socketioSvcStack = new SocketioSvcStack(this, "SocketioSvcStack", {
      stackName: "rythm-socketio-svc-stack",
      cluster: coreStack.cluster,
      vpc: coreStack.vpc,
      env: props.env,
    });
  }
}
