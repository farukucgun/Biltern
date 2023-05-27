import axios from "axios";
import setHeaders from "./setHeaders";
import { useSelector, useDispatch } from "react-redux";
import { setTimedAlert } from "../features/alertSlice";

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