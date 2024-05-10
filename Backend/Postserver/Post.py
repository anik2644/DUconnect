from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import pymongo
import asyncio
from datetime import datetime
from typing import List
from bson import ObjectId  # Import ObjectId from bson module


app = FastAPI()


class Post(BaseModel):
    # id: int
    name: str
    userId: str
    profilePic: str
    desc: str
    img: str
   #  likes: str
    


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
# app.add_middleware(
#    CORSMiddleware,
#    allow_origins=["http://localhost:3001"],
#    allow_credentials=True,
#    allow_methods=["GET", "POST", "PUT", "DELETE"],
#    allow_headers=["*"],
# )


# Configure CORS
app.add_middleware(
   CORSMiddleware,
   allow_origins=["http://localhost:3000", "http://localhost:3001"],
   allow_credentials=True,
   allow_methods=["GET", "POST", "PUT", "DELETE"],
   allow_headers=["*"],
)


# app.add_middleware(
#    CORSMiddleware,
#    allow_origins=["http://localhost:3000"],
#    allow_credentials=True,
#    allow_methods=["GET", "POST", "PUT", "DELETE"],
#    allow_headers=["*"],
# )
profilePic = "https://i.ibb.co/8YkTy5X/399802121-2096661420678789-8201301384481582908-n.jpg"
img = "https://i.ibb.co/8YkTy5X/399802121-2096661420678789-8201301384481582908-n.jpg?auto=compress&cs=tinysrgb&w=1600"


# Sample posts data
posts = [
    {
        "id": 1,
        "name": "Anik",
        "userId": 1,
        "profilePic": "https://i.ibb.co/8YkTy5X/399802121-2096661420678789-8201301384481582908-n.jpg",
        "desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        "img": "https://i.ibb.co/8YkTy5X/399802121-2096661420678789-8201301384481582908-n.jpg?auto=compress&cs=tinysrgb&w=1600"
    },
    {
        "id": 2,
        "name": "Eesor",
        "userId": 1,
        "profilePic": "https://i.ibb.co/ggyKMj3/279725233-1949964898521765-5705253541412336116-n.jpg",
        "desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        "img": "https://i.ibb.co/ggyKMj3/279725233-1949964898521765-5705253541412336116-n.jpg?auto=compress&cs=tinysrgb&w=1600"
    },
    {
        "id": 3,
        "name": "Anik",
        "userId": 2,
        "profilePic": "https://i.ibb.co/8YkTy5X/399802121-2096661420678789-8201301384481582908-n.jpg?auto=compress&cs=tinysrgb&w=1600",
        "desc": "Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore."
    }
]



def fetchpost() -> List[dict]:
   
   print("hello anik")
   documents_list = []
   documents = myCollection.find()
   for document in documents:
      #   print("anik there\n")
      #   print(document['desc'])
        # document['id'] = 2 #int(document['id'])
        document['userId'] =int(document['userid'])
            # Add new fields
        document['profilePic'] = profilePic
        document['img'] = img

    # Delete the '_id' field
        if '_id' in document:
            del document['_id']
            del document['userid']
        

        
        documents_list.append(document)
   return documents_list



def save_post(post: Post)  -> List[dict]:
   
   print(":habijabi")
   current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")[:-3]  # Get current time with milliseconds

#  step 1: write to data base


   myDoc = {
        "id": current_time,
        "name": post.name,
        "userid": post.userId,
      #   "profilePic": post.profilePic,
        "desc":post.desc,
      #   "img":post.img
    }
   # #print(myDoc)
   res = myCollection.insert_one(myDoc)

#    asyncio.sleep(2)
#  Step 2: Reading the document
   documents_list = fetchpost()  #[]
#    documents = myCollection.find()
#    for document in documents:
#       #   print("anik there\n")
#         print(document)
#         document['_id'] = str(document['_id'])

#         documents_list.append(document)

      #   print("anik there\n")
      #   documents_list.append(document)

   return documents_list
   # record = myCollection.find_one()
   # print("anik there\n")
   # print(record)
   # documents_list.append(record)
   # print("anik there\n")
   # return documents_list
# #    documents = myCollection.find()
# #    for document in documents:
# #        print(document)




@app.post("/posts/")
async def create_post(post: Post):
    # print("Received Post:", post.dict())  # Just for debugging purposes
    print("I am the king of the world!")

    # return {"message": "Post saved successfully"} 
   #  try:
   #      # Open the file in append mode and write the post data
   #      with open("posts.txt", "a") as f:
   #          f.write(str(post.dict()) + "\n")
   #      return {"message": "Post saved successfully"}
   #  except Exception as e:
   #      raise HTTPException(status_code=500, detail=str(e))
    
    documents = save_post(post)
    return {"message": "User registered successfully", "documents": documents}







@app.get("/getpost/")
async def getPost():# -> List[dict]:


   print("mahmuf there\n")
      #   documents_list.append(document)
   documents_list =  fetchpost()
   return documents_list


# async def read_root() -> dict:
#    documents = myCollection.find()
#    documents_count = myCollection.count_documents({})  # Get the count of documents
#    return {"message": "User registered successfully", "documents_count": documents_count}






@app.post("/")
async def read_root():
   print("i am okk")
   return {"message": "Hello, World!"}



@app.get("/posts/")
async def get_posts():
    print("i am okk")
    return posts