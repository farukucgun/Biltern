import axios from "axios";
import setHeaders from "./setHeaders";
import { useSelector, useDispatch } from "react-redux";
import { setTimedAlert } from "../features/alertSlice";

/**
 * @author Faruk Uçgun
 * @date 25.05.2023
 * @abstract: This function fetches due date of a report
 */

const fetchDueDate = async (props) => {
    const dispatch = useDispatch();
    const {id, setDueDate, errMsg} = props;
    const token = useSelector(state => state.auth.token);
    setHeaders(token);
    await axios.get(`http://localhost:8080/report/dueDate/${id}`)
        .then(res => {
            setDueDate(res.data);
        })
        .catch(err => {
            dispatch(setTimedAlert({msg: errMsg || "Error while fetching due date", alertType: "error", timeout: 4000}));
        });
    };

export default fetchDueDate;