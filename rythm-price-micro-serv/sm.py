import boto3
import botostubs
from botocore.config import Config

boto3.setup_default_session(profile_name='scratch-account-01')
client: botostubs.SecretsManager = boto3.client('secretsmanager')

val = client.get_secret_value(SecretId="OANDA_TOKEN")
print(val["SecretString"])
