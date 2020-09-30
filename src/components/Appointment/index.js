import React, { Fragment } from 'react'
import "components/Appointment/styles.scss"
import Header from "./Header.js";
import Show from "./Show.js";
import Empty from "./Empty.js";
const Appointment = (props) => {
// interview={{ student: "Lydia Miller-Jones", interviewer }}

  return (
    <article className="appointment">
      <Header time = {props.time}/>
      {props.interview ? <Show student = {props.interview.student} interviewer ={props.interview.interviewer}  /> : <Empty  />}
    </article>
  );
};

export default Appointment;