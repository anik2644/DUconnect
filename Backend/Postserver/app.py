from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import pymongo
import asyncio

app = FastAPI()


class Post(BaseModel):
    # id: int
    name: str
    userId: str
    profilePic: str
    desc: str
    img: str
    likes: str
    


conn_str = "mongodb+srv://Anik11556:hP5bhZqwGkrhpqiA@duconnect.yq05boz.mongodb.net/"


#"mongodb+srv://anik2644:anik2644@reginfo.nd8qjpf.mongodb.net/"
# mongodb+srv://Anik11556:hP5bhZqwGkrhpqiA@duconnect.yq05boz.mongodb.net/?retryWrites=true&w=majority&appName=Duconnect
try:
    client = pymongo.MongoClient(conn_str)
except Exception:
    print("Error:" + Exception)




   
myDb = client["Post_Collection"] # scema name
myCollection = myDb["Post Collection"] # table name


# Configure CORS
app.add_middleware(
   CORSMiddleware,
   allow_origins=["http://localhost:3001"],
   allow_credentials=True,
   allow_methods=["GET", "POST", "PUT", "DELETE"],
   allow_headers=["*"],
)


# Configure CORS
app.add_middleware(
   CORSMiddleware,
   allow_origins=["http://localhost:3000", "http://localhost:3001"],
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


def save_post(post: Post):
   
   print(":hekadspa")
   # myDoc = {
   #      "name": post.name,
   #      "userid": post.userId,
   #  }
   # #print(myDoc)
   # res = myCollection.insert_one(myDoc)

#    asyncio.sleep(2)
#  Step 7: Reading the document
   documents = myCollection.find()
   for document in documents:
        print("anik there\n")
        print(document)
        print("anik there\n")

   # record = myCollection.find_one()
   # print("anik there\n")
   # print(record)
   # print("anik there\n")
# #    documents = myCollection.find()
# #    for document in documents:
# #        print(document)




@app.post("/posts/")
async def create_post(post: Post):
    # print("Received Post:", post.dict())  # Just for debugging purposes
    print("I am the king of the world!")

    # # return {"message": "Post saved successfully"} 
    # try:
    #     # Open the file in append mode and write the post data
    #     with open("posts.txt", "a") as f:
    #         f.write(str(post.dict()) + "\n")
    #     return {"message": "Post saved successfully"}
    # except Exception as e:
    #     raise HTTPException(status_code=500, detail=str(e))
    
    save_post(post)
    return {"message": "User registered successfully"}







@app.get("/")
async def read_root():
   print("i am okk")
   return {"message": "Hello, World!"}



@app.post("/")
async def read_root():
   print("i am okk")
   return {"message": "Hello, World!"}



