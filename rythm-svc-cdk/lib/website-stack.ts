import * as cdk from "@aws-cdk/core";
import * as acm from "@aws-cdk/aws-certificatemanager";
import * as s3 from "@aws-cdk/aws-s3";
// import * as s3Deployment from "@aws-cdk/aws-s3-deployment";
import * as path from "path";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import * as origins from "@aws-cdk/aws-cloudfront-origins";
import * as route53 from "@aws-cdk/aws-route53";
import * as targets from "@aws-cdk/aws-route53-targets";

/**
 * A stack for the Todo API.
 */
export class WebsiteStack extends cdk.Stack {
  public readonly distributionDomainName: cdk.CfnOutput;
  public readonly apiUrlOutput: cdk.CfnOutput;
  public readonly websiteUrlOutput: cdk.CfnOutput;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    //*****************************************************************************/
    // S3 website bucket.
    //*****************************************************************************/
    // const reactBuildPath = path.resolve(__dirname, "../builds/react-app-build/build");

    const reactAppBucket = new s3.Bucket(this, "websiteBucket", {
      bucketName: "origin.rythm.cc",
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "index.html",
    });

    this.websiteUrlOutput = new cdk.CfnOutput(this, "websiteUrlOutput", {
      value: reactAppBucket.bucketWebsiteUrl,
    });

    // //*****************************************************************************/
    // // CloudFront.
    // //*****************************************************************************/
    // const sslCertificate = acm.Certificate.fromCertificateArn(
    //   this,
    //   "sslCertificate",
    //   "arn:aws:acm:us-east-1:705871014762:certificate/0e063c6c-9de0-4877-9fe0-f3c571c78101"
    // );

    // const cloudFrontDist = new cloudfront.Distribution(this, "cloudFrontDist", {
    //   defaultRootObject: "index.html",
    //   certificate: sslCertificate,
    //   defaultBehavior: {
    //     origin: new origins.S3Origin(reactAppBucket),
    //     viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
    //   },
    // });
    //   domainNames: ["mytodos.xyz"],

    // this.distributionDomainName = new cdk.CfnOutput(this, "distributionDomainName", {
    //   value: cloudFrontDist.distributionDomainName,
    // });

    // //*****************************************************************************/
    // // Deployment.
    // //*****************************************************************************/
    // const hostedZone = route53.PublicHostedZone.fromHostedZoneAttributes(this, "hostedZone", {
    //   hostedZoneId: "Z04032513RU0Y99VPUBXM",
    //   zoneName: "mytodos.xyz",
    // });

    // const arecord = new route53.ARecord(this, "arecord", {
    //   zone: hostedZone,
    //   recordName: "mytodos.xyz",
    //   target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(cloudFrontDist)),
    // });
  }
}
