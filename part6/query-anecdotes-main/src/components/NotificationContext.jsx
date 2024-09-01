import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'NEW_NOTI':
      return action.payload
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ''
  )

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotiValue = () => {
  const [notification] = useContext(NotificationContext)
  return notification
}

export const useNotiDispatch = () => {
  const [, notificationDispatch] = useContext(NotificationContext)
  return notificationDispatch
}

