import { useDispatch } from 'react-redux'
import { filter } from '../reducers/filterReducer';

const Filter = ({ }) => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        event.preventDefault();
        const content = event.target.value;
        dispatch(filter(content));
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div>
            filter <input onChange={handleChange} style={style} />
        </div>
    )
}

export default Filter;