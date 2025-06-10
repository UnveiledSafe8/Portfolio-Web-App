from fastapi import FastAPI, Depends
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from . import deps
from .schemas import ContactCreate
from .crud import create_contact
from .database import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.mount("/frontend/dist", StaticFiles(directory="frontend/dist"), name="frontend-dist")

@app.get("/")
def index():
    return FileResponse("frontend/dist/index.html")

@app.get("/resume")
def get_resume():
    return FileResponse("frontend/dist/assets/docs/resume.pdf")

@app.get("/videos")
def get_video_list():
    video_dir = Path("frontend/dist/assets/videos")
    video_files = [f.name for f in video_dir.glob("*.mp4")]
    return JSONResponse(video_files)

@app.post("/contact")
def submit_contact(contact: ContactCreate, db: Session = Depends(deps.get_db)):
    return create_contact(db, contact)