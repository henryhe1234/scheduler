import React, { Fragment } from 'react'
import "components/Appointment/styles.scss"
import Header from "./Header.js";
import Show from "./Show.js";
import Empty from "./Empty.js";
import Form from "./Form.js";
import Status from "./Status.js";
import Confirm from "./Confirm.js";
import Error from "./Error.js";
import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_EMPTY = "ERROR_EMPTY";
const Appointment = (props) => {
  // interview={{ student: "Lydia Miller-Jones", interviewer }}

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {

    const interview = { student: name, interviewer };
    if (!name || !interviewer) {
      transition(ERROR_EMPTY)
    } else {


      transition(SAVING);
      props.bookInterview(props.id, interview)
        .then(() => {

          transition(SHOW)
        })
        .catch(error => transition(ERROR_SAVE, true))
    }
  }

  const cancelation = () => {
    transition(CONFIRM);
  }
  
  const confirmDelete = () => {
    transition(DELETING,true);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(error => transition(ERROR_DELETE,true))

  }

  const editing = () => {
    transition(EDIT);
  }


  const deleteMessage = "Are you sure you would like to delete?";

  return (
    <article data-testid="appointment" className="appointment">
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
      {mode === ERROR_SAVE && <Error message={"Can't save appointment due to server problem"} onClose={back} />}
      {mode === ERROR_EMPTY && <Error message={"You have to type your name and select interviewer"} onClose={back} />}
      {mode === ERROR_DELETE && <Error message={"Can not Delete appointment"} onClose={back} />}

    </article>
  );
};

export default Appointment;