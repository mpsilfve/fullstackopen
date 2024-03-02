const Notification = ({ msg, klass }) => {
    if (msg === null) {
      return (<></>)
    }
    else {
      console.log("Notification", msg)
      return (<div className={klass}>{msg}</div>)
    }
}

export default Notification