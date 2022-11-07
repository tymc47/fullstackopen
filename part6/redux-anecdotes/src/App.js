import AnecdoteForm from './components/AncedoteForm'
import AncedoteList from './components/AnecodoteList'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AncedoteList />
      
      <AnecdoteForm />
    </div>
  )
}

export default App