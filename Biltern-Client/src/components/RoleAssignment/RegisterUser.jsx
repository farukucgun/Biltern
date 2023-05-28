import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { setTimedAlert } from '../../features/alertSlice';
import { registerUser } from '../../apiHelper/backendHelper';

import classes from './RoleAssignment.module.css';

/**
 * @author Faruk Uçgun
 * @date 08.05.2023
 * @todo: when the user changes it's own role, it should load the new role
 * @todo: conditionally change the role options
 */

const RegisterUser = () => {

    const dispatch = useDispatch();
    const [role, setRole] = useState('');
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [department , setDepartment] = useState('');
    const [isDean , setIsDean] = useState(false);


    const submitHandler = (event) => {
        event.preventDefault();
        const data = {
            bilkentId: id,
            userName: name,
            email: email,
            bilternUserRole: role,
            department: department,
            isDean: isDean
        }

        registerUser(data)
        .then(res => {
            dispatch(setTimedAlert({msg: "Role assigned successfully", alertType: "success", timeout: 4000}));
        })
        .catch(err => {
            console.log(err);
            dispatch(setTimedAlert({msg: "Role assignment failed", alertType: "error", timeout: 4000}));
        })
    }

    const idChangeHandler = (event) => { setId(event.target.value); }
    const nameChangeHandler = (event) => { setName(event.target.value); }
    const roleChangeHandler = (event) => { setRole(event.target.value); }
    const emailChangeHandler = (event) => { setEmail(event.target.value); }
    const depChangeHandler = (event) => { setDepartment(event.target.value); }
    const isDeanChangeHandler = (event) => { setIsDean(event.target.value); }

    return (
        <div className={classes.roleAssignment_container}>
            <h1>Register User</h1>
            <input 
                type="number" 
                id="bilkentid"
                placeholder="Bilkent ID"
                className={classes.input}
                onChange={idChangeHandler}
            />
            <input 
                type="text" 
                id="username"
                placeholder="User Name"
                className={classes.input}
                onChange={nameChangeHandler}
            />
            <input 
                type="text" 
                id="email"
                placeholder="User Email"
                className={classes.input}
                onChange={emailChangeHandler}
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
            {role=="DEPARTMENT_COORDINATOR" &&
            <>
                <label 
                    htmlFor="isDean">
                    Is Dean: 
                </label>
                <input
                    type="checkbox"
                    id="isDean"
                    name='isDean'
                    className={classes.input}
                    onChange={isDeanChangeHandler}
                />
            </>}
            <select 
                name="dep-select" 
                id="dep-select"
                className={classes.select}
                onChange={depChangeHandler}
            >
                <option className={classes.option} value="Empty">Choose a Department</option>
                <option className={classes.option} value="CS">CS</option>
                <option className={classes.option} value="IE">IE</option>
                <option className={classes.option} value="EEE">EEE</option>
                <option className={classes.option} value="ME">ME</option>
            </select>
            <button 
                type='submit' 
                className={classes.submit}
                onClick={submitHandler}
                >
                    Register User
            </button>
        </div>
    );
}

export default RegisterUser;