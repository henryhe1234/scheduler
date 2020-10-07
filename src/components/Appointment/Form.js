import React, {useState} from 'react';
import Button from "components/Button.js"
import InterviewerList from "../InterviewerList.js"



// import { useState } from "react";

const Form = (props) => {
  const [error, setError] = useState("");
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = ()=>{
    setName("");
    setInterviewer(null);
  }
  const save = ()=>{
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(name,interviewer)

  }
  const cancel = ()=>{
    reset();
    props.onCancel();
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="false">
          <input
            
            onChange={(event) => {
              
              return setName(event.target.value);
            }}
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={name}
            placeholder="Enter Student Name"
            // onSubmit={event => event.preventDefault()}
          /*
            This must be a controlled component
          */
         data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick = {()=>{cancel()}}>Cancel</Button>
          <Button confirm onClick = {()=>{save()}}>Save</Button>
        </section>
      </section>
    </main>
  );
};

export default Form;