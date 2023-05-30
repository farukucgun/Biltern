/**
 * @author Enes Bektaş
 * @date 07.05.2023
 */
import React from "react";
import classes from '../styles/GraderListPanel.module.css'
import compare from '../../../../utils/sorting'
import { getGraders } from "../../../../apiHelper/backendHelper";


/**
 * Gets graders of a department and displays necessary information of them in a table.
 * @returns Grader list panel
 */
export default function GraderListPanel(){
    React.useEffect(()=>{
        getGraders()
        .then(res => {
            console.log(res.data)
            setGraderData(res.data)
        })
        .catch(err => {
            console.log(err)

    });
    },[])

    let [graderData, setGraderData] = React.useState([]);
    const gradersExist = graderData.length !== 0;

    function handleSortClick(sortingValue){
        const compareFunc = compare(sortingValue);

        setGraderData(prevGraderData =>{
            const sortedGraderData = prevGraderData.sort(compareFunc);
            return [...sortedGraderData];
        })

    }

    const graderInfo = graderData.slice(0,4).map(element => {
        return(
            <tr key={element.bilkentId}>
                <td className={classes.grader_table_element} >{element.userName}</td>
                <td className={classes.grader_table_element} >{element.department}</td>
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
                    <th className={classes.grader_table_element} onClick={() => handleSortClick("department")}>Department</th>
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