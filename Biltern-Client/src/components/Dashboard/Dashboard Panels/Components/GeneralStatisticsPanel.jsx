/**
 * @author Enes Bektaş
 * @date 07.05.2023
 */
import React from "react";
import Chart from "react-google-charts";
import classes from "../styles/GeneralStatisticsPanel.module.css"
import GeneralStatistics from "../Data/GeneralStatisticsPanel.json"


/**
 * Gets general statistics about students from all courses and displays them in charts.
 * @returns general statistics panel
 */
export default function GeneralStatisticsPanel(){
    let csStudents = 0
    let meStudents = 0
    let ieStudents = 0
    GeneralStatistics["computer-science"].forEach( element => csStudents = csStudents + element.value )
    GeneralStatistics["industrial-engineering"].forEach( element => ieStudents = ieStudents + element.value )
    GeneralStatistics["mechanical-engineering"].forEach( element => meStudents = meStudents + element.value )

    const csData = [["Stages", "Number of Students"], ...GeneralStatistics["computer-science"].map(stat => [stat.stageNumber, stat.value])]
    const meData = [["Stages", "Number of Students"], ...GeneralStatistics["mechanical-engineering"].map(stat => [stat.stageNumber, stat.value])]
    const ieData = [["Stages", "Number of Students"], ...GeneralStatistics["industrial-engineering"].map(stat => [stat.stageNumber, stat.value])]



    const generalData = [
        ["Department", "Number of Students", { role: "style" }],
        ["CS", csStudents, "platinum"],
        ["ME", meStudents, "silver"], 
        ["IE", ieStudents, "gold"],
    ];
    const detailedOptions = {
        'width':200,
        'height':200,
        legend: {position: 'none'}
        };

    return(
        <div className={classes.general_statistics_panel_container}>
            <h1>Statistics</h1>
            <div className={classes.general_stats}>
                <Chart
                    chartType="ColumnChart"
                    width="200px" 
                    height="200px" 
                    data={generalData}
                />
                <Chart 
                    chartType="PieChart"
                    width="200px"
                    height="200px"
                    data={generalData}
                />
            </div>
            <div className={classes.detailed_stats}>
                <Chart className={classes.chart_element}
                    chartType="PieChart"
                    data = {csData}
                    options={detailedOptions}
                    title= "cs  asd"
                />
                <Chart className={classes.chart_element}
                    chartType="PieChart"
                    data = {meData}
                    options={detailedOptions}
                />
                <Chart className={classes.chart_element}
                    chartType="PieChart"
                    data = {ieData}
                    options={detailedOptions}
                />
            </div>
            



        </div>



    )
}