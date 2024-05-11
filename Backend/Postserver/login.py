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
loginCollection = myDb["loginInfo"] # table name




# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from any origin
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)



class LoginInfo(BaseModel):
    email: str
    password: str



def fetchUser() -> List[dict]:  
   print("hello anik")
   documents_list = []
   documents = loginCollection.find()
   for document in documents:
        
        if '_id' in document:
            del document['_id']

        documents_list.append(document)

   return documents_list      

        
def CheckLogin(info: LoginInfo) -> List[dict]:  
    print("aahabijabi")
    print(info.email)

    documents_list = fetchUser()  

    isMatched = False  # Python is case-sensitive; it's "False," not "false"
    for doc in documents_list:
        if doc['email'] == info.email and doc['password'] == info.password:
            isMatched = True
            break
 
    return [{'isMatched': isMatched}]     

       




@app.post("/login/")
async def login(info: LoginInfo):
    try:
        print("i am here")
        login_result = CheckLogin(info)
        if login_result[0]['isMatched']:
            return {"message": "Login successful"}
        else:
            raise HTTPException(status_code=401, detail="Invalid email or password")
    
        # # Read the registration information file
        # with open("registration_information.txt", "r") as file:
        #     lines = file.readlines()
        
        # # Check if the entered email and password match any line in the file
        # for line in lines:
        #     data = line.strip().split(',')
        #     if data[3] == info.email and data[8] == info.password:  # Use index 3 for email
        #         # Save the login data to profile.txt
        #         with open("profile.txt", "w") as profile_file:
        #             profile_file.write(','.join(data))
        #         return {"message": "Login successful"}
        
        # If no match found, raise an exception
        # raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # except FileNotFoundError:
    #     raise HTTPException(status_code=500, detail="Registration information file not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail="An error occurred while logging in")

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="localhost", port=5000)

# anik11556@gmail.com