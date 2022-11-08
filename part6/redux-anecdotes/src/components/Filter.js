import { connect } from "react-redux"
import { setFilter } from "../reducers/filterReducer"

const Filter = (props) => {
    const handleInput = (event) => {
        props.setFilter(event.target.value)
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

const ConnectedFilter = connect( 
    null,
    { setFilter }
)(Filter)

export default ConnectedFilter