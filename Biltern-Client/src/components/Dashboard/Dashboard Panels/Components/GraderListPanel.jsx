import React from "react";
import classes from '../styles/GraderListPanel.module.css'
import GraderData from '../Data/GraderListPanel.json'

/**
 * @author Enes Bektaş
 * @date 07.05.2023
 */

export default function GraderListPanel(){

    let [graderData, setTaData] = React.useState(GraderData)

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
            else if(sortingValue === "course"){
                return a.course > b.course? 1: -1
            }
            else if(sortingValue === "numberOfStudents"){
                return a.numberOfStudents > b.numberOfStudents? 1: -1
            }
        }
    }

    const graderInfo = graderData.map(element => {
        return(
            <tr key={element.name}>
                <td className={classes.grader_table_element} >{element.name}</td>
                <td className={classes.grader_table_element} >{element.course}</td>
                <td className={classes.grader_table_element}>{element.numberOfStudents}</td>
            </tr>
        )
    })
    
    return(
        <div className={classes.grader_list_panel_container}>
            <h1> Grader List</h1>
            <table >
                <tr>
                    <th className={classes.grader_table_element} onClick={() => handleSortClick("name")}>Name</th>
                    <th className={classes.grader_table_element} onClick={() => handleSortClick("course")}>Course</th>
                    <th className={classes.grader_table_element} onClick={() => handleSortClick("numberOfStudents")}>Number of Students</th>
                </tr>
                {graderInfo}
            </table>
        </div>

    )
}