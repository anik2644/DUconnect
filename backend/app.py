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


@app.get("/")
async def read_root():
   return {"message": "Hello, World!"}



class Event(BaseModel):
    name: str
    location: str
    time: str
    title: str
    description: str


@app.post("/create-event/")
async def create_event(event: Event):
    print("hello world")
    try:
        with open("events.txt", "a") as f:
            json.dump(event.dict(), f)  # Convert event object to dictionary and write as JSON
            f.write("\n")  # Add a newline character for separation
        return {"message": "Event created successfully!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create event: {str(e)}")
    

@app.get("/get-events/")
async def get_events():
    print("in get method!")
    try:
        with open("events.txt", "r") as f:
            events_data = [json.loads(line) for line in f.readlines() if line.strip()]  # Read and parse each line as JSON
            print("hi i am here!")
        return {"events": events_data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to read events: {str(e)}")