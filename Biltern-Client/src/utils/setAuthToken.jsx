import axios from "axios";

/**
 * @author Faruk Uçgun
 * @date 23.04.2023
 */

const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
}

export default setAuthToken;