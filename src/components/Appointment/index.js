import React, { Fragment } from 'react'
import "components/Appointment/styles.scss"
import Header from "./Header.js";
import Show from "./Show.js";
import Empty from "./Empty.js";
import Form from "./Form.js";
import Status from "./Status.js";
import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const Appointment = (props) => {
  // interview={{ student: "Lydia Miller-Jones", interviewer }}

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name,interviewer)=>{
    
    const interview = {student:name,interviewer};
    transition(SAVING);
    props.bookInterview(props.id,interview)
    .then(()=>{

      transition(SHOW);
    })
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />} */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (<Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />)}
      {mode === CREATE && <Form interviewers = {props.interviewers}  onCancel = {back} onSave={save} />}
      {mode === SAVING && <Status message = {SAVING} />}
    </article>
  );
};

export default Appointment;