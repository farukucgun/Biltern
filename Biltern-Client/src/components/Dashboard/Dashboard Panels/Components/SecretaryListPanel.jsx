import React from "react";
import classes from '../styles/SecretaryListPanel.module.css'
import compare from '../../../../utils/sorting'
import { getSecretaries } from "../../../../apiHelper/backendHelper";

/**
 * @author Enes Bektaş
 * @date 07.05.2023
 */

export default function SecretaryListPanel(){


    React.useEffect(()=>{
        getSecretaries()
        .then(res => {
            setSecretaryData(res.data)
        })
        .catch(err => {
            console.log(err)

    });
    },[])


    let [secretaryData, setSecretaryData] = React.useState([])
    const secretariesExist = secretaryData.length !== 0;

    function handleSortClick(sortingValue){
        const compareFunc = compare(sortingValue);
        setSecretaryData(prevSecretaryData =>{
            const sortedSecretaryData = prevSecretaryData.sort(compareFunc);
            return [...sortedSecretaryData];
        })

    }

    const secretaryInfo = secretaryData.slice(0,4).map(element => {
        return(
            <tr key={element.bilkentId}>
                <td className={classes.secretary_table_element} >{element.userName}</td>
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