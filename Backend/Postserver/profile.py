from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import PlainTextResponse
from fastapi import Request
from fastapi import Query
import pymongo
from typing import List, Optional
import asyncio
from datetime import datetime
from typing import List
from bson import ObjectId  # Import ObjectId from bson module
from pydantic import BaseModel
from fastapi.responses import JSONResponse



app = FastAPI()


conn_str = "mongodb+srv://Anik11556:hP5bhZqwGkrhpqiA@duconnect.yq05boz.mongodb.net/"


try:
    client = pymongo.MongoClient(conn_str)
except Exception:
    print("Error:" + Exception)




   
myDb = client["Registration-Info"] # scema name
UserCollection = myDb["allUser"] # table name



loginCollection = myDb["loginInfo"] # table name



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
   print("hello anik")
   documents_list = []
   documents = UserCollection.find()
   for document in documents:
        
        if '_id' in document:
            del document['_id']

        documents_list.append(document)

   return documents_list      



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

    # with open("profile.txt", "r") as file:
    #     data = file.read().split(",")
    # return {
    #     "user_id": data[0],
    #     "user_name": data[1],
    #     "name": data[2],
    #     "email": data[3],
    #     "department": data[4],
    #     "registration_number": data[5],
    #     "session": data[6],
    #     "hall": data[7],
    #     "password": data[8]
    # }





def update_profile(profile_data):
    email = profile_data.get('email')
    # Assuming you have a unique email for each user in the database

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

    # Update the profile information based on the email id
    res = UserCollection.update_one({"email": email}, {"$set": myDoc})

    # Check if the update was successful
    if res.modified_count > 0:
        return {"message": "Profile updated successfully"}
    else:
        return {"message": "Profile not found or could not be updated"}
    


# def update_profile(profile_data):
    
#     myDoc = {
#      "_id" : current_time,
#      "userId": current_time,
#      "username": userInfo.username,
#      "name": userInfo.name,
#      "email": userInfo.email,
#      "department": userInfo.department,
#      "registrationNo": userInfo.registrationNo,
#      "session": userInfo.session,
#      "hall": userInfo.hall,
#      "password": userInfo.password
#        #   "img":post.img
#      }
#     res = UserCollection.insert_one(myDoc)






@app.post("/profile")
async def update_profile_data(request: Request):
    profile_data = await request.json()
    update_profile(profile_data)
    return {"message": "Profile updated successfully"}





    
    # # Update the profile.txt file with the new profile data
    # with open("profile.txt", "w") as profile_file:
    #     profile_file.write(",".join(profile_data.values()))

    # # Update registration_information.txt file
    # email = profile_data["email"]
    # updated_array = ",".join(profile_data.values())

    # with open("registration_information.txt", "r") as reg_file:
    #     lines = reg_file.readlines()

    # with open("registration_information.txt", "w") as reg_file:
    #     for line in lines:
    #         data = line.split(",")
    #         if data[3] == email:  # Assuming email is at the 4th index
    #             reg_file.write(updated_array + "\n")
    #         else:
    #             reg_file.write(line)


@app.post("/upload-image", response_class=PlainTextResponse)
async def upload_image(image: UploadFile = File(...)):
    with open(f"uploads/{image.filename}", "wb") as buffer:
        buffer.write(await image.read())
    return f"/uploads/{image.filename}"



@app.get("/profile")
async def get_profile(email: str):
    print("profile get")
    user_profile = read_profile(email)
    if user_profile:
        return JSONResponse(content=user_profile)
    else:
        return JSONResponse(content={"message": "User not found"}, status_code=404)
    




@app.post("/profile")
async def update_profile_data(request: Request):
    profile_data = await request.json()
    update_profile(profile_data)
    return {"message": "Profile updated successfully"}



# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="localhost", port=8888)