import * as cdk from "@aws-cdk/core";
import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";
import * as ecr from "@aws-cdk/aws-ecr";
import * as iam from "@aws-cdk/aws-iam";

export class FargateStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create repositories in ECR.
    const priceServRepository = new ecr.Repository(this, "PriceServRepository", {
      repositoryName: "rythm-price-micro-serv-repo",
    });

    const socketIoServRepository = new ecr.Repository(this, "SocketIoServRepository", {
      repositoryName: "rythm-socketio-serv-repo",
    });

    // Get the VPC already created in different stack.
    const vpc = ec2.Vpc.fromLookup(this, "vpc", {
      vpcId: "vpc-0f71af096d6ba9b0d",
    });

    // Create the ECS cluster.
    const cluster = new ecs.Cluster(this, "RythmCluster", {
      vpc: vpc,
      clusterName: "RythmCluster",
    });

    // Create the role to run Tasks.
    const priceTaskRole = new iam.Role(this, "PriceTaskRole", {
      assumedBy: new iam.ServicePrincipal("ecs-tasks.amazonaws.com"),
      roleName: "rythm-price-task-role",
      managedPolicies: [
        iam.ManagedPolicy.fromManagedPolicyArn(
          this,
          "SecretsManager",
          "arn:aws:iam::aws:policy/SecretsManagerReadWrite"
        ),
      ],
    });

    // Price Service Task.
    const taskDefinition = new ecs.TaskDefinition(this, "PriceTaskDef", {
      memoryMiB: "512",
      cpu: "256",
      networkMode: ecs.NetworkMode.AWS_VPC,
      compatibility: ecs.Compatibility.EC2_AND_FARGATE,
      taskRole: priceTaskRole,
    });

    taskDefinition.addContainer("PriceContainer", {
      image: ecs.ContainerImage.fromEcrRepository(priceServRepository, "latest"),
      memoryLimitMiB: 512,
      logging: new ecs.AwsLogDriver({ streamPrefix: "PriceService" }),
      environment: {
        STAGE: "prod",
      },
    });

    const service = new ecs.FargateService(this, "PriceService", {
      serviceName: "rythm-price-service",
      cluster,
      taskDefinition,
      desiredCount: 1,
    });
  }
}
