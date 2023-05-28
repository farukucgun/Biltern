import React from "react";
import classes from '../styles/SecretaryListPanel.module.css'
import SecretaryData from '../Data/SecretaryListPanel.json'
import compare from '../../../../utils/sorting'

/**
 * @author Enes Bektaş
 * @date 07.05.2023
 */

export default function SecretaryListPanel(){

    const secretariesExist = SecretaryData !== undefined;

    let [secretaryData, setTaData] = React.useState(SecretaryData)

    function handleSortClick(sortingValue){
        const compareFunc = compare(sortingValue);
        setTaData(prevTaData =>{
            const sortedTaData = prevTaData.sort(compareFunc);
            return [...sortedTaData];
        })

    }

    const secretaryInfo = secretaryData.slice(0,4).map(element => {
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
            {secretariesExist
            ?
            <table >
                <tr>
                   <th className={classes.secretary_table_element} onClick={() => handleSortClick("name")}>Name</th>
                    <th className={classes.secretary_table_element} onClick={() => handleSortClick("department")}>Department</th>
                    <th className={classes.secretary_table_element} onClick={() => handleSortClick("numberOfStudents")}>Number of Students</th>
                </tr>
                {secretaryInfo}
            </table>
            :
            <div>
                There are no secretaries at the moment.
            </div>
            }

        </div>

    )
}