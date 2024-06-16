from fastapi import FastAPI, UploadFile, File, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import PlainTextResponse, JSONResponse
from fastapi import Query
import pymongo
from typing import List, Optional
import asyncio
from datetime import datetime, timedelta
from bson import ObjectId  # Import ObjectId from bson module
from pydantic import BaseModel
from minio import Minio
from minio.error import S3Error

app = FastAPI()

conn_str = "mongodb+srv://Anik11556:hP5bhZqwGkrhpqiA@duconnect.yq05boz.mongodb.net/"

try:
    client = pymongo.MongoClient(conn_str)
except Exception as e:
    print("Error:", e)

myDb = client["Registration-Info"]  # schema name
UserCollection = myDb["allUser"]  # table name
loginCollection = myDb["loginInfo"]  # table name

class UserInfo(BaseModel):
    userId: str
    username: str
    name: str
    email: str
    department: str
    registrationNo: str
    session: str
    hall: str
    password: str

def fetchUser() -> List[dict]:
    documents_list = []
    documents = UserCollection.find()
    for document in documents:
        if '_id' in document:
            del document['_id']
        documents_list.append(document)
    return documents_list

minio_client = Minio(
    "localhost:9000",
    access_key="USFOGIPEN0JDIW88MR9L",
    secret_key="89bDhZGxpDhnMqWmFeX0zzRLqu8+tYD8cIjjmImT",
    secure=False
)

# Allowing CORS for frontend to access the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def read_profile(email: str) -> Optional[dict]:
    userList = fetchUser()
    for user in userList:
        if user.get('email') == email:
            return user
    return None

def update_profile(profile_data):
    email = profile_data.get('email')
    myDoc = {
        "userId": profile_data.get("userId"),
        "username": profile_data.get("username"),
        "name": profile_data.get("name"),
        "email": email,
        "department": profile_data.get("department"),
        "registrationNo": profile_data.get("registrationNo"),
        "session": profile_data.get("session"),
        "hall": profile_data.get("hall"),
        "password": profile_data.get("password")
    }

    if "profile_photo" in profile_data:
        image = profile_data["profile_photo"]
        source_file = "C:/Users/anik1/Pictures/" + image
        current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")[:-3]
        try:
            bucket_name = "python-test-bucket"
            destination_file = current_time + '.png'
            minio_client.fput_object(
                bucket_name, destination_file, source_file,
            )
            image_url = minio_client.presigned_get_object(bucket_name, destination_file, expires=timedelta(days=7))
            myDoc["profile_photo"] = image_url
        except S3Error as exc:
            print("Error occurred:", exc)
            raise HTTPException(status_code=500, detail="Failed to upload image")

    res = UserCollection.update_one({"email": email}, {"$set": myDoc})
    if res.modified_count > 0:
        return {"message": "Profile updated successfully"}
    else:
        return {"message": "Profile not found or could not be updated"}

@app.post("/profile")
async def update_profile_data(request: Request):
    profile_data = await request.json()
    response = update_profile(profile_data)
    return JSONResponse(content=response)

@app.post("/upload-image", response_class=PlainTextResponse)
async def upload_image(image: UploadFile = File(...)):
    with open(f"uploads/{image.filename}", "wb") as buffer:
        buffer.write(await image.read())
    return f"/uploads/{image.filename}"

@app.get("/profile")
async def get_profile(email: str):
    user_profile = read_profile(email)
    if user_profile:
        return JSONResponse(content=user_profile)
    else:
        return JSONResponse(content={"message": "User not found"}, status_code=404)

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="localhost", port=8888)
