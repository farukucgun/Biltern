import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";  

/**
 * @author Faruk Uçgun
 * @date 23.04.2023
 */

const initialState = {
    alerts: []
};

const alertSlice = createSlice({
    name: "alert",
    initialState: initialState,
    reducers: {
        setAlert: (state, action) => {
            const { msg, alertType, id } = action.payload;
            return state = {
                ...state,
                alerts: [{msg, alertType, id}, ...state.alerts]
            };
        },
        removeAlert: (state, action) => {
            const { id } = action.payload;
            return state = {
                ...state,
                alerts: state.alerts.filter((alert) => alert.id !== id)
            }
        }
    }    
});

export const { setAlert, removeAlert } = alertSlice.actions;

export const setTimedAlert = (payload) => (dispatch) => {
    const { msg, alertType, timeout } = payload;
    const id = uuidv4();
    dispatch(setAlert({msg, alertType, id}));
    setTimeout(() => dispatch(removeAlert({id})), timeout);
}

export const selectAlert = (state) => state.alert;
export default alertSlice.reducer;
