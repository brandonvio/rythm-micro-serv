import { SecretsManager } from "@aws-sdk/client-secrets-manager";
require("dotenv").config();

const sm = new SecretsManager({
  credentials: {
    accessKeyId: "AKIA3KQG2ZWGFDI7CUVP",
    secretAccessKey: "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",
  },
  region: "us-west-2",
});

// credentials: {
//   accessKeyId: "AKIA3KQG2ZWGFDI7CUVP",
//   secretAccessKey: "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",
// },
// region: "us-west-2",

export class EnvUtil {
  public static async getSecret(secretId): Promise<string> {
    const response = await sm.getSecretValue({ SecretId: secretId });
    console.log(`// Getting secret for secretid: ${secretId}.`);
    return response["SecretString"];
  }

  public static getEnv(name): string {
    const value = process.env[name];
    console.log(`// Getting environment variable ${name} value is: ${value}.`);
    return value;
  }
}
