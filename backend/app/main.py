from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Feedback(BaseModel):
    name: str
    rating: int
    comment: str

fake_db = []

@app.get("/")
def health():
    return {"status": "ok"}

@app.post("/feedback")
def create_feedback(item: Feedback):
    fake_db.append(item)
    return {"message": "Feedback received"}

@app.get("/feedback")
def list_feedback():
    return fake_db


