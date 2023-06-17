import axios from "axios";

/**
 * @author Faruk Uçgun
 * @date 27.05.2023
 * @abstract: This component is responsible for setting common headers for axios
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