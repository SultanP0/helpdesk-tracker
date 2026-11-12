import TicketCard from "./TicketCard";


function TicketList(props) {
  return (
    <div>


      {props.tickets.map((ticket) => (
        <TicketCard
          key={ticket.id}
          title={ticket.title}
          description={ticket.description}
          priority={ticket.priority}
          status={ticket.status}
          id={ticket.id}
          onDelete={props.onDelete}
          onStatusChange={props.onStatusChange}
        />
      ))}

      
    </div>
  );
}

export default TicketList;
