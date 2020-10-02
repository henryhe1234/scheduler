import React, { Fragment } from 'react'
import "components/Appointment/styles.scss"
import Header from "./Header.js";
import Show from "./Show.js";
import Empty from "./Empty.js";
import Form from "./Form.js";
import Status from "./Status.js";
import Confirm from "./Confirm.js";
import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const Appointment = (props) => {
  // interview={{ student: "Lydia Miller-Jones", interviewer }}

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {

    const interview = { student: name, interviewer };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => {

        transition(SHOW);
      })
  }

  const cancelation = () => {
    transition(CONFIRM);


  }
  const confirmDelete = () => {
    transition(DELETING);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })

  }

  const editing = () => {
    transition(EDIT);
  }


  const deleteMessage = "Are you sure you want to delete?";

  return (
    <article className="appointment">
      <Header time={props.time} />
      {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />} */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (<Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={cancelation}
        onEdit={editing}
      />)}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save} />}
      {mode === SAVING && <Status message={SAVING} />}
      {mode === DELETING && <Status message={DELETING} />}

      {mode === CONFIRM && <Confirm message={deleteMessage} onConfirm={confirmDelete} onCancel={back} />}
      {mode === EDIT && <Form
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
        name={props.interview.student}
        interviewer={props.interview.interviewer.id} />}
    </article>
  );
};

export default Appointment;