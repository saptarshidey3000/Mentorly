import os
from fastapi import APIRouter, File, UploadFile
from pydantic import BaseModel
import requests
from handlers.face import mtcnn_comp
from handlers.pdf_handlers import PDFHandler, PDFSummary, PDFQuestions
from handlers.text_extract import extract
from handlers.url_parser import encode_image_url_param
pdf_router = APIRouter(prefix="/pdf", tags=["PDF"])

class Topic_Subject_Request(BaseModel):
    topic: str
    subject: str

@pdf_router.post("/generate_markdown")
def generate_markdown(topic: str):
    """
    Endpoint to generate markdown from PDF content.
    """
    # Placeholder for actual markdown generation logic
    print(topic)
    download_link=PDFHandler.generate_markdwon(topic)
    return {"message": "Markdown generation started",
            "download": download_link}


@pdf_router.post("/generate_roadmap")
def generate_roadmap(subject: str):
    """
    Endpoint to generate a roadmap in JSON format.
    """
    return PDFHandler.generate_roadmap_json(subject)


@pdf_router.post("/generate_summary")
async def generate_summary(topic:str,pdf_file: UploadFile = File(...)):
    """
    Endpoint to generate a roadmap in JSON format.
    """
    pdf = await pdf_file.read()
    with open(f"uploads/{pdf_file.filename}", "wb") as f:
        f.write(pdf)
    text=extract(f"uploads/{pdf_file.filename}")
    return PDFSummary.generate_summary_markdown(text=text,file=f"uploads/{pdf_file.filename}")


@pdf_router.post("/generate_questions")
def generate_questions(topic_subject: Topic_Subject_Request):
    """
    Endpoint to generate questions based on topic and subject.
    """
    return PDFQuestions.generate_questions(topic=topic_subject.topic, subject=topic_subject.subject)

@pdf_router.post("/checker")
async def upload_image(image1: str,image2:UploadFile=File(...)):
    image1_path = f"uploads/tmp_{os.path.basename(image1)}"
    response = requests.get(image1)
    if response.status_code != 200:
        return {"error": "Failed to download image from Cloudinary URL."}
    
    with open(image1_path, "wb") as f:
        f.write(response.content)


    img2 = await image2.read()
    with open(f"uploads/{image2.filename}", "wb") as f:
        f.write(img2)
    s=mtcnn_comp(image1_path,f"uploads/{image2.filename}")
    return {"verified":s["verified"]}