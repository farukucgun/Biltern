import React from "react";
import classes from '../styles/GraderListPanel.module.css'
import GraderData from '../Data/GraderListPanel.json'
import compare from '../../../../utils/sorting'

/**
 * @author Enes Bektaş
 * @date 07.05.2023
 */

export default function GraderListPanel(){

    const gradersExist = GraderData !== undefined;

    let [graderData, setTaData] = React.useState(GraderData);

    function handleSortClick(sortingValue){
        const compareFunc = compare(sortingValue);

        setTaData(prevTaData =>{
            const sortedTaData = prevTaData.sort(compareFunc);
            return [...sortedTaData];
        })

    }

    const graderInfo = graderData.slice(0,4).map(element => {
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
            {gradersExist
            ?
            <table >
                <tr>
                    <th className={classes.grader_table_element} onClick={() => handleSortClick("name")}>Name</th>
                    <th className={classes.grader_table_element} onClick={() => handleSortClick("course")}>Course</th>
                    <th className={classes.grader_table_element} onClick={() => handleSortClick("numberOfStudents")}>Number of Students</th>
                </tr>
                {graderInfo}
            </table>
            :
            <div>
                There are no graders at the moment.
            </div>
            }
            
        </div>

    )
}