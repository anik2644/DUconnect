from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Query
import pymongo
import asyncio
from datetime import datetime
from typing import List
from bson import ObjectId  # Import ObjectId from bson module


app = FastAPI()


class Reaction(BaseModel):
    # id: int
    userId : str
    postId: str
    time: str
   #  likes: str
    

class Comment(BaseModel):
    # id: int
    userId : str
    postId: str
    time: str
    comment: str

   #  likes: str
    

conn_str = "mongodb+srv://Anik11556:hP5bhZqwGkrhpqiA@duconnect.yq05boz.mongodb.net/"


try:
    client = pymongo.MongoClient(conn_str)
except Exception:
    print("Error:" + Exception)




   
myDb = client["Reaction&Comments"] # scema name
LikeCollection = myDb["Like"] # table name
CommentCollection = myDb["Comments"] # table name


app.add_middleware(
   CORSMiddleware,
   allow_origins=["http://localhost:3000", "http://localhost:3001"],
   allow_credentials=True,
   allow_methods=["GET", "POST", "PUT", "DELETE"],
   allow_headers=["*"],
)




def fetchReaction() -> List[dict]:  
   print("hello anik")
   documents_list = []
   documents = LikeCollection.find()
   for document in documents:
        
        if '_id' in document:
            del document['_id']

        documents_list.append(document)

   return documents_list      

        


def save_Reaction(reaction: Reaction)  -> List[dict]:
   
   print(":habijabi")
   current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")[:-3] 
   myDoc = {
        "id": current_time,
        "userId": reaction.userId,
        "postId": reaction.postId,
        "time": reaction.time,

      #   "img":post.img
    }

   res = LikeCollection.insert_one(myDoc)
   documents_list = fetchReaction()  
   return documents_list




@app.post("/Like/")
async def AddLike(reaction: Reaction):
    print("I am the king of the world!")
    documents = save_Reaction(reaction)
    return {"message": "Reaction Done", "documents": documents}





@app.delete("/Unlike/")  
async def deleteLikeByPostId(post_id: str = Query(..., alias="postId")):
    print("in delete like")
    try:
        # Delete the like document with matching postId
        result = LikeCollection.delete_one({"postId": post_id})

        if result.deleted_count == 1:
            print(f"Deleted like for post ID: {post_id}")
            return {"message": f"Like for post ID: {post_id} deleted successfully"}
        else:
            # No matching like found
            return {"message": f"No like found for post ID: {post_id}"}, 404

    except Exception as e:
        print("Error:", e)
        raise HTTPException(status_code=500, detail="Failed to delete like")




@app.get("/Like/")
async def getLike():# -> List[dict]:


   print("mahmuf there\n")
      #   documents_list.append(document)
   documents_list =  fetchReaction()
   return documents_list


@app.delete("/Like/")
async def deleteAllReactions():
    try:
        # Delete all documents from the Like collection
        result = LikeCollection.delete_many({})
        print(f"Deleted {result.deleted_count} reactions")
        return {"message": f"Deleted {result.deleted_count} reactions"}
    except Exception as e:
        print("Error:", e)
        raise HTTPException(status_code=500, detail="Failed to delete reactions")







# @app.post("/Comment/")
# async def AddComment():
#    print("i am okk")
#    return {"message": "Hello, World!"}



# @app.get("/Comment/")
# async def getComment():
#     print("i am okk")
#     return posts

