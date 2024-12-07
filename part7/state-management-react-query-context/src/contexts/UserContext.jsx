import { createContext, useReducer, useContext } from 'react'

const UserContext = createContext()

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload
    case 'RM_USER':
      return null
    default:
      return state
  }
}

export const UserContextProvider = (props) => {
  const [userValue, userDispatch] = useReducer(userReducer, null)
  return (
    <UserContext.Provider value={[userValue, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

export const useUserValue = () => {
  const [value] = useContext(UserContext)
  return value
}

export const useUserDispatch = () => {
  const [, userDispatch] = useContext(UserContext)
  return userDispatch
}

