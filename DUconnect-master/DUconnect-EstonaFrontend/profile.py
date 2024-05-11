from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import PlainTextResponse

app = FastAPI()

# Allowing CORS for frontend to access the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload-image", response_class=PlainTextResponse)
async def upload_image(image: UploadFile = File(...)):
    with open(f"uploads/{image.filename}", "wb") as buffer:
        buffer.write(await image.read())
    return f"/uploads/{image.filename}"

@app.get("/profile")
async def read_profile():
    with open("profile.txt", "r") as file:
        data = file.read().split(",")
    return {
        "user_id": data[0],
        "user_name": data[1],
        "name": data[2],
        "email": data[3],
        "department": data[4],
        "registration_number": data[5],
        "session": data[6],
        "hall": data[7],
        "password": data[8]
    }
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8888)