import React from "react";
import classes from '../styles/GraderListPanel.module.css'
import GraderData from '../Data/GraderListPanel.json'
import compare from '../../../../utils/sorting'
import { getGraders } from "../../../../apiHelper/backendHelper";

/**
 * @author Enes Bektaş
 * @date 07.05.2023
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