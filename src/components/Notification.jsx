import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector(state => state.notification);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  return (
    <div style={style}>
      {notification.map((n, i) => <div key={i}>{n}</div>)}
    </div>
  )
}

export default Notification