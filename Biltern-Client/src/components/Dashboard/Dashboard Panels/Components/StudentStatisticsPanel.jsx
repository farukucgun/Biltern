/**
 * @author Enes Bektaş
 * @date 07.05.2023
 */
import React from "react";
import classes from '../styles/StudentStatisticsPanel.module.css'
import sta from '../Data/StudentStatisticsPanel.json'
import { Chart } from "react-google-charts"
import { getDepartmentCourseStatistics } from "../../../../apiHelper/backendHelper";
import axios from "axios";


/**
 * Gets general statistics about students from one course and displays them in a chart.
 * @returns student statistics panel
 */
export default function StudentStatisticsPanel(){

  React.useEffect(()=>{
    const config = {
      headers: {
          'Content-Type': 'application/json',
          "Authorization": localStorage.getItem("token"),
      }
  };

  axios.get("http://localhost:8080/statistics", config)
      .then(res => {
          console.log(res.data);
          const stats = [];
          for( const key in res.data[0]){
            stats.push([key, res.data[0][key]])
          }
          setStatistics(prevStatistics =>{
            return prevStatistics.concat( stats)
          })
      })
      .catch(err => {
          console.log(err);
      });
  },[])


    const [statistics, setStatistics] = React.useState([["Stages", "Number of Students"]]);
    const studentsExist = statistics !== undefined;
    console.log(statistics)
      
      const options = {
        title: "",
        pieHole: 0.4,
        is3D: false,
        'chartArea': {left:30,top:30,width:"100%",height:"100%"}
      };

    return(
      
        <div className={classes.student_statistics_panel_container}>
          
            <h1>Student Statistics</h1>
            {studentsExist
            ?
            <Chart 
              className={classes.student_statistics_chart}
              chartType="PieChart"
              data = {statistics}
              options={options}
            />
            :
            <div>
              There is no students enrolled for the course
            </div>
            }

        </div>
    )
}