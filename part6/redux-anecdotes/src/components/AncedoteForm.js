import { connect } from "react-redux"
import { createAncedote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = (props) => {
    const newAnecdote = async (e) => {
        e.preventDefault()
        const input = e.target.anecdote_input.value
        e.target.anecdote_input.value = ''
        props.createAncedote(input)
        props.setNotification(`you created '${input}'`, 5)
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

const ConnectedAnecdoteForm = connect(
    null,
    { createAncedote, setNotification }
)(AnecdoteForm)

export default ConnectedAnecdoteForm