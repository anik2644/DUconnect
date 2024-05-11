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
    userId: str
    username: str
    name: str
    email: str
    department: str
    registrationNo: str
    session: str
    hall: str
    password: str
    
@app.post("/store_register_info/")
async def store_register_info(info: BloodDonationInfo):
    try:
        # Check if email already exists
        with open("registration_information.txt", "r") as file:
            lines = file.readlines()
            for line in lines:
                data = line.strip().split(',')
                if data[3] == info.email:  # Check if email already exists
                    raise HTTPException(status_code=400, detail="Email already registered")

        # If email is unique, proceed with registration
        with open("registration_information.txt", "a") as file:
            file.write(f"{info.userId},{info.username},{info.name},{info.email},{info.department},{info.registrationNo},{info.session},{info.hall},{info.password}\n")
        return {"message": "Ragistration successful"}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error")

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="localhost", port=8000)