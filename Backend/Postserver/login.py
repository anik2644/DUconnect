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

class LoginInfo(BaseModel):
    email: str  # Change to email
    password: str

@app.post("/login/")
async def login(info: LoginInfo):
    try:
        # Read the registration information file
        with open("registration_information.txt", "r") as file:
            lines = file.readlines()
        
        # Check if the entered email and password match any line in the file
        for line in lines:
            data = line.strip().split(',')
            if data[3] == info.email and data[8] == info.password:  # Use index 3 for email
                return {"message": "Login successful"}
        
        # If no match found, raise an exception
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="Registration information file not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail="An error occurred while logging in")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=5000)
