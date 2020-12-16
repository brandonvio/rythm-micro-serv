import os
import boto3
import botostubs

# boto3.setup_default_session(region_name="us-west-2", profile_name="scratch-account-01")
boto3.setup_default_session(region_name="us-west-2")
client: botostubs.SecretsManager = boto3.client('secretsmanager')


def get_env(name):
    return os.getenv(name)


def get_secret(secretId):
    val = client.get_secret_value(SecretId=secretId)
    print("// Getting secret for secretid: " + secretId)
    return val["SecretString"]
