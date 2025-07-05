FROM python:3.11.12-bullseye

WORKDIR /app

COPY requirements.txt ./

RUN pip install -r requirements.txt
RUN apt-get update && apt-get install -y libicu-dev

COPY . ./

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]