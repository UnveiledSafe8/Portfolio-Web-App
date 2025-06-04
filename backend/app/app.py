from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app = FastAPI()

app.mount("/frontend/dist", StaticFiles(directory="frontend/dist"), name="frontend-dist")

@app.get("/")
def index():
    return FileResponse("frontend/dist/index.html")

@app.get("/resume")
def get_resume():
    return FileResponse("/assets/docs/resume.pdf")