import { useDispatch } from "react-redux"
import { createNew } from "../reducers/anecdoteReducer"
import { removeNotification, setNotification } from "../reducers/notificationReducer"
import ancedoteService from "../services/anecdotes"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const newAnecdote = async (e) => {
        e.preventDefault()
        const input = e.target.anecdote_input.value
        e.target.anecdote_input.value = ''
        const response = await ancedoteService.createNew(input)
        dispatch(createNew(response))
        dispatch(setNotification(`you created '${input}'`))
        setTimeout(() => {
            dispatch(removeNotification())
        },5000)
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