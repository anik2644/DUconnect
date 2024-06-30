# DUCONNECT

DUCONNECT is a web-based social media application targeting the university community. This application aims to facilitate communication, information sharing, and event management among university students and faculty.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Authentication**: Secure login and registration system for users.
- **Newsfeed**: Users can see updates and posts from their connections.
- **Posts**: Users can create, edit, and delete their own posts.
- **Article Writing and Viewing**: Users can write and publish articles as well as read articles written by others.
- **Blood Donation**: A feature to connect blood donors with those in need.
- **Event Management**: Users can create, manage, and participate in events.

## Tech Stack

- **Frontend**: React
- **Backend**: FastAPI
- **Database**: MongoDB
- **File Storage**: MinIO

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/duconnect.git
    cd duconnect
    ```

2. **Frontend Setup**:
    ```bash
    cd frontend
    npm install
    npm start
    ```

3. **Backend Setup**:
    ```bash
    cd backend
    python -m venv env
    source env/bin/activate   # On Windows use `env\Scripts\activate`
    pip install -r requirements.txt
    uvicorn main:app --reload
    ```

4. **MongoDB Setup**:
    - Ensure MongoDB is installed and running.
    - Create a database named `duconnect`.

5. **MinIO Setup**:
    - Ensure MinIO is installed and running.
    - Configure MinIO with appropriate buckets for file storage.

## Usage

- Visit `http://localhost:3000` in your browser to access the frontend.
- The backend API will be running on `http://localhost:8000`.

## Contributing

We welcome contributions from the community! To contribute:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

Please ensure your code follows the project's coding standards and includes tests where applicable.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Happy connecting with DUCONNECT! 🚀
