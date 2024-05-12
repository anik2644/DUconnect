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


conn_str = "mongodb+srv://Anik11556:hP5bhZqwGkrhpqiA@duconnect.yq05boz.mongodb.net/"


try:
    client = pymongo.MongoClient(conn_str)
except Exception:
    print("Error:" + Exception)




   
myDb = client["Event_Management"] # scema name
EventCollection = myDb["Event_List"] # table name


# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from any origin
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



class Event(BaseModel):  
    name: str
    location: str
    time: str
    title: str
    description: str
    media: str


def fetchEvents() -> List[dict]:
    documents_list = []
    documents = EventCollection.find()
    for document in documents:
        if '_id' in document:
            del document['_id']
        documents_list.append(document)
    return documents_list





def saveEvent(event_entity: Event) -> List[dict]:
    

    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")[:-3]
    my_doc = {
        "_id": current_time,
        "id": event_entity.name,
        "location": event_entity.location,
        "time": event_entity.time,
        "title": event_entity.title,
        "description": event_entity.description,
        "media": event_entity.media
    }
    res = EventCollection.insert_one(my_doc)
    documents_list = fetchEvents()

    return documents_list








@app.post("/create-event/")
async def create_event(event: Event):

    print("I am the king of the world!")

    image = event.media

    source_file = "C:/Users/anik1/Pictures/" + image
    print(source_file)


    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")[:-3] 

    event.name = current_time


    try:
        # Upload the image to MinIo
        bucket_name = "python-test-bucket"
        destination_file = current_time+'.png'

        minio_client.fput_object(
            bucket_name, destination_file, source_file,
            # length=image.file._length
        )

        print(
          source_file, "successfully uploaded as object",
          destination_file, "to bucket", bucket_name,
        )

        image_url = minio_client.presigned_get_object(bucket_name, destination_file, expires=timedelta(days=7))
        print("Image URL:", image_url)        

        event.media = image_url




    except S3Error as exc:
        print("Error occurred:", exc)
        raise HTTPException(status_code=500, detail="Failed to upload image")



    try:
        documents = saveEvent(event)
        return {"message": "User registered successfully", "documents":  documents}
    except Exception as e:
        raise HTTPException(status_code=500, detail="An error occurred while creating the event")



@app.get("/")
async def read_root():
   return {"message": "Hello, World!"}





# @app.post("/create-event/")
# async def create_event(event: Event):
#     print("hello world")
    # try:
    #     with open("events.txt", "a") as f:
    #         json.dump(event.dict(), f)  # Convert event object to dictionary and write as JSON
    #         f.write("\n")  # Add a newline character for separation
    #     return {"message": "Event created successfully!"}
    # except Exception as e:
    #     raise HTTPException(status_code=500, detail=f"Failed to create event: {str(e)}")
    

@app.get("/get-events/")
async def get_events():
    print("in get method!")
    try:
        events = fetchEvents()
        return events
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error occurred while fetching events")



    # try:
    #     with open("events.txt", "r") as f:
    #         events_data = [json.loads(line) for line in f.readlines() if line.strip()]  # Read and parse each line as JSON
    #         print("hi i am here!")
    #     return {"events": events_data}
    # except Exception as e:
    #     raise HTTPException(status_code=500, detail=f"Failed to read events: {str(e)}")