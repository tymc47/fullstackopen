import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AncedoteForm'
import AncedoteList from './components/AnecodoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { setAnecdotes } from './reducers/anecdoteReducer'
import ancedoteService from './services/anecdotes'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    ancedoteService.getAll()
    .then(anecdotes => {
      dispatch(setAnecdotes(anecdotes)) 
    })
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