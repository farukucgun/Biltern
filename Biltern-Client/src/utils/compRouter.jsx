import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * @author Faruk Uçgun
 * @date 28.04.2023
 */

const compRouter = (props) => {
    return function InnerComp(innerProps) {
        return (
            props.condition ? <props.component {...innerProps} /> : <Navigate to = {props.redirectTo} replace />
        );
    }
};

export default compRouter;