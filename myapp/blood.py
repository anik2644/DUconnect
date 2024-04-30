from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

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
    bloodGroup: str
    department: str
    session: str
    area: str

@app.post("/store_blood_info/")
async def store_blood_info(info: BloodDonationInfo):
    try:
        with open("blood_information.txt", "a") as file:
            file.write(f"{info.name},{info.bloodGroup},{info.department},{info.session},{info.area}\n")
        return {"message": "Blood donation information saved"}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error occurred while saving information")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)