from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import pymongo

conn_str = "mongodb+srv://anik2644:anik2644@reginfo.nd8qjpf.mongodb.net/"
try:
    client = pymongo.MongoClient(conn_str)
except Exception:
    print("Error:" + Exception)


   
myDb = client["Registration_Info"]
myCollection = myDb["User_collection"]

app = FastAPI()


# Configure CORS
app.add_middleware(
   CORSMiddleware,
   allow_origins=["http://localhost:3001"],
   allow_credentials=True,
   allow_methods=["GET", "POST", "PUT", "DELETE"],
   allow_headers=["*"],
)


app.add_middleware(
   CORSMiddleware,
   allow_origins=["http://localhost:3000"],
   allow_credentials=True,
   allow_methods=["GET", "POST", "PUT", "DELETE"],
   allow_headers=["*"],
)


class User(BaseModel):
   username: str
   password: str
  # confirm_password: str
   email: str
   phone_number: str












def save_user(user: User):
   myDoc = {
        "username": user.username,
        "password": user.password,
        "email": user.email,
        "phone_number": user.phone_number
    }
   res = myCollection.insert_one(myDoc)
#    query_del_all = {}  # Empty filter to match all documents
#    result_del_all = myCollection.delete_many(query_del_all)
#    with open('users.txt', 'a') as file:
#        file.write(json.dumps(user.dict()) + '\n')

   documents = myCollection.find()
   for document in documents:
       print(document)
   
   

def is_username_unique(username: str):
    # Query the database to check if the username exists
    query = {"username": username}
    existing_user = myCollection.find_one(query)
    return existing_user is None

def is_email_unique(email: str):
    # Query the database to check if the email exists
    query = {"email": email}
    existing_user = myCollection.find_one(query)
    return existing_user is None

def is_phone_unique(phone_number: str):
    # Query the database to check if the phone number exists
    query = {"phone_number": phone_number}
    existing_user = myCollection.find_one(query)
    return existing_user is None

def is_valid_username(username: str):
   return len(username) > 5


def is_valid_password(password: str, confirm_password: str):
   return len(password) > 6 and password == confirm_password


def is_valid_phone_number(phone_number: str):
   return len(phone_number) == 11




@app.get("/")
async def read_root():
   return {"message": "Hello, World!"}


@app.post("/register/")
async def register(user: User):
   print("hello world")
   print("Received user data:", user.dict())
   if not is_valid_username(user.username):
       raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username should have more than 5 characters.")
   # if not is_valid_password(user.password):
   #     raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Password must have more than 6 characters.")
   if not is_email_unique(user.email):
       raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already exists.")
   if not is_phone_unique(user.phone_number):
       raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Phone number already exists.")
   if not is_valid_phone_number(user.phone_number):
       raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Phone number should have exactly 11 digits.")
  
   if not is_username_unique(user.username):
       raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already exists.")
  
   save_user(user)
   return {"message": "User registered successfully"}


