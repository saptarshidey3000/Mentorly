import json
import re
from google import genai
import os
import dotenv
from spire.doc import Document, FileFormat
from handlers.upload import upload
from handlers.download import download

dotenv.load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)


class PDFHandler:
    @staticmethod
    def generate_markdwon(topic: str):
        # 📝 The topic you want notes on
        prompt = f"""You are a helpful teaching assistant. Generate AI-powered notes on the topic "{topic}" with the following structure:
        - Title
        - Introduction
        - Subheadings with detailed explanations
        - Two relevant images (give image URLs)
        - Interesting fact
        Format the response using Markdown with bullet points, blockquotes, and image embeds.
        """

        response = client.models.generate_content(
            model="gemini-2.5-flash", contents=prompt
        )

        # 🧾 Save the result to a markdown file
        with open(f"{topic.replace(' ', '_').lower()}_notes.md", "w", encoding="utf-8") as f:
            f.write(response.text)
        filename = f"{topic.replace(' ', '_').lower()}_notes.md"
        filepath = os.getenv("PDF_FILE_PATH")
        filepath = os.path.join(filepath, filename)
        return PDFHandler.generate_pdf(filepath, topic)

    @staticmethod
    def generate_pdf(filepath: str, topic: str):
        document = Document()
        document.LoadFromFile(filepath)
        pdf_name = topic+"Topdf.pdf"
        document.SaveToFile(pdf_name, FileFormat.PDF)
        pdf_filepath=os.getenv("PDF_FILE_PATH")
        pdf_filepath = os.path.join(pdf_filepath, pdf_name)
        document.Dispose()
        return upload(pdf_filepath,pdf_name)
    
    @staticmethod
    def extract_json(text):
        match = re.search(r'\[.*?\]', text, re.DOTALL)
        if match:
            return json.loads(match.group(0))
        else:
            raise ValueError("No JSON array found in response.")
    
    @staticmethod
    def generate_roadmap_json(subject: str):
        prompt = f"""You are a helpful teaching assistant. Generate a detailed roadmap for learning the subject "{subject}".
        The roadmap should be in JSON format with the following structure:
        Each item in the list should be a class session and follow this structure:
        - week: (integer) The week number
        - day: (integer) The day number within the week (1 to 5)
        - topic: (string) The topic to be covered in that class
        - duration_minutes: (integer) Duration of the class in minutes
        Only return a JSON array (not inside a string block, no explanation text).
        """
        response = client.models.generate_content(
            model="gemini-2.5-flash", contents=prompt
        )
        print("response", response.text)
        return PDFHandler.extract_json(response.text)\
    
class PDFSummary:
    @staticmethod
    def generate_summary_markdown(text: str,file:str):
        # 📝 The topic you want notes on
        prompt = f"""You are a helpful teaching assistant. Generate AI-powered summary on the text "{text}" with the following structure:
        - Title
        - Introduction
        - Subheadings with detailed explanations
        - Two relevant images (give image URLs)
        - Interesting fact
        Format the response using Markdown with bullet points, blockquotes, and image embeds.
        """

        response = client.models.generate_content(
            model="gemini-2.5-flash", contents=prompt
        )

        # 🧾 Save the result to a markdown file
        with open(f"{file.replace(' ', '_').lower()}_notes.md", "w", encoding="utf-8") as f:
            f.write(response.text)
        filename = f"{file.replace(' ', '_').lower()}_notes.md"
        filepath = os.getenv("PDF_FILE_PATH")
        filepath = os.path.join(filepath, filename)
        return PDFHandler.generate_pdf(filepath, file)


class PDFQuestions:
    @staticmethod
    def generate_questions(topic: str, subject: str):
        # 📝 The topic you want notes on
        prompt = f"""You are a helpful teaching assistant. Generate AI-powered questions on the topic "{topic}" and subject "{subject}" with the following structure:
        - HeadLine containing the topic and subject and alloted time
        - A list of 10-15 questions
        - Each question should be clear and concise
        - do not include answers to the questions
        """

        response = client.models.generate_content(
            model="gemini-2.5-flash", contents=prompt
        )

        with open(f"{topic.replace(' ', '_').lower()}_questions.md", "w", encoding="utf-8") as f:
            f.write(response.text)
        filename = f"{topic.replace(' ', '_').lower()}_questions.md"
        filepath = os.getenv("PDF_FILE_PATH")
        filepath = os.path.join(filepath, filename)
        return PDFQuestions.generate_questions_pdf(filepath, topic, subject)
    
    @staticmethod
    def generate_questions_pdf(filepath: str, topic: str, subject: str):
        document = Document()
        document.LoadFromFile(filepath)
        pdf_name = topic+"Questions.pdf"
        document.SaveToFile(pdf_name, FileFormat.PDF)
        pdf_filepath=os.getenv("PDF_FILE_PATH")
        pdf_filepath = os.path.join(pdf_filepath, pdf_name)
        document.Dispose()
        return upload(pdf_filepath,pdf_name)