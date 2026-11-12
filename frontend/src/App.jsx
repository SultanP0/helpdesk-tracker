import TicketForm from "./Components/TicketForm";
import { useState, useEffect } from "react";
import TicketList from "./Components/TicketList";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";

function App() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/tickets")
      .then((res) => res.json())
      .then((data) => setTickets(data));
  }, []);

  function addTicket(newTicket) {
    setTickets([...tickets, newTicket]);
  }

  function deleteTicket(id) {
    fetch(`http://127.0.0.1:5000/tickets/${id}`, {
      method: "DELETE",
    }).then(() => {
      setTickets(tickets.filter((ticket) => ticket.id !== id));
    });
  }

  function updateStatus(id, newStatus) {
    fetch(`http://127.0.0.1:5000/tickets/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    }).then(() => {
      setTickets(
        tickets.map((ticket) =>
          ticket.id === id ? { ...ticket, status: newStatus } : ticket,
        ),
      );
    });
  }

    return (
    <BrowserRouter>
      <h1>Help Desk</h1>
      <Navbar />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <TicketList
                tickets={tickets}
                onDelete={deleteTicket}
                onStatusChange={updateStatus}
              />
            }
          />
          <Route path="/new" element={<TicketForm onAdd={addTicket} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
