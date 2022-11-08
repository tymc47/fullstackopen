import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AncedoteForm'
import AncedoteList from './components/AnecodoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AncedoteList />
      
      <AnecdoteForm />
    </div>
  )
}

export default App