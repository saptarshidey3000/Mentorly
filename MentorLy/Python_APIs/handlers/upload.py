import boto3
from botocore.client import Config
import os


def upload(filepath: str, uploadname: str):
    session = boto3.session.Session()
    r2 = session.client(
        service_name="s3",
        aws_access_key_id=os.getenv("ACCESS_KEY"),
        aws_secret_access_key=os.getenv("SECRET_KEY"),
        endpoint_url=f"https://{os.getenv('ACCOUNT_ID')}.r2.cloudflarestorage.com",
        config=Config(signature_version="s3v4"),
    )

    # Upload file
    r2.upload_file(filepath, "pdf-dump", uploadname)
    return f"https://pub-9f936ca9c7484250b7069fcffe1cb335.r2.dev/{uploadname}"
