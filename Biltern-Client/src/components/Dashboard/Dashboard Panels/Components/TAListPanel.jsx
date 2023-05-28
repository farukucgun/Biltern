import React from "react";
import classes from '../styles/TAListPanel.module.css'
import TaData from '../Data/TAList.json'
import compare from '../../../../utils/sorting'

/**
 * @author Enes Bektaş
 * @date 07.05.2023
 */

export default function TAListPanel(){

    const teachingAssitantsExist = TaData !== undefined;

    let [taData, setTaData] = React.useState(TaData);

    function handleSortClick(sortingValue){
        const compareFunc = compare(sortingValue);
        setTaData(prevTaData =>{
            const sortedTaData = prevTaData.sort(compareFunc);
            return [...sortedTaData];
        })

    }

    const taInfo = taData.slice(0,4).map(element => {
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
            {teachingAssitantsExist
            ?
            <table >
                <tr>
                    <th className={classes.ta_table_element} onClick={() => handleSortClick("name")}>Name</th>
                    <th className={classes.ta_table_element} onClick={() => handleSortClick("course")}>Course</th>
                    <th className={classes.ta_table_element} onClick={() => handleSortClick("numberOfStudents")}>Number of Students</th>
                    <th className={classes.ta_table_element} onClick={() => handleSortClick("grader")}> Grader</th>
                </tr>
                {taInfo}
            </table>
            :
            <div>
                There are no teaching assistants at the moment.
            </div>
            }

        </div>
    )
}