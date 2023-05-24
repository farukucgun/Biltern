import React, {useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import Spinner from '../UI/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { setTimedAlert } from '../features/alertSlice';

/**
 * @author Faruk Uçgun
 * @date 09.05.2023
 */

const PrivateRoute = (props) => {
    const dispatch = useDispatch();
    const Component = props.component;
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const role = useSelector(state => state.auth.user?.role) || '';
    const loading = useSelector(state => state.auth.loading);

    useEffect(() => {
        if (props.role && props.role !== role) {
            dispatch(setTimedAlert({msg: 'You are not authorized to view this page.', alertType: 'warning', timeout: 4000}));
        }
    }, [dispatch, props.role, role]);
        
    if (loading) return <Spinner />;
    if (isAuthenticated) {
        if (props.role && props.role !== role) {
            return <Navigate to='/dashboard' />;
        }
        return Component;
    }    
    return <Navigate to='/login' />;
};

export default PrivateRoute;