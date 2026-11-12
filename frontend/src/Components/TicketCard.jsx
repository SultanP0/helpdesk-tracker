import StatusBadge from "./StatusBadge";

function TicketCard(props) {
  return (
    <div className="card">
      <h3>{props.title}</h3>
      <p>{props.description}</p>
      <p>Priority: {props.priority}</p>
      <StatusBadge status={props.status} />
      <select
        value={props.status}
        onChange={(e) => props.onStatusChange(props.id, e.target.value)}
      >
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Closed">Closed</option>
      </select>
      <button onClick={() => props.onDelete(props.id)}>Delete</button>
    </div>
  );
}

export default TicketCard;