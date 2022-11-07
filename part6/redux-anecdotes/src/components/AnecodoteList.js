import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from "../reducers/notificationReducer"

const AncedoteList = () => {
    const anecdotes = useSelector(state => {
        if(state.filter === '') return state.anecdotes
        return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
    })
    const sortedAnecdotes= [...anecdotes].sort((a, b) => a.votes - b.votes)
    const dispatch = useDispatch()

    const voteHandle = (id) => {
        console.log('vote', id)
        dispatch(vote(id))
        dispatch(setNotification(`you voted '${anecdotes.find(x => x.id === id).content}'`))
        setTimeout(() => {
            dispatch(removeNotification())
        },5000)
    }

    return (
        <div>
            {sortedAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                  <div>
                    {anecdote.content}
                  </div>
                  <div>
                    has {anecdote.votes}
                    <button onClick={() => voteHandle(anecdote.id)}>vote</button>
                  </div>
                </div>
            )}
        </div>
    )
}

export default AncedoteList