import { useSelector, useDispatch } from 'react-redux'
import { voteNote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"

const AncedoteList = () => {
    const anecdotes = useSelector(state => {
        if(state.filter === '') return state.anecdotes
        return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
    })
    const sortedAnecdotes= [...anecdotes].sort((a, b) => b.votes - a.votes)
    const dispatch = useDispatch()

    const voteHandle = (anecdote) => {
        dispatch(voteNote(anecdote))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
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
                    <button onClick={() => voteHandle(anecdote)}>vote</button>
                  </div>
                </div>
            )}
        </div>
    )
}

export default AncedoteList