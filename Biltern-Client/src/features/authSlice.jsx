import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { setTimedAlert } from './alertSlice';

/**
 * @author Faruk Uçgun
 * @date 23.04.2023
 */

const initialState = {
    user: null,
    token: localStorage.getItem("token") || "",
    isAuthenticated: false,
    isLoading: true,
    errors: {}
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        loadUser: (state) => {
            if (localStorage.token) {
                setAuthToken(localStorage.token);
            }
            return state = {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                token: localStorage.getItem("token") || "",
                user : {
                    role: localStorage.getItem("role") || "",
                    email: localStorage.getItem("email") || "",
                    name: localStorage.getItem("name") || "",
                    id: localStorage.getItem("id") || ""
                }
            };
        },
        login: (state, action) => {
            localStorage.setItem("token", action.payload.jwt);
            localStorage.setItem("role", action.payload.role);
            localStorage.setItem("email", action.payload.email);
            localStorage.setItem("id", action.payload.bilkentId);
            localStorage.setItem("name", action.payload.fullName);
            return state = {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                token: action.payload.jwt,
                user : {
                    role: action.payload.role,
                    email: action.payload.email,
                    name: action.payload.fullName,
                    id: action.payload.bilkentId
                }
            };
        },
        logout: (state) => {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("email");
            localStorage.removeItem("id");
            localStorage.removeItem("name");
            return state = {
                ...state,
                isAuthenticated: false,
                isLoading: false,
                token: null,
                user: null
            };
        },
        resetPassword: (state) => {
            // localStorage.removeItem("token");
            // localStorage.removeItem("role");
            return state = {
                ...state,
                isAuthenticated: false,
                isLoading: false,
                token: null,
                user: null
            };
        },
        changePassword: (state) => {
            // localStorage.removeItem("token");
            // localStorage.removeItem("role");
            return state = {
                ...state,
                isAuthenticated: false,
                isLoading: false,
                token: null,
                user: null
            };
        }
    }
});

export const { loadUser, login, logout, resetPassword, changePassword } = authSlice.actions;

export const loginAsync = (payload) => async dispatch => {
    const { id, password } = payload;    

    const body = {bilkentId: id, password: password};

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    await axios.post("http://localhost:8080/auth/login", body, config)
        .then(res => {
            dispatch(login(res.data));
            setTimeout(() => {
                dispatch(setTimedAlert({msg: "Session expired, please login again", alertType: "info", timeout: 4000}));
                dispatch(logout())
            }, 60 * 60 * 1000);
        })
        .catch(err => {
            dispatch(setTimedAlert({msg: "Wrong credentials", alertType: "error", timeout: 4000}));
            // const errors = err.response.data.errors;
            // if (errors) {
            //     errors.forEach((error) => {
            //         dispatch(setTimedAlert({msg: "Wrong credentials", alertType: "error", timeout: 4000}));
            //     });
            // }
            // dispatch(logout());
        });
};

export const resetPasswordAsync = (payload) => async dispatch => {
    const { email, id } = payload;
    const body = {bilkentMail: email, bilkentId: id};

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    await axios.post("http://localhost:8080/auth/resetPassword", body, config)
        .then(res => {
            dispatch(resetPassword());
            dispatch(setTimedAlert({msg: "Password reset email has been sent", alertType: "info", timeout: 4000}));
        })
        .catch(err => {
            dispatch(setTimedAlert({msg: "Couldn't send password reset email", alertType: "error", timeout: 4000}));
            // const errors = err.response.data.errors;
            // if (errors) {
            //     errors.forEach((error) => {
            //         dispatch(setTimedAlert({msg: "Couldn't reset password", alertType: "error", timeout: 4000}));
            //     });
            // }
            // dispatch(logout());
        });
};

export const changePasswordAsync = (payload) => async dispatch => {
    const { studentId, password } = payload;
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": payload.token || localStorage.getItem("token"),
            "BilkentID": studentId ? studentId : ""
        }
    };

    const body = {bilternID: studentId, password: password};
    
    await axios.patch("http://localhost:8080/auth/changePassword", body, config)
        .then(res => {
            dispatch(changePassword());
            dispatch(setTimedAlert({msg: "Password has been changed", alertType: "success", timeout: 4000}))
            
        })
        .catch(err => {
            dispatch(setTimedAlert({msg: "Couldn't change password", alertType: "error", timeout: 4000}));
            console.log(err);
            // const errors = err.response.data.errors;
            // if (errors) {
            //     errors.forEach((error) => {
            //         dispatch(setTimedAlert({msg: "Couldn't change password", alertType: "error", timeout: 4000}));
            //     });
            // }
            // dispatch(logout());
        });
};

export const selectAuth = (state) => state.auth;
export default authSlice.reducer;

