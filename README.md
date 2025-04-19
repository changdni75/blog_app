# BLOG_APP

BLOG_APP is a full-stack blogging platform that allows users to create, read, update, and delete blog posts. It features user authentication, a React-based frontend, and a Django backend integrated with MongoDB.

## Features

- **User Authentication**: Register, login, and logout functionality.
- **Blog Management**: Create, view, update, and delete blogs.
- **Pagination**: View blogs with pagination support.
- **Role-Based Access**: Only authenticated users can create, update, or delete their blogs.
- **Responsive Design**: Optimized for desktop and mobile devices.

## Tech Stack

- **Frontend**: React, React Router, Axios, Tailwind CSS.
- **Backend**: Django, Django REST Framework, MongoEngine, SQLite (or MongoDB).

## Installation

### Prerequisites
- Node.js and npm installed.
- Python 3.x installed.
- MongoDB installed and running.

### Steps to Install and Run the Application
1. Clone the repository:
    ```
    git clone <repository-url>
    cd blog_app
    ```

2. Set up the backend:
    ```
    cd backend
    pip install -r requirements.txt
    python manage.py runserver
    ```

3. Set up the frontend:
    ```
    cd ../frontend
    npm install
    npm start
    ```

## Project Structure

```
BLOG_APP/
├── backend/
│   ├── accounts/
│   ├── blogs/
│   ├── blog_app/
│   ├── db.sqlite3
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── public/index.html
```

## Notes

- Ensure MongoDB is running before starting the backend server if using MongoDB as the database.
- Replace `<repository-url>` with the actual URL of the repository when cloning.

## APIs Exposed

### Authentication APIs
- **POST api/register/**: Register a new user.
- **POST /api/auth/login**: Authenticate a user and return a token.
- **POST /api/auth/logout**: Logout the authenticated user.

### Blog APIs
- **GET /api/blogs/**: Retrieve a list of all blogs (supports pagination).
- **GET /api/blogs/:id**: Retrieve details of a specific blog by ID.
- **POST api/blogs/create/**: Create a new blog (authenticated users only).
- **PUT api/blogs/update/<str:blog_id>/**: Update an existing blog by ID (authenticated users only).
- **DELETE api/blogs/delete/<str:blog_id>/**: Delete a blog by ID (authenticated users only).


