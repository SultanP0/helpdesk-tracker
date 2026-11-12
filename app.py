from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)


def get_db():
    conn = sqlite3.connect("helpdesk.db")
    return conn


def init_db():
    conn = get_db()
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS tickets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            priority TEXT NOT NULL DEFAULT 'Medium',
            status TEXT NOT NULL DEFAULT 'Open'
        )
        """
    )
    conn.commit()
    conn.close()


@app.route("/")
def home():
    return jsonify({"message": "Help desk API is running"})


@app.route("/tickets")
def get_tickets():
    conn = get_db()
    rows = conn.execute(
        "SELECT id, title, description, priority, status FROM tickets").fetchall()
    conn.close()
    tickets = []
    for row in rows:
        tickets.append({"id": row[0], "title": row[1],
                        "description": row[2], "priority": row[3], "status": row[4]})
    return jsonify(tickets)


@app.route("/tickets", methods=["POST"])
def add_ticket():
    data = request.get_json()
    conn = get_db()
    cursor = conn.execute(
        "INSERT INTO tickets (title, description, priority) VALUES (?, ?, ?)",
        (data["title"], data["description"], data["priority"]),
    )
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()
    return jsonify({"id": new_id, "title": data["title"], "description": data["description"], "priority": data["priority"], "status": "Open"}), 201



@app.route("/tickets/<int:ticket_id>", methods=["DELETE"])
def delete_ticket(ticket_id):
    conn = get_db()
    conn.execute("DELETE FROM tickets WHERE id = ?", (ticket_id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Ticket deleted"})


@app.route("/tickets/<int:ticket_id>", methods=["PUT"])
def update_ticket(ticket_id):
    data = request.get_json()
    conn = get_db()
    conn.execute("UPDATE tickets SET status = ? WHERE id = ?", (data["status"], ticket_id))
    conn.commit()
    conn.close()
    return jsonify({"id": ticket_id, "status": data["status"]})


if __name__ == "__main__":
    init_db()
    app.run(debug=True)
