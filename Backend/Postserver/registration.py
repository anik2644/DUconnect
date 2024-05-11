from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from fastapi import Query
import pymongo
import asyncio
from datetime import datetime
from typing import List
from bson import ObjectId  # Import ObjectId from bson module




app = FastAPI()


conn_str = "mongodb+srv://Anik11556:hP5bhZqwGkrhpqiA@duconnect.yq05boz.mongodb.net/"


try:
    client = pymongo.MongoClient(conn_str)
except Exception:
    print("Error:" + Exception)




   
myDb = client["Registration-Info"] # scema name
UserCollection = myDb["allUser"] # table name





# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from any origin
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

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

        





def save_Reaction(userInfo: UserInfo) -> List[dict]:
   
   print(":habijabi")
   print(userInfo.username)

   documents_list = fetchUser()  



   is_email_unique = True  # Assume email is unique by default
   for doc in documents_list:
       if doc['email'] == userInfo.email:
           is_email_unique = False
           break
        


   if is_email_unique: 
        
        current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")[:-3] 
        myDoc = {
         "_id" : current_time,
         "userId": current_time,
         "username": userInfo.username,
         "name": userInfo.name,
         "email": userInfo.email,
         "department": userInfo.department,
         "registrationNo": userInfo.registrationNo,
         "session": userInfo.session,
         "hall": userInfo.hall,
         "password": userInfo.password
           #   "img":post.img
         }
        res = UserCollection.insert_one(myDoc)
        documents_list.append(myDoc)
   else:
        
        return []
    

   return documents_list







@app.post("/store_register_info/")
async def store_register_info(info: UserInfo):
    print("I am the king of the world!")
    documents = save_Reaction(info)
    if len(documents) != 0:
        return {"message": "Registration Done", "documents": documents}
    elif len(documents) == 0:
        raise HTTPException(status_code=500, detail="Email Already exist")
    else:
        raise HTTPException(status_code=500, detail="Regestration failed!!!!!")



    # try:



    #     # Check if email already exists
    #     # with open("registration_information.txt", "r") as file:
    #     #     lines = file.readlines()
    #     #     for line in lines:
    #     #         data = line.strip().split(',')
    #     #         if data[3] == info.email:  # Check if email already exists
    #     #             raise HTTPException(status_code=400, detail="Email already registered")

    #     # # If email is unique, proceed with registration
    #     # with open("registration_information.txt", "a") as file:
    #     #     file.write(f"{info.userId},{info.username},{info.name},{info.email},{info.department},{info.registrationNo},{info.session},{info.hall},{info.password}\n")
    #     return {"message": "Ragistration successful"}
    # except Exception as e:
    #     raise HTTPException(status_code=500, detail="Error")

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="localhost", port=8000)