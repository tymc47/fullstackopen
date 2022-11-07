import AnecdoteForm from './components/AncedoteForm'
import AncedoteList from './components/AnecodoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
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