import React from "react";
import classes from '../styles/TAListPanel.module.css'
import TaData from '../Data/TAList.json'

/**
 * @author Enes Bektaş
 * @date 07.05.2023
 */

export default function TAListPanel(){

    let [taData, setTaData] = React.useState(TaData)

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
            else if(sortingValue === "grader"){
                return a.grader > b.grader? 1: -1
            }
        }
    }

    const taInfo = taData.map(element => {
        return(
            <tr key={element.name}>
                <td className={classes.ta_table_element} >{element.name}</td>
                <td className={classes.ta_table_element} >{element.course}</td>
                <td className={classes.ta_table_element} >{element.numberOfStudents}</td>
                <td className={classes.ta_table_element} >{element.grader}</td>
            </tr>
        )
    })
    
    return(
        <div className={classes.ta_list_panel_container}>
            <h1> Teaching Assistant List</h1>
            <table >
                <tr>
                    <th className={classes.ta_table_element} onClick={() => handleSortClick("name")}>Name</th>
                    <th className={classes.ta_table_element} onClick={() => handleSortClick("department")}>Course</th>
                    <th className={classes.ta_table_element} onClick={() => handleSortClick("course")}>Number of Students</th>
                    <th className={classes.ta_table_element} onClick={() => handleSortClick("numberOfStudents")}> Grader</th>
                </tr>
                {taInfo}
            </table>
        </div>
    )
}