from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import PlainTextResponse
from fastapi import Request

app = FastAPI()

# Allowing CORS for frontend to access the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def read_profile():
    with open("profile.txt", "r") as file:
        data = file.read().split(",")
    return {
        "user_id": data[0],
        "user_name": data[1],
        "name": data[2],
        "email": data[3],
        "department": data[4],
        "registration_number": data[5],
        "session": data[6],
        "hall": data[7],
        "password": data[8]
    }

def update_profile(profile_data):
    # Update the profile.txt file with the new profile data
    with open("profile.txt", "w") as profile_file:
        profile_file.write(",".join(profile_data.values()))

    # Update registration_information.txt file
    email = profile_data["email"]
    updated_array = ",".join(profile_data.values())

    with open("registration_information.txt", "r") as reg_file:
        lines = reg_file.readlines()

    with open("registration_information.txt", "w") as reg_file:
        for line in lines:
            data = line.split(",")
            if data[3] == email:  # Assuming email is at the 4th index
                reg_file.write(updated_array + "\n")
            else:
                reg_file.write(line)


@app.post("/upload-image", response_class=PlainTextResponse)
async def upload_image(image: UploadFile = File(...)):
    with open(f"uploads/{image.filename}", "wb") as buffer:
        buffer.write(await image.read())
    return f"/uploads/{image.filename}"

@app.get("/profile")
async def get_profile():
    return read_profile()

@app.post("/profile")
async def update_profile_data(request: Request):
    profile_data = await request.json()
    update_profile(profile_data)
    return {"message": "Profile updated successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8888)