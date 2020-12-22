import * as cdk from "@aws-cdk/core";
import { EcsStack } from "./ecs-stack";
import { VpcStack } from "./vpc-stack";
import { AlbStack } from "./alb-stack";
import { DomainStack } from "./domain-stack";
import { KeyPair } from "cdk-ec2-key-pair";
import * as elbv2 from "@aws-cdk/aws-elasticloadbalancingv2";
import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";
import * as ssm from "@aws-cdk/aws-ssm";

export class CoreStack extends cdk.Stack {
  public readonly vpc: ec2.Vpc;
  public readonly loadBalancer: elbv2.ApplicationLoadBalancer;
  public readonly cluster: ecs.Cluster;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create the Key Pair
    const key = new KeyPair(this, "RythmKeyPair", {
      name: "rythm-key-pair",
      description: "key pair for rythm.",
    });

    new ssm.StringParameter(this, "RythmVpcIdParameter", {
      parameterName: "rythm-key-pair",
      stringValue: key.name,
    });

    const domainStack = new DomainStack(this, "RythmDomainStack", {
      stackName: "rythm-domain-stack",
      env: props?.env,
    });

    const vpcStack = new VpcStack(this, "RythmVpcStack", {
      stackName: "rythm-vpc-stack",
      env: props?.env,
      keyName: key.name,
    });
    this.vpc = vpcStack.vpc;

    const ecsStack = new EcsStack(this, "EcsStack", {
      stackName: "rythm-ecs-stack",
      env: props?.env,
      vpc: vpcStack.vpc,
    });
    this.cluster = ecsStack.cluster;
    ecsStack.addDependency(vpcStack);

    const albStack = new AlbStack(this, "RythmAlbStack", {
      stackName: "rythm-alb-stack",
      vpc: vpcStack.vpc,
      env: props?.env,
    });
    albStack.addDependency(vpcStack);
  }
}
