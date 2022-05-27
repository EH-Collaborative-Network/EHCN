import ReactHtmlParser from 'react-html-parser';
import React from "react";
import getWeekdayNames from '../TranslationHelpers/getWeekdayNames';
import getMonthNames from '../TranslationHelpers/getMonthNames';
import * as styles from "./time.module.css"
const CreateCalendar = ({ translations, year, month, theme }) => {
    function getDay(date) { // get day number from 0 (monday) to 6 (sunday)
      let day = date.getDay();
      if (day == 0) day = 7; // make Sunday (0) the last day
      return day - 1;
    }
    let mon = month; 
    let weekdayNames = getWeekdayNames(translations,theme)
    let monthNames = getMonthNames(translations,theme)
    

    let d = new Date(year, mon);

    let table = '<table><tr><th><h4>'+ weekdayNames[1] +'</h4></th><th><h4>'+ weekdayNames[2] +'</h4></th><th><h4>'+ weekdayNames[3] +'</th><th><h4>'+ weekdayNames[4] +'</h4></th><th><h4>'+ weekdayNames[5] +'</h4></th><th><h4>'+ weekdayNames[6] +'</h4></th><th><h4>'+ weekdayNames[0] +'</h4></th></tr><tr>';

    // spaces for the first row
    // from Monday till the first day of the month
    // * * * 1  2  3  4
    for (let i = 0; i < getDay(d); i++) {
      table += '<td></td>';
    }

    // <td> with actual dates
    while (d.getMonth() == mon) {
      table += '<td><sup>' + d.getDate() + '</sup></td>';

      if (getDay(d) % 7 == 6) { // sunday, last day of week - newline
        table += '</tr><tr>';
      }

      d.setDate(d.getDate() + 1);
    }

    // add spaces after last days of month for the last row
    // 29 30 31 * * * *
    if (getDay(d) != 0) {
      for (let i = getDay(d); i < 7; i++) {
        table += '<td></td>';
      }
    }

    // close the table
    table += '</tr></table>';
    return(
      <div className={styles.calendar}>
        <h4>{monthNames[mon]} - {year}</h4>
        {ReactHtmlParser(table)}
      </div>)
  }

 


  export default CreateCalendar