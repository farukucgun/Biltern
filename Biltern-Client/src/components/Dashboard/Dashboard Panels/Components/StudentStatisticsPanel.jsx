import React from "react";
import classes from '../styles/StudentStatisticsPanel.module.css'
import statistics from '../Data/StudentStatisticsPanel.json'
import { Chart } from "react-google-charts"
import { getDepartmentCourseStatistics } from "../../../../apiHelper/backendHelper";
import { useDispatch } from 'react-redux';
import { setTimedAlert } from '../../../../features/alertSlice';
/**
 * @author Enes Bektaş
 * @date 07.05.2023
 */

export default function TAListPanel(){
  const dispatch = useDispatch();

  
  getDepartmentCourseStatistics()
  .then(res => {
      console.log(res.data)
      dispatch(setTimedAlert("Grading form submitted successfully", "success"));
  })
  .catch(err => {
      console.log(err)

      dispatch(setTimedAlert("Grading form submission failed", "error"));
  });

    const studentsExist = statistics !== undefined;

    const data = [["Stages", "Number of Students"], ...statistics.map(stat => [stat.stageNumber, stat.value])]
      
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
              data = {data}
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