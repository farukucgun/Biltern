import React, {useState, useEffect} from 'react';
import StudentItem from './StudentItem';
import ActionButton from '../../UI/ActionButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGraderDetails, getTeachingAssistantDetails, getSecretaries } from '../../apiHelper/backendHelper';
import { setTimedAlert } from '../../features/alertSlice';

import classes from "./StudentList.module.css";

/**
 * @author Faruk Uçgun
 * @date 25.05.2023
 * @abstract: This component is responsible for displaying student list
 */

const StudentList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [reports, setReports] = useState([]);
    const [department, setDepartment] = useState("CS");
    const role = useSelector(state => state.auth.user.role);

    useEffect(() => {
        if (role == "TEACHING_ASSISTANT") {
            getTeachingAssistantDetails()
                .then(res => {
                    
                    // DUE DATE CHECKS

                    console.log(res.data);
                    setReports(res.data.reports);
                    setDepartment(res.data.department);
                })
                .catch(err => {
                    console.log(err);
                    dispatch(setTimedAlert("Error while ta details", "error"));
                })
        } else if (role == "FACULTY_MEMBER") {
            getGraderDetails()
                .then(res => {
                    console.log(res.data);
                    setReports(res.data.reports);
                    setDepartment(res.data.department);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, []);

    const studentClickHandler = (id, index) => {
        navigate(`/currentstatus/${id}`, {state:{department: department, report: reports[index]}});
    }

    const studentSearchHandler = () => {
        console.log("searching student");
    }

    return (
        <div className={classes.studentListPage}>
            <h1 className={classes.header}>Student List</h1>
            <div className={classes.studentListTop}>
                <div className={classes.searchContainer}>
                    <input 
                        type="text" 
                        placeholder="Search by student name"
                        className={classes.searchBar}
                    />
                    <ActionButton 
                        text="Search"
                        className={classes.searchButton}
                        onClick={studentSearchHandler}
                        
                    />
                </div>
                <div className={classes.studentListHeaders}>
                    <p className={classes.listHeaderItem}>ID</p>
                    <p className={classes.listHeaderItem}>Student Name</p>
                    <p className={classes.listHeaderItem}>Course</p>
                    <p className={classes.listHeaderItem}>TA</p>
                    <p className={classes.listHeaderItem}>Deadline</p>
                    <p className={classes.listHeaderItem}>Status</p>
                </div>
            </div>

            <ul className={classes.studentList}>
                {reports.map((report, index) => 
                    <StudentItem 
                        report={report} 
                        key={index}
                        index={index}
                        onStudentClicked={studentClickHandler}
                        department={department}
                    />
                )}
            </ul>
        </div>
    )
}

export default StudentList;