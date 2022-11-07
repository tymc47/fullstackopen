import { useDispatch } from "react-redux"
import { createAncedote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const newAnecdote = (e) => {
        e.preventDefault()
        const input = e.target.anecdote_input.value
        e.target.anecdote_input.value = ''
        dispatch(createAncedote(input))
    }

    return (
    <div>
        <h2>create new</h2>
        <form onSubmit={newAnecdote}>
            <div><input name='anecdote_input'/></div>
            <button type='submit'>create</button>
        </form>
    </div>
    )
}

export default AnecdoteForm