import { createSlice } from "@reduxjs/toolkit";
import ancedoteService from "../services/anecdotes";

const initialState = [];

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    vote(state, action) {
      const changed = action.payload
      return state.map(an => an.id === changed.id ? changed : an)
    },
    createNew(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await ancedoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

const createAncedote = (content) => {
  return async dispatch => {
    const anecdote = await ancedoteService.createNew(content)
    dispatch(createNew(anecdote))
  }
}

const voteNote = (content) => {
  return async dispatch => {
    const anecdote = await ancedoteService.vote(content)
    dispatch(vote(anecdote))
  }
}

export default anecdoteSlice.reducer
export const { vote, createNew, setAnecdotes } = anecdoteSlice.actions
export { initializeAnecdotes, createAncedote, voteNote }


