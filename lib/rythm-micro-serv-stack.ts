import * as cdk from "@aws-cdk/core";
import { S3Stack } from "./s3-stack";

export class RythmMicroServStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const s3stack = new S3Stack(this, "S3Stack");
  }
}
