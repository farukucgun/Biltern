import React, {useState} from 'react';
import ActionButton from './ActionButton';

/**
 * @author Faruk Uçgun
 * @date 25.05.2023
 * @abstract: This is a custom date picker component
 */

const DatePicker = (props) => {

    const {onConfirm} = props;
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const getMinDate = () => {
        let curDate = new Date();
        curDate.setMonth(curDate.getMonth()+1);
        let year = curDate.getFullYear();
        let month = curDate.getMonth();
        let day = curDate.getDate();

        if (month < 10) month = '0' + month;
        if (day < 10) day = '0' + day;

        const minDate = year + "-" + month + "-" + day;
        return minDate;
    }
    
    const getMaxDate = () => {
        let curDate = new Date();
        curDate.setMonth(curDate.getMonth()+2);
        let year = curDate.getFullYear();
        let month = curDate.getMonth();
        let day = curDate.getDate();

        if (month < 10) month = '0' + month;
        if (day < 10) day = '0' + day;
            
        const maxDate = year + "-" + month + "-" + day;
        return maxDate;
    }
    
    const onChangeHandler = (event) => {
        event.preventDefault();
        setDate(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        onConfirm(date);
    }

    return (
        <form onSubmit={submitHandler}>
            <label htmlFor="dueDate">Due Date: </label>
            <input 
                type="date" 
                id="dueDate" 
                name="dueDate"
                value={date}
                min={getMinDate()} 
                max={getMaxDate()}
                onChange={onChangeHandler}
            />
            <ActionButton 
                type="submit"
                text="Confirm Extend"
                onClick={submitHandler}
            />
                
        </form>
    );
}

export default DatePicker;