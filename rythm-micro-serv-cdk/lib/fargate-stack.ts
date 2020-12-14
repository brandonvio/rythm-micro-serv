import * as cdk from "@aws-cdk/core";
import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";
import * as ecr from "@aws-cdk/aws-ecr";
import * as ecs_patterns from "@aws-cdk/aws-ecs-patterns";

export class FargateStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const repository = new ecr.Repository(this, "RythmRepository", {
      repositoryName: "rythm-price-repository",
    });

    const vpc = ec2.Vpc.fromLookup(this, "vpc", {
      vpcId: "vpc-0f71af096d6ba9b0d",
    });

    const cluster = new ecs.Cluster(this, "RythmCluster", {
      vpc: vpc,
      clusterName: "RythmCluster",
    });

    // const taskDefinition = new ecs.TaskDefinition(this, "PriceTaskDef", {
    //   memoryMiB: "512",
    //   cpu: "256",
    //   networkMode: ecs.NetworkMode.AWS_VPC,
    //   compatibility: ecs.Compatibility.EC2_AND_FARGATE,
    // });

    // taskDefinition.addContainer("PriceContainer", {
    //   image: ecs.ContainerImage.fromEcrRepository(repository),
    //   memoryLimitMiB: 1024,
    //   environment: {
    //     // clear text, not for sensitive data
    //     STAGE: "prod",
    //   },
    // });

    // const service = new ecs.FargateService(this, "Service", {
    //   cluster,
    //   taskDefinition,
    //   desiredCount: 5,
    // });
  }
}
