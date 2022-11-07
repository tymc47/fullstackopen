import { useDispatch } from "react-redux"
import { setFilter } from "../reducers/filterReducer"

const Filter = () => {
    const dispatch = useDispatch()

    const handleInput = (event) => {
        dispatch(setFilter(event.target.value))
    }

    const style = {
        marginBottom: 10
      }

    return (
        <div style={style}>
            filter 
            <input onChange={handleInput}></input>
        </div>
    )
}

export default Filter