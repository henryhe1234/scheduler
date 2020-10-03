import React from "react";

import DayList from "components/DayList";
import Appointment from "components/Appointment/index.js";
import "components/Application.scss";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors.js"
import useApplicationData from "../hooks/useApplicationData.js";


const Application = (props) => {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();



  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment) => {
          let interview = getInterview(state, appointment.interview)
          appointment = { ...appointment, interview }


          return <Appointment
            key={appointment.id}
            // time = {appointment.time}
            // interview = {appointment.interview}
            {...appointment}
            interviewers={dailyInterviewers}
            bookInterview={bookInterview}
            cancelInterview={cancelInterview}

          />
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
export default Application;