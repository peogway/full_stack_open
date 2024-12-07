import { createContext, useReducer, useContext } from 'react'

const BlogsContext = createContext()

const blogsReducer = (state, action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return state.concat(action.payload)
    case 'SET_BLOG':
      return action.payload
    default:
      return state
  }
}

export const BlogsContextProvider = (props) => {
  const [blogsValue, blogsDispatch] = useReducer(blogsReducer, null)
  return (
    <BlogsContext.Provider value={[blogsValue, blogsDispatch]}>
      {props.children}
    </BlogsContext.Provider>
  )
}

export const useBlogsValue = () => {
  const [value] = useContext(BlogsContext)
  return value
}

export const useBlogsDispatch = () => {
  const [, dispatch] = useContext(BlogsContext)
  return dispatch
}

