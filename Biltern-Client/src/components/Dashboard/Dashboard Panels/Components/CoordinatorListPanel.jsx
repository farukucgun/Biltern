import React from "react";
import classes from '../styles/CoordinatorListPanel.module.css'
import compare from '../../../../utils/sorting'
import { getCoordinators } from "../../../../apiHelper/backendHelper";

/**
 * @author Enes Bektaş
 * @date 07.05.2023
 */

export default function CoordinatorListPanel(){

    React.useEffect(()=>{
        getCoordinators()
        .then(res => {
            console.log(res.data)
            setCoordinatorData(res.data)
        })
        .catch(err => {
            console.log(err)

    });
    },[])


    let [coordinatorData, setCoordinatorData] = React.useState([])
    const coordinatorsExist = coordinatorData.length !== 0;

    function handleSortClick(sortingValue){
        const compareFunc = compare(sortingValue);
        setCoordinatorData(prevCoordinatorData =>{
            const sortedCoordinatorData = prevCoordinatorData.sort(compareFunc);
            return [...sortedCoordinatorData];
        })

    }

    const coordinatorInfo = coordinatorData.slice(0,4).map(element => {
        return(
            <tr key={element.bilkentId}>
                <td className={classes.coordinator_table_element} >{element.userName}</td>
                <td className={classes.coordinator_table_element} >{element.department}</td>
                <td className={classes.coordinator_table_element} >{element.course}</td>
                <td className={classes.coordinator_table_element} >{element.numberOfStudents}</td>
            </tr>
        )
    })
    
    return(
        <div className={classes.coordinator_list_panel_container}>
            <h1> Coordinator List</h1>
            {coordinatorsExist
            ?
            <table >
                <tr>
                    <th className={classes.coordinator_table_element} onClick={() => handleSortClick("name")}>Name</th>
                    <th className={classes.coordinator_table_element} onClick={() => handleSortClick("department")}>Department</th>
                    <th className={classes.coordinator_table_element} onClick={() => handleSortClick("course")}>Course</th>
                    <th className={classes.coordinator_table_element} onClick={() => handleSortClick("numberOfStudents")}>Number of Students</th>
                </tr>
                {coordinatorInfo}
            </table>
            :
            <div>
                There are no coordinators at the moment.
            </div>
            }

        </div>

    )
}