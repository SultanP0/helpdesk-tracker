import { useState } from "react";

function TicketForm(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");

  function handleAdd() {
    fetch("http://127.0.0.1:5000/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        description: description,
        priority: priority,
      }),
    })
    .then((res) => res.json())
    .then((newTicket) => {
      props.onAdd(newTicket);
      setTitle("");
      setDescription("");
      setPriority("Medium");
    });
  }

  return (
    <div>
      <h2>New Ticket</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <button className="primary" onClick={handleAdd}>Add Ticket</button>
    </div>
  );
}

export default TicketForm;
