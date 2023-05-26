import React, {useRef} from 'react';
import { useDispatch } from 'react-redux';

import classes from './RoleAssignment.module.css';

/**
 * @author Faruk Uçgun
 * @date 08.05.2023
 * TODO: conditionally change the role options
 */

const RoleAssignment = () => {

    const dispatch = useDispatch();
    const emailRef = useRef();

    return (
        <div className={classes.roleAssignment_container}>
            <h1>Role Assignment</h1>
            <input 
                type="text" 
                id="bilkentid"
                placeholder="User Email"
                // onChange={emailChangeHandler}
                className={classes.input}
                ref={emailRef}
            />
            <select 
                name="role-select" 
                id="role-select"
                className={classes.select}
            >
                <option className={classes.option} value="Empty">Choose a Role</option>
                <option className={classes.option} value="BCC Admin">BCC Admin</option>
                <option className={classes.option} value="Grader">Grader</option>
                <option className={classes.option} value="Student">Student</option>
                <option className={classes.option} value="Teaching Assistant">Teaching Assistant</option>
                <option className={classes.option} value="Secretary">Secretary</option>
                <option className={classes.option} value="Coordinator">Coordinator</option>
            </select>
            <button type='submit' className={classes.submit}>Assign</button>
        </div>
    );
}

export default RoleAssignment;