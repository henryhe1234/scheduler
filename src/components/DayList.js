import React from "react";
import DayListItem from "components/DayListItem";
// {/* <DayListItem 
//   name={day.name} 
//   spots={day.spots} 
//   selected={day.name === props.day}
//   setDay={props.setDay}  /> */}
const DayList = (props)=>{
  return (
    <ul>
      {props.days.map(day => 
         <DayListItem 
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.day}
        setDay={props.setDay}  />
      )}
    </ul>
  )
}
export default DayList;