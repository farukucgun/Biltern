import React from "react";
import classes from '../styles/CoordinatorListPanel.module.css'
import CoordinatorData from '../Data/CoordinatorListPanel.json'

/**
 * @author Enes Bektaş
 * @date 07.05.2023
 */

export default function CoordinatorListPanel(){

    let [coordinatorData, setTaData] = React.useState(CoordinatorData)

    function handleSortClick(sortingValue){
        console.log("clicked")

        setTaData(prevTaData =>{
            const sortedTaData = prevTaData.sort(compare)
            console.log("copy", sortedTaData)
            return [...sortedTaData]
        })
        function compare(a, b){
            if(sortingValue === "name"){
                return a.name > b.name? 1: -1
            }
            else if(sortingValue === "department"){
                return a.department > b.department? 1: -1
            }
            else if(sortingValue === "course"){
                return a.course > b.course? 1: -1
            }
            else if(sortingValue === "numberOfStudents"){
                return a.numberOfStudents > b.numberOfStudents? 1: -1
            }
        }
    }

    const coordinatorInfo = coordinatorData.map(element => {
        return(
            <tr key={element.name}>
                <td className={classes.coordinator_table_element} >{element.name}</td>
                <td className={classes.coordinator_table_element} >{element.department}</td>
                <td className={classes.coordinator_table_element} >{element.course}</td>
                <td className={classes.coordinator_table_element} >{element.numberOfStudents}</td>
            </tr>
        )
    })
    
    return(
        <div className={classes.coordinator_list_panel_container}>
            <h1> Coordinator List</h1>
            <table >
                <tr>
                    <th className={classes.coordinator_table_element} onClick={() => handleSortClick("name")}>Name</th>
                    <th className={classes.coordinator_table_element} onClick={() => handleSortClick("department")}>Department</th>
                    <th className={classes.coordinator_table_element} onClick={() => handleSortClick("course")}>Course</th>
                    <th className={classes.coordinator_table_element} onClick={() => handleSortClick("numberOfStudents")}>Number of Students</th>
                </tr>
                {coordinatorInfo}
            </table>
        </div>

    )
}