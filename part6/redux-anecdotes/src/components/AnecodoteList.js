import { useSelector, useDispatch } from 'react-redux'
import { voteOf } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from "../reducers/notificationReducer"

const AncedoteList = () => {
    const anecdotes = useSelector(state => {
        console.log(typeof state.anecdotes[0].content)
        if(state.filter === '') return state.anecdotes
        return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
    })
    const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteOf(id))
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
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                  </div>
                </div>
            )}
        </div>
    )
}

export default AncedoteList