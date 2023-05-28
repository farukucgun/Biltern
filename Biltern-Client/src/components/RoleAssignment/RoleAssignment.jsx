import React, {useState} from 'react';
import { assignRoleToUsers } from '../../apiHelper/backendHelper';
import { useDispatch } from 'react-redux';
import { setTimedAlert } from '../../features/alertSlice';

import classes from './RoleAssignment.module.css';

/**
 * @author Faruk Uçgun
 * @date 08.05.2023
 * @todo: when the user changes it's own role, it should load the new role
 * @todo: conditionally change the role options
 */

const RoleAssignment = () => {

    const dispatch = useDispatch();
    const [role, setRole] = useState('');
    const [id, setId] = useState('');

    const submitHandler = (event) => {
        event.preventDefault();
        assignRoleToUsers(role, [id])
        .then(res => {
            dispatch(setTimedAlert({msg: "Role assigned successfully", alertType: "success", timeout: 4000}));
        })
        .catch(err => {
            console.log(err);
            dispatch(setTimedAlert({msg: "Role assignment failed", alertType: "error", timeout: 4000}));
        })
        setId('');
        setRole('');
    }

    const idChangeHandler = (event) => {
        setId(event.target.value);
    }

    const roleChangeHandler = (event) => {
        setRole(event.target.value);
    }

    return (
        <div className={classes.roleAssignment_container}>
            <h1>Role Assignment</h1>
            <input 
                type="text" 
                id="bilkentid"
                placeholder="Bilkent ID"
                className={classes.input}
                onChange={idChangeHandler}
            />
            <select 
                name="role-select" 
                id="role-select"
                className={classes.select}
                onChange={roleChangeHandler}
            >
                <option className={classes.option} value="Empty">Choose a Role</option>
                <option className={classes.option} value="BCC_ADMIN">BCC Admin</option>
                <option className={classes.option} value="FACULTY_MEMBER">Grader</option>
                <option className={classes.option} value="UNDERGRADUATE">Student</option>
                <option className={classes.option} value="TEACHING_ASSISTANT">Teaching Assistant</option>
                <option className={classes.option} value="SECRETARY">Secretary</option>
                <option className={classes.option} value="DEPARTMENT_COORDINATOR">Coordinator</option>
            </select>
            <button 
                type='submit' 
                className={classes.submit}
                onClick={submitHandler}
                >
                    Assign Role 
            </button>
        </div>
    );
}

export default RoleAssignment;