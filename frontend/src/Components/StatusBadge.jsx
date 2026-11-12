function StatusBadge(props) {
  const className =
    "badge badge-" + props.status.toLowerCase().replace(" ", "-");
  return <span className={className}>{props.status}</span>;
}

export default StatusBadge;