import axios from "axios";

/**
 * @author Faruk Uçgun
 * @date 27.05.2023
 */

const setHeaders = (token) => {
    axios.defaults.headers.common["Content-Type"] = "application/json";
    if (token) {
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
}

export default setHeaders;