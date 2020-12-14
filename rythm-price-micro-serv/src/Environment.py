import os
from dotenv import load_dotenv


def get_env(name):
    return os.getenv(name)
