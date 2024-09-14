import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'NEW_NOTI':
      return { ...state, noti: action.payload }
    case 'NEW_ERROR':
      return { ...state, error: action.payload }
    case 'RM_NOTI':
      return { ...state, noti: '' }
    case 'RM_ERROR':
      return { ...state, error: '' }
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, {
    noti: '',
    error: '',
  })
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotiValue = () => {
  const [value] = useContext(NotificationContext)
  return value
}

export const useNotiDispatch = () => {
  const [, valueDispatch] = useContext(NotificationContext)
  return valueDispatch
}

