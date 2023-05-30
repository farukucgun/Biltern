/**
 * @author Enes Bektaş
 * @date 07.05.2023
 */
import React from "react";
import classes from '../styles/TAListPanel.module.css'
import compare from '../../../../utils/sorting'
import { getTeachingAssistants } from "../../../../apiHelper/backendHelper";


/**
 * Gets teaching assistants of a department and displays necessary information of them in a table.
 * @returns teaching assistant list panel
 */
export default function TAListPanel(){

    React.useEffect(()=>{
        getTeachingAssistants()
        .then(res => {
            console.log(res.data)
            setTaData(res.data)
        })
        .catch(err => {
            console.log(err)

    });
    },[])


    let [taData, setTaData] = React.useState([]);
    const teachingAssitantsExist = taData.length !== 0;

    function handleSortClick(sortingValue){
        const compareFunc = compare(sortingValue);
        setTaData(prevTaData =>{
            const sortedTaData = prevTaData.sort(compareFunc);
            return [...sortedTaData];
        })

    }

    const taInfo = taData.slice(0,4).map(element => {
        return(
            <tr key={element.bilkentId}>
                <td className={classes.ta_table_element} >{element.userName}</td>
                <td className={classes.ta_table_element} >{element.department}</td>
                <td className={classes.ta_table_element} >{element.numberOfStudents}</td>
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
                    <th className={classes.ta_table_element} onClick={() => handleSortClick("department")}>Department</th>
                    <th className={classes.ta_table_element} onClick={() => handleSortClick("numberOfStudents")}>Number of Students</th>
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