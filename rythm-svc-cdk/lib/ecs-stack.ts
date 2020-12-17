import * as cdk from "@aws-cdk/core";
import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";
import * as ecr from "@aws-cdk/aws-ecr";
import * as iam from "@aws-cdk/aws-iam";

export class EcsStack extends cdk.Stack {
  public cluster: ecs.Cluster;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Get the VPC already created in different stack.
    const vpc = ec2.Vpc.fromLookup(this, "vpc", {
      vpcId: "vpc-0f71af096d6ba9b0d",
    });

    // Create the ECS cluster.
    this.cluster = new ecs.Cluster(this, "RythmCluster", {
      vpc: vpc,
      clusterName: "rythm-cluster",
    });
  }
}
