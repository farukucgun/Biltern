import React, {useState, useEffect} from 'react';
import StudentItem from './StudentItem';
import ActionButton from '../../UI/ActionButton';
import { getGraderDetails } from '../../apiHelper/backendHelper';

import classes from "./StudentList.module.css";

const dummyStudents = [
    {
        id: 1,
        studentName: 'Faruk Ucgun',
        course: 'CS 101',
        ta: "Furkan Kaya",
        deadline: '23.05.2023'
    },
    {
        id: 2,
        studentName: 'Asli Tok',
        course: 'CS 101',
        ta: "Ceren Ekinci",
        deadline: '25.05.2023'
    }
]

const StudentList = () => {

    const [students, setStudents] = useState(dummyStudents);

    useEffect(() => {
        getGraderDetails()
        .then(res => {
            setStudents(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    const studentClickHandler = (id) => {
        console.log(id);
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
                {students.map((student) => 
                    <StudentItem 
                        student={student} 
                        key={student.id}
                        onStudentClicked={studentClickHandler}
                    />
                )}
            </ul>
        </div>
    )
}

export default StudentList;