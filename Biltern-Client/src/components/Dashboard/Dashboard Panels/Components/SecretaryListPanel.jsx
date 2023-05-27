import React from "react";
import classes from '../styles/SecretaryListPanel.module.css'
import SecretaryData from '../Data/SecretaryListPanel.json'

/**
 * @author Enes Bektaş
 * @date 07.05.2023
 */

export default function SecretaryListPanel(){

    let [secretaryData, setTaData] = React.useState(SecretaryData)

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
            else if(sortingValue === "numberOfStudents"){
                return a.numberOfStudents > b.numberOfStudents? 1: -1
            }
        }
    }

    const secretaryInfo = secretaryData.map(element => {
        return(
            <tr key={element.name}>
                <td className={classes.secretary_table_element} >{element.name}</td>
                <td className={classes.secretary_table_element} >{element.department}</td>
                <td className={classes.secretary_table_element} >{element.numberOfStudents}</td>
            </tr>
        )
    })
    
    return(
        <div className={classes.secretary_list_panel_container}>
            <h1> Secretary List</h1>
            <table >
                <tr>
                   <th className={classes.secretary_table_element} onClick={() => handleSortClick("name")}>Name</th>
                    <th className={classes.secretary_table_element} onClick={() => handleSortClick("department")}>Department</th>
                    <th className={classes.secretary_table_element} onClick={() => handleSortClick("numberOfStudents")}>Number of Students</th>
                </tr>
                {secretaryInfo}
            </table>
        </div>

    )
}