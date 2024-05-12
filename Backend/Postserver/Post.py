from fastapi import FastAPI, HTTPException
from fastapi import UploadFile, File

from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import pymongo
import asyncio
from datetime import datetime
from typing import List
from bson import ObjectId  # Import ObjectId from bson module

from minio import Minio
from minio.error import S3Error
from datetime import timedelta


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


minio_client = Minio(
        "localhost:9000",
        access_key="RI0BNCMXTVSCYLCJ3K67",
        secret_key="y22NN31zTQ2illxYInC19NcxMEjmDmS730PiI8HX",
        secure=False
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
        # document['img'] = img

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
         "img":post.img
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

    image = post.img

    source_file = "C:/Users/anik1/Pictures/" + image
    print(source_file)


    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")[:-3] 

    try:
        # Upload the image to MinIo
        bucket_name = "python-test-bucket"
        destination_file = current_time+'.png'
        # destination_file = post.img.split("/")[-1]  # Extract filename from img URL
        

        # Upload the image
    # client.fput_object(
    #     bucket_name, destination_file, source_file,
    # )
    # print(
    #     source_file, "successfully uploaded as object",
    #     destination_file, "to bucket", bucket_name,
    # )
     
        
        # Save the file to MinIO
        minio_client.fput_object(
            bucket_name, destination_file, source_file,
            # length=image.file._length
        )
        print(
          source_file, "successfully uploaded as object",
          destination_file, "to bucket", bucket_name,
        )

        # Generate presigned URL for the uploaded image
       

        image_url = minio_client.presigned_get_object(bucket_name, destination_file, expires=timedelta(days=7))
        print("Image URL:", image_url)

        # You can now use image_url as needed, e.g., store it in the database
        post.img = image_url

        # Here you can save the post to your MongoDB collection or perform any other operations
        documents = save_post(post)
        return {"message": "User registered successfully", "documents": documents}
    
    except S3Error as exc:
        print("Error occurred:", exc)
        raise HTTPException(status_code=500, detail="Failed to upload image")


    # return {"message": "Post saved successfully"} 
   #  try:
   #      # Open the file in append mode and write the post data
   #      with open("posts.txt", "a") as f:
   #          f.write(str(post.dict()) + "\n")
   #      return {"message": "Post saved successfully"}
   #  except Exception as e:
   #      raise HTTPException(status_code=500, detail=str(e))
    








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