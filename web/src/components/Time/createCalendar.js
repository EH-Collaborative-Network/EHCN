import ReactHtmlParser from 'react-html-parser';
import React from "react";
import getWeekdayNames from '../TranslationHelpers/getWeekdayNames';
import getMonthNames from '../TranslationHelpers/getMonthNames';
import TranslatedTitle from '../TranslationHelpers/translatedTitle';
import * as styles from "./time.module.css"
import { Link } from 'gatsby';
import createDateTime from './createDateTime';
const CreateCalendar = ({ translations, year, month, theme, events }) => {
    function getDay(date) { // get day number from 0 (monday) to 6 (sunday)
      let day = date.getDay();
      if (day == 0) day = 7; // make Sunday (0) the last day
      return day - 1;
    }
    let mon = month; 
    let weekdayNames = getWeekdayNames(translations,theme)
    let monthNames = getMonthNames(translations,theme)
    let currentEvents = [];
    //only dealing with events for this month
    events.forEach(function(event){
      let start = event.node.startDate
      let end = event.node.endDate
      let sd = createDateTime(start.date, start.time, event.node.timeZone.offset);
      let ed = createDateTime(end.date, end.time, event.node.timeZone.offset);
      if(sd.getMonth() == mon || ed.getMonth() == mon){
        currentEvents.push([sd,ed,event.node]);
      }
    })


    let d = new Date(year, mon);
    let od = new Date(year, mon);


    
    
    let daySquares = [];
    let currentRow = 0;
    let prevRow = 0;
    // <td> with actual dates

      while (d.getMonth() == mon) {
        
        //if event falls, place it otherwise just date....
        let dayEvents = [];

        currentEvents.forEach(function(event){
           if(event[0].getDate() == d.getDate() || event[1].getDate() == d.getDate()){
             dayEvents.push(event)
           }
        })

        let currentDay = d.getDate();
        let dayContent = [];
        dayEvents.forEach(function(event){
            dayContent.push(
              <Link to={'/event/'+ event[2].slug.current}><TranslatedTitle translations={event[2].titles}/></Link>
            )
        })
        let currentWeekDay = getDay(d)

        if(currentWeekDay == 0 || d.getDate() == 1){
          daySquares.push([]);
          prevRow = currentRow;
          currentRow += 1;
        }
     
        
        d.setDate(d.getDate() + 1);
        daySquares[prevRow].push(
          <td>
            <sup>{currentDay}</sup>
            {dayContent}
          </td>
        )
      }
    
    // spaces for the first row
    // from Monday till the first day of the month
    // * * * 1  2  3  4
    for (let i = 0; i < getDay(od); i++) {
      daySquares[0].unshift(<td></td>);
      console.log('mew')
    }
    // add spaces after last days of month for the last row
    // 29 30 31 * * * *
    if (getDay(d) != 0) {
      for (let i = getDay(d); i < 7; i++) {
        daySquares[prevRow].push(<td></td>);
      }
    }
    console.log(daySquares)
    return(
      <div className={styles.calendar}>
        <h4>{monthNames[mon]} - {year}</h4>
        <table>
          <tr>
            <th>
              <h4>{weekdayNames[1]}</h4>
            </th>
            <th>
              <h4>{weekdayNames[2]}</h4>
            </th>
            <th>
              <h4>{weekdayNames[3]}</h4>
            </th>
            <th>
              <h4>{weekdayNames[4]}</h4>
            </th>
            <th>
              <h4>{weekdayNames[5]}</h4>
            </th>
            <th>
              <h4>{weekdayNames[6]}</h4>
            </th>
            <th>
              <h4>{weekdayNames[0]}</h4>
            </th>
          </tr>
          {daySquares.map((row, i) => {
            
            return(
              <tr>
                {row}
              </tr>
            )
          })}
        </table>
      </div>)
  }

 


  export default CreateCalendar