from pypdf import PdfReader

def extract(filepath:str):
    # creating a pdf reader object
    reader = PdfReader(filepath)

    # printing number of pages in pdf file
    print(len(reader.pages))
    text=""
    # getting a specific page from the pdf file
    for i in range(len(reader.pages)):
        page = reader.pages[i]

        # extracting text from page
        text += page.extract_text()
    return text