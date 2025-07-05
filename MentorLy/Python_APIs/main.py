from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.pdf_router import pdf_router

app = FastAPI()
# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins, adjust as needed
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods, adjust as needed
    allow_headers=["*"],  # Allows all headers, adjust as needed
)


@app.get("/")
async def root():
    return {"message": "Hello, World!"}

# Include the PDF router
app.include_router(pdf_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=7000, log_level="info",
                workers=1, timeout_keep_alive=5)
# To run the application, use the command:
# uvicorn main:app --host
