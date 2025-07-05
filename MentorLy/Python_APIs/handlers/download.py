import boto3
from botocore.client import Config
import dotenv
import os
# Replace these with your actual credentials and R2 info
dotenv.load_dotenv()

access_key = os.getenv("ACCESS_KEY")
secret_key = os.getenv("SECRET_KEY")
account_id = os.getenv("ACCOUNT_ID")
bucket = os.getenv("BUCKET_NAME")


def download(filename: str, savelocation: str):
    OBJECT_KEY = filename  # PDF file inside R2
    ENDPOINT = f"https://{account_id}.r2.cloudflarestorage.com"

    # Create a boto3 client
    s3 = boto3.client(
        "s3",
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        endpoint_url=ENDPOINT,
        config=Config(signature_version="s3v4"),
        region_name="auto"  # R2 uses 'auto' as region
    )
    response = s3.list_objects_v2(Bucket=bucket)
    for obj in response.get("Contents", []):
        print(obj["Key"])
    # Download PDF to local file

    s3.download_file(bucket, OBJECT_KEY, savelocation)
    print("PDF downloaded successfully.")
