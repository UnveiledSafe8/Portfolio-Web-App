from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path
from fastapi.responses import JSONResponse

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