
export default function comparison(sortingValue){
    function compare(a, b){
        if(sortingValue === "name"){
            return a.name > b.name? 1: -1
        }
        else if(sortingValue === "course"){
            return a.course > b.course? 1: -1
        }
        else if(sortingValue === "department"){
            return a.department > b.department? 1: -1
        }
        else if(sortingValue === "numberOfStudents"){
            return a.numberOfStudents > b.numberOfStudents? 1: -1
        }
        else if(sortingValue === "grader"){
            return a.grader > b.grader? 1: -1
        }
    }
    return compare;
}