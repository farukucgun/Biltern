import React, { useState, useCallback } from 'react';
import { setTimedAlert } from '../features/alertSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';

export const useHttp = () => {
    const dispatch = useDispatch();
    const baseURL = "http://localhost:8080/";
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const sendRequest = useCallback(async (requestConfig, applyData) => {
        setIsLoading(true);
        setError(null);

        axios({
            url: baseURL + requestConfig.url,
            method: requestConfig.method ? requestConfig.method : 'GET',
            headers: requestConfig.headers ? requestConfig.headers : {},
            data: requestConfig.body ? JSON.stringify(requestConfig.body) : null // try if works without JSON.stringify
        })
        .then(data => { 
            applyData(data);
        })
        .catch(err => {
            dispatch(setTimedAlert({msg: errMsg || err.message || "Something went wrong!", alertType: "error", timeout: 4000}));
        });

        setIsLoading(false);
    }, []);
    
    return {
        isLoading,
        error,
        sendRequest
    };
}

export default useHttp;
