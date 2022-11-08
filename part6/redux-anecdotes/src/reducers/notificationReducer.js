import { createSlice } from "@reduxjs/toolkit";

const initialState = ""
let timeoutID = null

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        displayNotification(state, action) {
            return action.payload
        },
        removeNotification(state, action){
            return ""
        }
    }
})

const setNotification = (message, time) => {
    return async dispatch => {
        if (timeoutID) clearTimeout(timeoutID)
        dispatch(displayNotification(message))
        timeoutID = setTimeout(() => dispatch(removeNotification()), time * 1000)
    }
}

export default notificationSlice.reducer
export const { displayNotification, removeNotification } = notificationSlice.actions
export { setNotification }