import React from 'react'
import { useSelector } from 'react-redux'

 function Message() {
  const message = useSelector((state) => state.infoMessage)

  return <div id="message">{message}</div>
}

export default Message
