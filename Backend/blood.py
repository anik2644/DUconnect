from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import csv
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




   
myDb = client["Blood_Management"] # scema name
bloodCollection = myDb["Blood_Requestation"] # table name


# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from any origin
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

class BloodDonationInfo(BaseModel):
    name: str
    dateOfBirth : str
    address : str
    registrationNumber : str
    bloodGroup: str
    department: str
    session: str
    area: str




def fetchBlood() -> List[dict]:  
   print("hello anik")
   documents_list = []
   documents = bloodCollection.find()
   for document in documents:
        
        if '_id' in document:
            del document['_id']

        documents_list.append(document)

   return documents_list      





def saveBlood(bloodEntity: BloodDonationInfo) -> str:
   
    print(":habijabi")
    # documents_list = fetchBlood()       


    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")[:-3] 
    myDoc = {
        "_id" : current_time,
        "name": bloodEntity.name,
        "dateOfBirth": bloodEntity.dateOfBirth,
        "address": bloodEntity.address,
        "registrationNumber": bloodEntity.registrationNumber,
        "bloodGroup": bloodEntity.bloodGroup,
        "department": bloodEntity.department,
        "session": bloodEntity.session,
        "area": bloodEntity.area
    }
    res = bloodCollection.insert_one(myDoc)


    return "Blood entity added"






@app.post("/store_blood_info/")
async def store_blood_info(info: BloodDonationInfo):
    try:
        saveBlood(info)  
        return {"message": "Blood entity added"}  
    except Exception as e:
        raise HTTPException(status_code=500, detail="An error occurred while storing blood information")



@app.get("/get_blood_info")
async def get_blood_info():
    try:
        blood_info = fetchBlood()
        # with open("blood_information.txt", "r") as file:
        #     reader = csv.DictReader(file, fieldnames=["name", "dateOfBirth", "address", "registrationNumber", "bloodGroup", "department", "session", "area"])
        #     for row in reader:
        #         blood_info.append(row)
        return blood_info
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error occurred while fetching information")


# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="localhost", port=8080)