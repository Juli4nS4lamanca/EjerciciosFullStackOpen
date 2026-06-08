import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  const showNotification = notification === "" ? <></> : <div style={style}>{notification}</div>

  return showNotification
}

export default Notification
