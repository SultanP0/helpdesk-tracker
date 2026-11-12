# Help Desk Ticket Tracker

A full stack help desk app where you can create IT support tickets, change their status, and delete them. Tickets are saved in a database.

## Features

- Create a ticket with a title, description, and priority
- See all tickets in a list
- Change a ticket's status (Open, In Progress, Closed)
- Delete a ticket
- Separate pages with React Router

## Tech Stack

- **Frontend:** React, React Router, Vite, CSS
- **Backend:** Python, Flask, Flask-CORS
- **Database:** SQLite

## API Routes

| Method | Route | What it does |
| ------ | ----- | ------------ |
| GET | `/tickets` | Get all tickets |
| POST | `/tickets` | Create a ticket |
| PUT | `/tickets/<id>` | Change a ticket's status |
| DELETE | `/tickets/<id>` | Delete a ticket |

## How to Run It

You need Python and Node.js installed.

**1. Start the backend**

```
pip install flask flask-cors
python app.py
```

The API runs at `http://127.0.0.1:5000`. The database file is created the first time you start it.

**2. Start the frontend** (in a second terminal)

```
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.