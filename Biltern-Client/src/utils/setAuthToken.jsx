import axios from "axios";

/**
 * @author Faruk Uçgun
 * @date 23.04.2023
 * @abstract: This component is responsible for setting token to header
 */

const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
}

export default setAuthToken;