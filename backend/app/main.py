from fastapi import FastAPI

app = FastAPI(
    title="Chainscope - AI API",
    version="1.0.0"
)

@app.get("/")
def home():
    return {"message": "Chainscope - AI Backend is Running"}

@app.get("/health")
def health():
    return {"status": "healthy"}